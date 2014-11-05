package xlsx

import (
	"archive/zip"
	"encoding/xml"
	"fmt"
	"io"
	"os"
	"strconv"
)


// File is a high level structure providing a slice of Sheet structs
// to the user.
type File struct {
	worksheets     map[string]*zip.File
	numFmtRefTable map[int]xlsxNumFmt
	referenceTable *RefTable
	Date1904       bool
	styles         *xlsxStyles
	Sheets         []*Sheet
	Sheet          map[string]*Sheet
}

// Create a new File
func NewFile() (file *File) {
	file = &File{}
	file.Sheet = make(map[string]*Sheet)
	file.Sheets = make([]*Sheet, 0)
	return
}

// OpenFile() take the name of an XLSX file and returns a populated
// myxlsx.File struct for it.
func OpenFile(filename string) (*File, error) {
	var f *zip.ReadCloser
	f, err := zip.OpenReader(filename)
	if err != nil {
		return nil, err
	}
	return ReadZip(f)
}

// Save the File to an myxlsx file at the provided path.
func (f *File) Save(path string) (err error) {
	var parts map[string]string
	var target *os.File
	var zipWriter *zip.Writer

	parts, err = f.MarshallParts()
	if err != nil {
		return
	}

	target, err = os.Create(path)
	if err != nil {
		return
	}

	zipWriter = zip.NewWriter(target)

	for partName, part := range parts {
		var writer io.Writer
		writer, err = zipWriter.Create(partName)
		if err != nil {
			return
		}
		_, err = writer.Write([]byte(part))
		if err != nil {
			return
		}
	}
	err = zipWriter.Close()
	if err != nil {
		return
	}

	return target.Close()
}

// Add a new Sheet, with the provided name, to a File
func (f *File) AddSheet(sheetName string) (sheet *Sheet) {
	sheet = &Sheet{Name: sheetName}
	f.Sheet[sheetName] = sheet
	f.Sheets = append(f.Sheets, sheet)
	return sheet
}

func (f *File) makeWorkbook() xlsxWorkbook {
	var workbook xlsxWorkbook
	workbook = xlsxWorkbook{}
	workbook.FileVersion = xlsxFileVersion{}
	fmt.Println("FileVersion",workbook.FileVersion)
	workbook.FileVersion.AppName = "Go XLSX"
	workbook.WorkbookPr = xlsxWorkbookPr{BackupFile: false}
	fmt.Println("WorkbookPr",workbook.WorkbookPr)
	workbook.BookViews = xlsxBookViews{}
	workbook.BookViews.WorkBookView = make([]xlsxWorkBookView, 1)
	workbook.BookViews.WorkBookView[0] = xlsxWorkBookView{}
	workbook.Sheets = xlsxSheets{}
	workbook.Sheets.Sheet = make([]xlsxSheet, len(f.Sheets))
	return workbook
}

// Construct a map of file name to XML content representing the file
// in terms of the structure of an XLSX file.
func (f *File) MarshallParts() (map[string]string, error) {

	var parts map[string]string
	var refTable *RefTable = NewSharedStringRefTable()
	refTable.isWrite = true
	var workbookRels WorkBookRels = make(WorkBookRels)
	var err error
	var workbook xlsxWorkbook
	var types xlsxTypes = MakeDefaultContentTypes()

	marshal := func(thing interface{}) (string, error) {
		body, err := xml.MarshalIndent(thing, "  ", "  ")
		if err != nil {
			return "", err
		}
		return xml.Header + string(body), nil
	}

	parts = make(map[string]string)
	workbook = f.makeWorkbook()
	sheetIndex := 1

	for _, sheet := range f.Sheets {
		xSheet := sheet.makeXLSXSheet(refTable)
		rId := fmt.Sprintf("rId%d", sheetIndex)
		sheetId := strconv.Itoa(sheetIndex)
		sheetPath := fmt.Sprintf("worksheets/sheet%d.xml", sheetIndex)
		partName := "xl/" + sheetPath

		types.Overrides = append(
			types.Overrides,
			xlsxOverride{
				PartName:    "/"+partName,
				ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"})
		workbookRels[rId] = sheetPath
		workbook.Sheets.Sheet[sheetIndex-1] = xlsxSheet{
			Name:    sheet.Name,
			SheetId: sheetId,
			Id:      rId}
		parts[partName], err = marshal(xSheet)
		if err != nil {
			return parts, err
		}
		sheetIndex++
	}

	parts["xl/workbook.xml"], err = marshal(workbook)
	if err != nil {
		return parts, err
	}

	parts["_rels/.rels"] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`

	parts["docProps/app.xml"] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <TotalTime>0</TotalTime>
  <Application>Go XLSX</Application>
</Properties>`

	// TODO - do this properly, modification and revision information
	parts["docProps/core.xml"] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"></cp:coreProperties>`

	xSST := refTable.makeXLSXSST()
	parts["xl/sharedStrings.xml"], err = marshal(xSST)
	if err != nil {
		return parts, err
	}

	xWRel := workbookRels.MakeXLSXWorkbookRels()

	parts["xl/_rels/workbook.xml.rels"], err = marshal(xWRel)
	if err != nil {
		return parts, err
	}

	parts["[Content_Types].xml"], err = marshal(types)
	if err != nil {
		return parts, err
	}

	parts["xl/styles.xml"] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
</styleSheet>`

	return parts, nil
}

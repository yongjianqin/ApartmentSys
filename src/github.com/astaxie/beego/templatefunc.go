// Beego (http://beego.me/)

// @description beego is an open-source, high-performance web framework for the Go programming language.

// @link        http://github.com/astaxie/beego for the canonical source repository

// @license     http://github.com/astaxie/beego/blob/master/LICENSE

// @authors     astaxie

package beego

import (
	"errors"
	"fmt"
	"html/template"
	"net/url"
	"reflect"
	"regexp"
	"strconv"
	"strings"
	"time"
)

// Substr returns the substr from start to length.
func Substr(s string, start, length int) string {
	bt := []rune(s)
	if start < 0 {
		start = 0
	}
	var end int
	if (start + length) > (len(bt) - 1) {
		end = len(bt)
	} else {
		end = start + length
	}
	return string(bt[start:end])
}

// Html2str returns escaping text convert from html.
func Html2str(html string) string {
	src := string(html)

	re, _ := regexp.Compile("\\<[\\S\\s]+?\\>")
	src = re.ReplaceAllStringFunc(src, strings.ToLower)

	//remove STYLE
	re, _ = regexp.Compile("\\<style[\\S\\s]+?\\</style\\>")
	src = re.ReplaceAllString(src, "")

	//remove SCRIPT
	re, _ = regexp.Compile("\\<script[\\S\\s]+?\\</script\\>")
	src = re.ReplaceAllString(src, "")

	re, _ = regexp.Compile("\\<[\\S\\s]+?\\>")
	src = re.ReplaceAllString(src, "\n")

	re, _ = regexp.Compile("\\s{2,}")
	src = re.ReplaceAllString(src, "\n")

	return strings.TrimSpace(src)
}

// DateFormat takes a time and a layout string and returns a string with the formatted date. Used by the template parser as "dateformat"
func DateFormat(t time.Time, layout string) (datestring string) {
	datestring = t.Format(layout)
	return
}

// DateFormat pattern rules.
var datePatterns = []string{
	// year
	"Y", "2006", // A full numeric representation of a year, 4 digits   Examples: 1999 or 2003
	"y", "06", //A two digit representation of a year   Examples: 99 or 03

	// month
	"m", "01", // Numeric representation of a month, with leading zeros 01 through 12
	"n", "1", // Numeric representation of a month, without leading zeros   1 through 12
	"M", "Jan", // A short textual representation of a month, three letters Jan through Dec
	"F", "January", // A full textual representation of a month, such as January or March   January through December

	// day
	"d", "02", // Day of the month, 2 digits with leading zeros 01 to 31
	"j", "2", // Day of the month without leading zeros 1 to 31

	// week
	"D", "Mon", // A textual representation of a day, three letters Mon through Sun
	"l", "Monday", // A full textual representation of the day of the week  Sunday through Saturday

	// time
	"g", "3", // 12-hour format of an hour without leading zeros    1 through 12
	"G", "15", // 24-hour format of an hour without leading zeros   0 through 23
	"h", "03", // 12-hour format of an hour with leading zeros  01 through 12
	"H", "15", // 24-hour format of an hour with leading zeros  00 through 23

	"a", "pm", // Lowercase Ante meridiem and Post meridiem am or pm
	"A", "PM", // Uppercase Ante meridiem and Post meridiem AM or PM

	"i", "04", // Minutes with leading zeros    00 to 59
	"s", "05", // Seconds, with leading zeros   00 through 59

	// time zone
	"T", "MST",
	"P", "-07:00",
	"O", "-0700",

	// RFC 2822
	"r", time.RFC1123Z,
}

// Parse Date use PHP time format.
func DateParse(dateString, format string) (time.Time, error) {
	replacer := strings.NewReplacer(datePatterns...)
	format = replacer.Replace(format)
	return time.ParseInLocation(format, dateString, time.Local)
}

// Date takes a PHP like date func to Go's time format.
func Date(t time.Time, format string) string {
	replacer := strings.NewReplacer(datePatterns...)
	format = replacer.Replace(format)
	return t.Format(format)
}

// Compare is a quick and dirty comparison function. It will convert whatever you give it to strings and see if the two values are equal.
// Whitespace is trimmed. Used by the template parser as "eq".
func Compare(a, b interface{}) (equal bool) {
	equal = false
	if strings.TrimSpace(fmt.Sprintf("%v", a)) == strings.TrimSpace(fmt.Sprintf("%v", b)) {
		equal = true
	}
	return
}

func Config(returnType, key string, defaultVal interface{}) (value interface{}, err error) {
	switch returnType {
	case "String":
		value = AppConfig.String(key)
	case "Bool":
		value, err = AppConfig.Bool(key)
	case "Int":
		value, err = AppConfig.Int(key)
	case "Int64":
		value, err = AppConfig.Int64(key)
	case "Float":
		value, err = AppConfig.Float(key)
	case "DIY":
		value, err = AppConfig.DIY(key)
	default:
		err = errors.New("Config keys must be of type String, Bool, Int, Int64, Float, or DIY!")
	}

	if err != nil {
		if reflect.TypeOf(returnType) != reflect.TypeOf(defaultVal) {
			err = errors.New("defaultVal type does not match returnType!")
		} else {
			value, err = defaultVal, nil
		}
	} else if reflect.TypeOf(value).Kind() == reflect.String {
		if value == "" {
			if reflect.TypeOf(defaultVal).Kind() != reflect.String {
				err = errors.New("defaultVal type must be a String if the returnType is a String")
			} else {
				value = defaultVal.(string)
			}
		}
	}

	return
}

// Convert string to template.HTML type.
func Str2html(raw string) template.HTML {
	return template.HTML(raw)
}

// Htmlquote returns quoted html string.
func Htmlquote(src string) string {
	//HTML编码为实体符号
	/*
	   Encodes `text` for raw use in HTML.
	       >>> htmlquote("<'&\\">")
	       '&lt;&#39;&amp;&quot;&gt;'
	*/

	text := string(src)

	text = strings.Replace(text, "&", "&amp;", -1) // Must be done first!
	text = strings.Replace(text, "<", "&lt;", -1)
	text = strings.Replace(text, ">", "&gt;", -1)
	text = strings.Replace(text, "'", "&#39;", -1)
	text = strings.Replace(text, "\"", "&quot;", -1)
	text = strings.Replace(text, "“", "&ldquo;", -1)
	text = strings.Replace(text, "”", "&rdquo;", -1)
	text = strings.Replace(text, " ", "&nbsp;", -1)

	return strings.TrimSpace(text)
}

// Htmlunquote returns unquoted html string.
func Htmlunquote(src string) string {
	//实体符号解释为HTML
	/*
	   Decodes `text` that's HTML quoted.
	       >>> htmlunquote('&lt;&#39;&amp;&quot;&gt;')
	       '<\\'&">'
	*/

	// strings.Replace(s, old, new, n)
	// 在s字符串中，把old字符串替换为new字符串，n表示替换的次数，小于0表示全部替换

	text := string(src)
	text = strings.Replace(text, "&nbsp;", " ", -1)
	text = strings.Replace(text, "&rdquo;", "”", -1)
	text = strings.Replace(text, "&ldquo;", "“", -1)
	text = strings.Replace(text, "&quot;", "\"", -1)
	text = strings.Replace(text, "&#39;", "'", -1)
	text = strings.Replace(text, "&gt;", ">", -1)
	text = strings.Replace(text, "&lt;", "<", -1)
	text = strings.Replace(text, "&amp;", "&", -1) // Must be done last!

	return strings.TrimSpace(text)
}

// UrlFor returns url string with another registered controller handler with params.
//	usage:
//
//	UrlFor(".index")
//	print UrlFor("index")
//  router /login
//	print UrlFor("login")
//	print UrlFor("login", "next","/"")
//  router /profile/:username
//	print UrlFor("profile", ":username","John Doe")
//	result:
//	/
//	/login
//	/login?next=/
//	/user/John%20Doe
//
//  more detail http://beego.me/docs/mvc/controller/urlbuilding.md
func UrlFor(endpoint string, values ...string) string {
	return BeeApp.Handlers.UrlFor(endpoint, values...)
}

// returns script tag with src string.
func AssetsJs(src string) template.HTML {
	text := string(src)

	text = "<script src=\"" + src + "\"></script>"

	return template.HTML(text)
}

// returns stylesheet link tag with src string.
func AssetsCss(src string) template.HTML {
	text := string(src)

	text = "<link href=\"" + src + "\" rel=\"stylesheet\" />"

	return template.HTML(text)
}

// parse form values to struct via tag.
func ParseForm(form url.Values, obj interface{}) error {
	objT := reflect.TypeOf(obj)
	objV := reflect.ValueOf(obj)
	if !isStructPtr(objT) {
		return fmt.Errorf("%v must be  a struct pointer", obj)
	}
	objT = objT.Elem()
	objV = objV.Elem()

	for i := 0; i < objT.NumField(); i++ {
		fieldV := objV.Field(i)
		if !fieldV.CanSet() {
			continue
		}

		fieldT := objT.Field(i)
		tags := strings.Split(fieldT.Tag.Get("form"), ",")
		var tag string
		if len(tags) == 0 || len(tags[0]) == 0 {
			tag = fieldT.Name
		} else if tags[0] == "-" {
			continue
		} else {
			tag = tags[0]
		}

		value := form.Get(tag)
		if len(value) == 0 {
			continue
		}

		switch fieldT.Type.Kind() {
		case reflect.Bool:
			b, err := strconv.ParseBool(value)
			if err != nil {
				return err
			}
			fieldV.SetBool(b)
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			x, err := strconv.ParseInt(value, 10, 64)
			if err != nil {
				return err
			}
			fieldV.SetInt(x)
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
			x, err := strconv.ParseUint(value, 10, 64)
			if err != nil {
				return err
			}
			fieldV.SetUint(x)
		case reflect.Float32, reflect.Float64:
			x, err := strconv.ParseFloat(value, 64)
			if err != nil {
				return err
			}
			fieldV.SetFloat(x)
		case reflect.Interface:
			fieldV.Set(reflect.ValueOf(value))
		case reflect.String:
			fieldV.SetString(value)
		}
	}
	return nil
}

var unKind = map[reflect.Kind]bool{
	reflect.Uintptr:       true,
	reflect.Complex64:     true,
	reflect.Complex128:    true,
	reflect.Array:         true,
	reflect.Chan:          true,
	reflect.Func:          true,
	reflect.Map:           true,
	reflect.Ptr:           true,
	reflect.Slice:         true,
	reflect.Struct:        true,
	reflect.UnsafePointer: true,
}

// render object to form html.
// obj must be a struct pointer.
func RenderForm(obj interface{}) template.HTML {
	objT := reflect.TypeOf(obj)
	objV := reflect.ValueOf(obj)
	if !isStructPtr(objT) {
		return template.HTML("")
	}
	objT = objT.Elem()
	objV = objV.Elem()

	var raw []string
	for i := 0; i < objT.NumField(); i++ {
		fieldV := objV.Field(i)
		if !fieldV.CanSet() || unKind[fieldV.Kind()] {
			continue
		}

		fieldT := objT.Field(i)

		label, name, fType, ignored := parseFormTag(fieldT)
		if ignored {
			continue
		}

		raw = append(raw, renderFormField(label, name, fType, fieldV.Interface()))
	}
	return template.HTML(strings.Join(raw, "</br>"))
}

// renderFormField returns a string containing HTML of a single form field.
func renderFormField(label, name, fType string, value interface{}) string {
	if isValidForInput(fType) {
		return fmt.Sprintf(`%v<input name="%v" type="%v" value="%v">`, label, name, fType, value)
	}

	return fmt.Sprintf(`%v<%v name="%v">%v</%v>`, label, fType, name, value, fType)
}

// isValidForInput checks if fType is a valid value for the `type` property of an HTML input element.
func isValidForInput(fType string) bool {
	validInputTypes := strings.Fields("text password checkbox radio submit reset hidden image file button search email url tel number range date month week time datetime datetime-local color")
	for _, validType := range validInputTypes {
		if fType == validType {
			return true
		}
	}
	return false
}

// parseFormTag takes the stuct-tag of a StructField and parses the `form` value.
// returned are the form label, name-property, type and wether the field should be ignored.
func parseFormTag(fieldT reflect.StructField) (label, name, fType string, ignored bool) {
	tags := strings.Split(fieldT.Tag.Get("form"), ",")
	label = fieldT.Name + ": "
	name = fieldT.Name
	fType = "text"
	ignored = false

	switch len(tags) {
	case 1:
		if tags[0] == "-" {
			ignored = true
		}
		if len(tags[0]) > 0 {
			name = tags[0]
		}
	case 2:
		if len(tags[0]) > 0 {
			name = tags[0]
		}
		if len(tags[1]) > 0 {
			fType = tags[1]
		}
	case 3:
		if len(tags[0]) > 0 {
			name = tags[0]
		}
		if len(tags[1]) > 0 {
			fType = tags[1]
		}
		if len(tags[2]) > 0 {
			label = tags[2]
		}
	}
	return
}

func isStructPtr(t reflect.Type) bool {
	return t.Kind() == reflect.Ptr && t.Elem().Kind() == reflect.Struct
}

// go1.2 added template funcs. begin
var (
	errBadComparisonType = errors.New("invalid type for comparison")
	errBadComparison     = errors.New("incompatible types for comparison")
	errNoComparison      = errors.New("missing argument for comparison")
)

type kind int

const (
	invalidKind kind = iota
	boolKind
	complexKind
	intKind
	floatKind
	integerKind
	stringKind
	uintKind
)

func basicKind(v reflect.Value) (kind, error) {
	switch v.Kind() {
	case reflect.Bool:
		return boolKind, nil
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return intKind, nil
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		return uintKind, nil
	case reflect.Float32, reflect.Float64:
		return floatKind, nil
	case reflect.Complex64, reflect.Complex128:
		return complexKind, nil
	case reflect.String:
		return stringKind, nil
	}
	return invalidKind, errBadComparisonType
}

// eq evaluates the comparison a == b || a == c || ...
func eq(arg1 interface{}, arg2 ...interface{}) (bool, error) {
	v1 := reflect.ValueOf(arg1)
	k1, err := basicKind(v1)
	if err != nil {
		return false, err
	}
	if len(arg2) == 0 {
		return false, errNoComparison
	}
	for _, arg := range arg2 {
		v2 := reflect.ValueOf(arg)
		k2, err := basicKind(v2)
		if err != nil {
			return false, err
		}
		if k1 != k2 {
			return false, errBadComparison
		}
		truth := false
		switch k1 {
		case boolKind:
			truth = v1.Bool() == v2.Bool()
		case complexKind:
			truth = v1.Complex() == v2.Complex()
		case floatKind:
			truth = v1.Float() == v2.Float()
		case intKind:
			truth = v1.Int() == v2.Int()
		case stringKind:
			truth = v1.String() == v2.String()
		case uintKind:
			truth = v1.Uint() == v2.Uint()
		default:
			panic("invalid kind")
		}
		if truth {
			return true, nil
		}
	}
	return false, nil
}

// ne evaluates the comparison a != b.
func ne(arg1, arg2 interface{}) (bool, error) {
	// != is the inverse of ==.
	equal, err := eq(arg1, arg2)
	return !equal, err
}

// lt evaluates the comparison a < b.
func lt(arg1, arg2 interface{}) (bool, error) {
	v1 := reflect.ValueOf(arg1)
	k1, err := basicKind(v1)
	if err != nil {
		return false, err
	}
	v2 := reflect.ValueOf(arg2)
	k2, err := basicKind(v2)
	if err != nil {
		return false, err
	}
	if k1 != k2 {
		return false, errBadComparison
	}
	truth := false
	switch k1 {
	case boolKind, complexKind:
		return false, errBadComparisonType
	case floatKind:
		truth = v1.Float() < v2.Float()
	case intKind:
		truth = v1.Int() < v2.Int()
	case stringKind:
		truth = v1.String() < v2.String()
	case uintKind:
		truth = v1.Uint() < v2.Uint()
	default:
		panic("invalid kind")
	}
	return truth, nil
}

// le evaluates the comparison <= b.
func le(arg1, arg2 interface{}) (bool, error) {
	// <= is < or ==.
	lessThan, err := lt(arg1, arg2)
	if lessThan || err != nil {
		return lessThan, err
	}
	return eq(arg1, arg2)
}

// gt evaluates the comparison a > b.
func gt(arg1, arg2 interface{}) (bool, error) {
	// > is the inverse of <=.
	lessOrEqual, err := le(arg1, arg2)
	if err != nil {
		return false, err
	}
	return !lessOrEqual, nil
}

// ge evaluates the comparison a >= b.
func ge(arg1, arg2 interface{}) (bool, error) {
	// >= is the inverse of <.
	lessThan, err := lt(arg1, arg2)
	if err != nil {
		return false, err
	}
	return !lessThan, nil
}

// go1.2 added template funcs. end

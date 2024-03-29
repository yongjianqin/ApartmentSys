// Beego (http://beego.me/)

// @description beego is an open-source, high-performance web framework for the Go programming language.

// @link        http://github.com/astaxie/beego for the canonical source repository

// @license     http://github.com/astaxie/beego/blob/master/LICENSE

// @authors     astaxie

package beego

import (
	"html/template"
	"net/url"
	"reflect"
	"testing"
	"time"
)

func TestSubstr(t *testing.T) {
	s := `012345`
	if Substr(s, 0, 2) != "01" {
		t.Error("should be equal")
	}
	if Substr(s, 0, 100) != "012345" {
		t.Error("should be equal")
	}
}

func TestHtml2str(t *testing.T) {
	h := `<HTML><style></style><script>x<x</script></HTML><123>  123\n


	\n`
	if Html2str(h) != "123\\n\n\\n" {
		t.Error("should be equal")
	}
}

func TestDateFormat(t *testing.T) {
	ts := "Mon, 01 Jul 2013 13:27:42 CST"
	tt, _ := time.Parse(time.RFC1123, ts)

	if ss := DateFormat(tt, "2006-01-02 15:04:05"); ss != "2013-07-01 13:27:42" {
		t.Errorf("2013-07-01 13:27:42 does not equal %v", ss)
	}
}

func TestDate(t *testing.T) {
	ts := "Mon, 01 Jul 2013 13:27:42 CST"
	tt, _ := time.Parse(time.RFC1123, ts)

	if ss := Date(tt, "Y-m-d H:i:s"); ss != "2013-07-01 13:27:42" {
		t.Errorf("2013-07-01 13:27:42 does not equal %v", ss)
	}
	if ss := Date(tt, "y-n-j h:i:s A"); ss != "13-7-1 01:27:42 PM" {
		t.Errorf("13-7-1 01:27:42 PM does not equal %v", ss)
	}
	if ss := Date(tt, "D, d M Y g:i:s a"); ss != "Mon, 01 Jul 2013 1:27:42 pm" {
		t.Errorf("Mon, 01 Jul 2013 1:27:42 pm does not equal %v", ss)
	}
	if ss := Date(tt, "l, d F Y G:i:s"); ss != "Monday, 01 July 2013 13:27:42" {
		t.Errorf("Monday, 01 July 2013 13:27:42 does not equal %v", ss)
	}
}

func TestCompare(t *testing.T) {
	if !Compare("abc", "abc") {
		t.Error("should be equal")
	}
	if Compare("abc", "aBc") {
		t.Error("should be not equal")
	}
	if !Compare("1", 1) {
		t.Error("should be equal")
	}
}

func TestHtmlquote(t *testing.T) {
	h := `&lt;&#39;&nbsp;&rdquo;&ldquo;&amp;&quot;&gt;`
	s := `<' ”“&">`
	if Htmlquote(s) != h {
		t.Error("should be equal")
	}
}

func TestHtmlunquote(t *testing.T) {
	h := `&lt;&#39;&nbsp;&rdquo;&ldquo;&amp;&quot;&gt;`
	s := `<' ”“&">`
	if Htmlunquote(h) != s {
		t.Error("should be equal")
	}
}

func TestParseForm(t *testing.T) {
	type user struct {
		Id    int         `form:"-"`
		tag   string      `form:"tag"`
		Name  interface{} `form:"username"`
		Age   int         `form:"age,text"`
		Email string
		Intro string `form:",textarea"`
	}

	u := user{}
	form := url.Values{
		"Id":       []string{"1"},
		"-":        []string{"1"},
		"tag":      []string{"no"},
		"username": []string{"test"},
		"age":      []string{"40"},
		"Email":    []string{"test@gmail.com"},
		"Intro":    []string{"I am an engineer!"},
	}
	if err := ParseForm(form, u); err == nil {
		t.Fatal("nothing will be changed")
	}
	if err := ParseForm(form, &u); err != nil {
		t.Fatal(err)
	}
	if u.Id != 0 {
		t.Errorf("Id should equal 0 but got %v", u.Id)
	}
	if len(u.tag) != 0 {
		t.Errorf("tag's length should equal 0 but got %v", len(u.tag))
	}
	if u.Name.(string) != "test" {
		t.Errorf("Name should equal `test` but got `%v`", u.Name.(string))
	}
	if u.Age != 40 {
		t.Errorf("Age should equal 40 but got %v", u.Age)
	}
	if u.Email != "test@gmail.com" {
		t.Errorf("Email should equal `test@gmail.com` but got `%v`", u.Email)
	}
	if u.Intro != "I am an engineer!" {
		t.Errorf("Intro should equal `I am an engineer!` but got `%v`", u.Intro)
	}
}

func TestRenderForm(t *testing.T) {
	type user struct {
		Id      int         `form:"-"`
		tag     string      `form:"tag"`
		Name    interface{} `form:"username"`
		Age     int         `form:"age,text,年龄："`
		Sex     string
		Email   []string
		Intro   string `form:",textarea"`
		Ignored string `form:"-"`
	}

	u := user{Name: "test", Intro: "Some Text"}
	output := RenderForm(u)
	if output != template.HTML("") {
		t.Errorf("output should be empty but got %v", output)
	}
	output = RenderForm(&u)
	result := template.HTML(
		`Name: <input name="username" type="text" value="test"></br>` +
			`年龄：<input name="age" type="text" value="0"></br>` +
			`Sex: <input name="Sex" type="text" value=""></br>` +
			`Intro: <textarea name="Intro">Some Text</textarea>`)
	if output != result {
		t.Errorf("output should equal `%v` but got `%v`", result, output)
	}
}

func TestRenderFormField(t *testing.T) {
	html := renderFormField("Label: ", "Name", "text", "Value")
	if html != `Label: <input name="Name" type="text" value="Value">` {
		t.Errorf("Wrong html output for input[type=text]: %v ", html)
	}

	html = renderFormField("Label: ", "Name", "textarea", "Value")
	if html != `Label: <textarea name="Name">Value</textarea>` {
		t.Errorf("Wrong html output for textarea: %v ", html)
	}
}

func TestParseFormTag(t *testing.T) {
	// create struct to contain field with different types of struct-tag `form`
	type user struct {
		All       int `form:"name,text,年龄："`
		NoName    int `form:",hidden,年龄："`
		OnlyLabel int `form:",,年龄："`
		OnlyName  int `form:"name"`
		Ignored   int `form:"-"`
	}

	objT := reflect.TypeOf(&user{}).Elem()

	label, name, fType, ignored := parseFormTag(objT.Field(0))
	if !(name == "name" && label == "年龄：" && fType == "text" && ignored == false) {
		t.Errorf("Form Tag with name, label and type was not correctly parsed.")
	}

	label, name, fType, ignored = parseFormTag(objT.Field(1))
	if !(name == "NoName" && label == "年龄：" && fType == "hidden" && ignored == false) {
		t.Errorf("Form Tag with label and type but without name was not correctly parsed.")
	}

	label, name, fType, ignored = parseFormTag(objT.Field(2))
	if !(name == "OnlyLabel" && label == "年龄：" && fType == "text" && ignored == false) {
		t.Errorf("Form Tag containing only label was not correctly parsed.")
	}

	label, name, fType, ignored = parseFormTag(objT.Field(3))
	if !(name == "name" && label == "OnlyName: " && fType == "text" && ignored == false) {
		t.Errorf("Form Tag containing only name was not correctly parsed.")
	}

	label, name, fType, ignored = parseFormTag(objT.Field(4))
	if ignored == false {
		t.Errorf("Form Tag that should be ignored was not correctly parsed.")
	}
}

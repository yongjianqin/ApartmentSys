package Login

import(
	"testing"
	"fmt"
	"conf"
)

func init(){
	conf.Init()
}

func Test_isAccountExist(t *testing.T) {
	isExist, err := isAccountExist(123456) //测试存在的
	if (isExist == true) {
		fmt.Println("账号存在")
	}else if (err != nil) {
		t.Error("发生问题")
	}else {
		fmt.Println("不账号存在")
	}
}


func Test_IsLoginOk(t *testing.T){
	isExist, err := isLoginOk(123456,"123456") //测试存在的
	if (isExist == true) {
		fmt.Println("登陆成功")
	}else if (err != nil) {
		t.Error("发生问题")
	}else {
		t.Error("密码错误")
	}
}

func Test_Login(t *testing.T){
	result,_:= Login(123456,"123456") //测试存在的
	if(result=="登陆成功"){
		fmt.Println("ok")
	}else{
		t.Error("系统出错")
	}
}

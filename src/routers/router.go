package routers

import (
	"github.com/astaxie/beego"
	"controllers/Ademo"
)

func Init() {
	beego.SetStaticPath("/html", "html")
	beego.Router("/Login",&Ademo.LoginCtrl{},"post:Login")
}

package admin

import (
	"github.com/astaxie/beego"
//	."controllers/common"
)


type UserMgrCtrl struct {
	beego.Controller
}

func (this *UserMgrCtrl)Get(){
	//this.Ctx.Redirect(302, "html/login.html")
	this.Ctx.Redirect(302,"html/index.html")
}

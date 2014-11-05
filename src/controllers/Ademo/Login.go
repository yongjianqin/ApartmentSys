package Ademo

import (
	"github.com/astaxie/beego"
	. "controllers/common"
	"models/persistence/Login"
)

type LoginCtrl struct {
	beego.Controller
}

func (p *LoginCtrl) Login(){
	account ,_:= p.GetInt("account")
	pwd := p.GetString("pwd")
	result,flag:= Login.Login(account,pwd)
	OutputJson(p.Ctx.ResponseWriter, Result{flag,result,nil})
}

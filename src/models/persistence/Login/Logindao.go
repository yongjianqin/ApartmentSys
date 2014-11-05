package Login

import (
	"logger"
	"models/table"
	"conf"
)


func Login(account int64,pwd string)(string,bool){
	isExist,err:=isAccountExist(account)
	if(err!=nil){
		return "系统出错",false
	}else if(!isExist){
		return "账号不存在",false
	}

	isOK,err2 := isLoginOk(account,pwd)
	if(err2!=nil){
		return "系统出错",false
	}else if(!isOK){
		return "密码错误",false
	}
	return "登陆成功",true
}


func isAccountExist(account int64)(bool,error){
	logger.Info("isAccountExist")
	user := new(table.Demo_user)

	total, err := conf.DB_xorm.Where("account =?", account).Count(user)

	return total==1, err
}

func isLoginOk(account int64,pwd string)(bool,error){
	logger.Info("IsLoginOk")
	user := new(table.Demo_user)

	total, err := conf.DB_xorm.Where("account =? or pwd = ?", account,pwd).Count(user)

	return total==1, err
}

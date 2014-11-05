package conf

import (
	_"github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
	"fmt"
	"logger"
	"models/table"
)

//数据库连接参数
const (
	dbUser = "zhj"
	dbPassword = "123456"
	dbUrl = "zhuhuanjian3306.mysql.rds.aliyuncs.com:3306"
	dbName  = "salehouse"
)

var DB_xorm *xorm.Engine

func Init(){
	var err error
	params := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=true", dbUser, dbPassword, dbUrl, dbName)
	DB_xorm ,err = xorm.NewEngine("mysql",params)
	if err != nil{
		logger.Error("连接数据库失败：",err)
		panic(err)
	}

		//缓存方式是存放到内存中，缓存struct的记录数为1000条
		cacher := xorm.NewLRUCacher(xorm.NewMemoryStore(), 500)
		DB_xorm.SetDefaultCacher(cacher)

		//控制台打印SQL语句
		DB_xorm.ShowSQL = true

		//控制台打印调试信息
		DB_xorm.ShowDebug = true

		//控制台打印错误信息
		DB_xorm.ShowErr = true

		//控制台打印警告信息
		DB_xorm.ShowWarn = true

		InitModel()
}




//注册表结构
func InitModel(){
	logger.Info("---------------------> 注册表结构 <------------------------------")
	err := DB_xorm.Sync2(new(table.Demo_user))
	if err != nil {
		logger.Info("注册表结构失败：",err)
	}
}

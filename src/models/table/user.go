package table

type User struct {
	Tid            int64                 `xorm:"pk autoincr"`
	User_name     string                 `xorm:" varchar(50)"`
	Account       string                 `xorm:"unique index varchar(50)"`
	Pwd           string                 `xorm:"varchar:(50)"`
}

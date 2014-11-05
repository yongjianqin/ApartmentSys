package table

type  Demo_user struct {
	Tid int64 `xorm:"pk;autoincr"`
	Account int64
	Pwd string
}

package common

import (
	"encoding/json"
	"logger"
	"net/http"
)

// 返回前台的数据类型
type Result struct {
	IsSuccess bool        // 处理状态
	Reason    string      // 处理状态原因（错误）
	Data      interface{} // 返回前台的数据
}

// 将数据处理成Json格式，并发送并到前台
func OutputJson(arg_writer http.ResponseWriter, arg_result Result) {
	jResult, err := json.Marshal(arg_result)
	if err != nil {
		logger.Error(err)
		return
	}
	arg_writer.Write(jResult)
}

/**
	获取总页数
	@author Zf.D
	@params 数据总条数 int64，每页数据条数 int64
	@return 数据总页数 int64
 */
func GetTotalPage(arg_totalCount, arg_perPage int64) (totalPage int64) {
	if arg_totalCount == 0{
		return 1
	}
	if arg_totalCount % arg_perPage == 0 {
		totalPage = arg_totalCount / arg_perPage
	} else {
		totalPage = arg_totalCount / arg_perPage  +  1
	}
	return
}



package common

/**
 * Created by Zf_D on 2014-10-04
 */
import (
	"testing"
	."github.com/smartystreets/goconvey/convey"
)


func Test_GetTotalPage(t *testing.T) {
	Convey("Test func getTotalPage", t, func() {
		So(GetTotalPage(1, 10), ShouldEqual, 1)
		So(GetTotalPage(11, 10), ShouldEqual, 2)
		So(GetTotalPage(20, 10), ShouldEqual, 2)
	})
}

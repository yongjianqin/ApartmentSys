/**
 * Created by zhanggj on 2014/11/6.
 */
LoginApp.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.account ="";
    $scope.pwd = "";

    $scope.params= {account:'',pwd:''}
    $scope.Login = function(){

        $http.post("/Login",$scope.params).success(function(data) {

           window.location="../html/tpl/success.html";

        },"json").error(function() {
            alert("错误")
        })
    }
       /* $http.post("/Login",params).success(function(data) {


                alert(data.Reason)

        },"json").error(function() {
            alert("错误")
        })
    }*/


}])
/********** @ author bingoo ** 项目全局基础事件 ***********/
function mobileBodyMinScale(){  //移动端body自动缩小最小宽高
	var WS = {}, OS = detectOS();
	if(!OS.mobile) return;
	WS.myFn = function (){
		WS.oHtml = document.getElementsByTagName('html')[0];
		WS.oBody = document.body;
		WS.oDivBody = binApp.$('.g-body');
		WS.iMS = binApp.winScaleData();
		binApp.css(WS.oHtml,{minWidth:WS.iMS.minW,minHeight:WS.iMS.minH});
		binApp.css(WS.oBody,{minWidth:WS.iMS.minW,minHeight:WS.iMS.minH});
		if(WS.oDivBody[0]) binApp.css(WS.oDivBody[0],{minWidth:WS.iMS.minW,minHeight:WS.iMS.minH});
	};
	WS.myFn();
	binApp.bind(window,'resize',WS.myFn);
}
function showLoading(callback){
	binApp.loadingIn({
		css:{width:'86px',height:'70px',backgroundPosition:'center 10px'},
		innerHTML:'<div style="text-align:center;color:#efefef;padding-top:46px;line-height:14px;font-size:14px;">加载中...</div>'
	},callback);
}
function hideLoading(callback){
	binApp.loadingOut(callback);
}
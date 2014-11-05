/********** @ author bingoo ** 原生javascript 常用事件 ***********/
(function (win,doc){
	this._Tween = {
		Linear: function(t,b,c,d){ return c*t/d + b;},
		Quad: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		Quart: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			}
		},
		Quint: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		Sine: {
			easeIn: function(t,b,c,d){
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOut: function(t,b,c,d){
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			}
		},
		Expo: {
			easeIn: function(t,b,c,d){
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOut: function(t,b,c,d){
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function(t,b,c,d){
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
			},
			easeInOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		},
		Back: {
			easeIn: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function(t,b,c,d){
				return c - _Tween.Bounce.easeOut(d-t, 0, c, d) + b;
			},
			easeOut: function(t,b,c,d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOut: function(t,b,c,d){
				if (t < d/2) return _Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
				else return _Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		}
	};
	/****************************************
	 @ BINGOO 命名空间 应用事件
	*****************************************/
	this.binApp = this.binApp || {
		myStyle : [
			{name : ".binWinMask", cssText : "position:fixed;width:100%;height:100%;left:0;top:0;background:black;opacity:0;filter:alpha(opacity=0);z-index:9898;_position:absolute;_width:expression(document.documentElement.clientWidth+'px');_height:expression(document.documentElement.scrollHeight+'px');"},
			{name : ".binTips_mBg", cssText : "width:100%;height:100%;opacity:1;filter:alpha(opacity=100);position:absolute;left:-5px;top:-5px;box-shadow:1px 1px 0 white,-1px -1px 0 white,0 2px 15px rgba(35,35,35,.5);text-shadow:#fff 1px 1px 2px;border-radius:5px;background:#fff;border: 5px solid #eaeaea;"},
			{name : ".binTips_middle", cssText : "position:fixed;z-index:98168;left: 50%;top:0;margin:0;min-width:280px;max-width:98%;height:auto;line-height:21px;text-align: center;color:#606060;font-size:14px;font-weight: normal;_position:absolute;_width:expression(this.offsetWidth<280?280+'px':true);"},
			{name : ".binTips_info", cssText : "position:relative;z-index:168;padding:35px 25px;line-height:21px;"},
			{name : ".binTips_top", cssText : "position:fixed;z-index:98168;left: 50%;top:0;margin:0;min-width:280px;max-width:98%;height:auto;line-height:21px;text-align: center;color:#606060;font-size:14px;font-weight: normal;_position:absolute;_width:expression(this.offsetWidth<280?280+'px':true);"},
			{name : ".binTips_top .binTips_mBg", cssText : "border-radius:0 0 10px 10px;"},
			{name : ".binTips_top .binTips_info", cssText : "padding:135px 25px 15px;"},
			{name : ".binTips_ft_bar", cssText : "padding:5px 5px 0;position:relative;z-index:10;min-width:358px;background-color: #eaeaea;border-top:1px solid #ccc;box-shadow:0 1px 0 #fff inset;"},
			{name : ".binTips_ft_bar a", cssText : "margin:0 8px;border:1px solid #c1c1c1;display:inline-block;color:#606060;line-height:100%;padding:4px 20px 5px;border-radius:3px;background:white;background: -webkit-linear-gradient(90deg, #ebebeb , white);background: -moz-linear-gradient(90deg, #ebebeb, white);background: -o-linear-gradient(90deg, #ebebeb, white);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='white', endColorstr='#ebebeb', GradientType='0');"},
			{name : ".binTips_ft_bar a:hover", cssText : "text-decoration: none;border-color:#90d2ed;color:#007fb0;background:#dff4fc;background:-webkit-linear-gradient(90deg, #dff4fc, white);background:-moz-linear-gradient(90deg, #dff4fc, white);background:-o-linear-gradient(90deg, #dff4fc, white);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='white', endColorstr='#dff4fc', GradientType='0');text-shadow:1px 1px 0 white;"},
			{name: ".binTips_hd_bar", cssText : "text-indent:10px;text-align:left;height:30px;line-height:22px;position:absolute;left:0;top:0;width:100%;z-index:100;background-color: #eaeaea;border-bottom:1px solid #ccc;box-shadow:0 -1px 0 #fff inset;color:#333;"},
			{name: ".binTips_hd_bar .close-btn", cssText : "text-indent:0;position:absolute;right:5px;top:2px;line-height:100%;padding:3px 5px;display:block;border-radius:3px;color:#b1b1b1;font:12px/1 'lucida Grande',Verdana,Arial;"},
			{name: ".binTips_hd_bar .close-btn:hover", cssText : "text-decoration: none;background:#ccc;color:white;text-shadow:-1px -1px 0 #c1c1c1;"},
			{name: ".binDrag", cssText : "cursor: move;"},
			{name : ".oFullScreenLoading", cssText : "position:fixed;z-index:99999;width:68px;height:68px;margin:-34px 0 0 -34px;left:50%;top:50%;background:#101010 url(imgs/loading.gif) no-repeat center center;border-radius:8px;_position:absolute;_top:expression(document.documentElement.scrollHeight+document.documentElement.clientHeight/2+'px');"}
		],
		/* @ 监听事件处理程序 ------------------------*/
		addEvent : function(elem,type,handler,test){
			if(!elem.$guid) elem.$guid = 0;  //用来创建唯一的ID的计数器
			if(!elem.$events) elem.$events = {};
			if(!elem.$events[type]) elem.$events[type] = {};
			for(var key in elem.$events[type]){
				if(elem.$events[type][key].toString() == handler.toString()){return;}
			}
			elem.$guid++;
			elem.$events[type][elem.$guid] = handler;
			elem["on"+type] = binApp.handleEvent;
		},
		removeEvent : function(elem,type,handler){
			if(elem.$events && elem.$events[type] && !handler){
				elem.$events[type] = {};
			}else if(elem.$events && elem.$events[type] && handler){
				for(var key in elem.$events[type]){
					if(elem.$events[type][key].toString() == handler.toString()){delete elem.$events[type][key];}
				}
			}
		},
		handleEvent : function (event){
			event = event || window.event;
			event && event.stopPropagation ? event.stopPropagation() : window.event.cancelBubble = true;
			var returnValue = true;
			for(var key in this.$events[event.type]){
				this.$handleEvent = this.$events[event.type][key];
				if (this.$handleEvent(event) === false) {
					returnValue = false;
				}
			}
			return returnValue;
		},
		/* @ 监听事件处理程序 end ------------------------*/
		/* @ 事件绑定，事件解除处理程序 ------------------------*/
		bind : function(dom,type,fn,fnName){
			dom.eventQueue = dom.eventQueue || {};
			dom.eventQueue[type] = dom.eventQueue[type] || {};
			dom.handler = dom.handler || {};
			if(binApp.checkEvent(dom,type,fn).bool){ return; }
			if (!fnName) {
				var index = dom[type+'EventId'] ? dom[type+'EventId'] : 0;
				index++;
				dom[type+'EventId'] = index;
				dom.eventQueue[type]['fnQueue'+index] = fn;
			}
			else {
				dom.eventQueue[type][fnName] = fn;
			};
			if (!dom.handler[type]) binApp.bindEvent(dom,type);
		},
		bindEvent : function (dom,type){
			dom.handler[type] = function(event){
				for(var guid in dom.eventQueue[type]){
					if(typeof dom.eventQueue[type][guid] == 'function'){
						dom.eventQueue[type][guid].call(dom,event);
					}
				}
			};
			window.addEventListener ? dom.addEventListener(type,dom.handler[type],false) : dom.attachEvent('on'+type,dom.handler[type]);
		},
		checkEvent : function (dom,type,fn){
			var D = {};
			for(var guid in dom.eventQueue[type]){
				if(typeof dom.eventQueue[type][guid] == 'function' && (dom.eventQueue[type][guid]).toString() == fn.toString()){
					D.bool = true;
					D.guid = guid;
					break;
				}
			}
			return D;
		},
		unbind : function (dom,type,fnName){
			var hasQueue = dom.eventQueue && dom.eventQueue[type];
			if (!hasQueue) return;
			if (!fnName) {
				binApp.unBindEvent(dom,type);
			}
			else {
				switch(typeof fnName){
					case 'function':
						var C = binApp.checkEvent(dom,type,fnName);
						if(C.bool){ delete dom.eventQueue[type][C.guid]; }
						break;
					case "string":
						delete dom.eventQueue[type][fnName];
						break;
				}
				if(binApp.eventQueueLength(dom,type) == 0) binApp.unBindEvent(dom,type);
			};
		},
		unBindEvent : function (dom,type){
			//window.removeEventListener ? dom.removeEventListener(type,dom.handler[type]) : dom.detachEvent(type,dom.handler[type]);
			delete dom.eventQueue[type];
		},
		eventQueueLength : function (dom,type){
			var index = 0;
			for (var length in dom.eventQueue[type]){ index++ ; }
			return index;
		},
		/* @ bingoo 事件队列监听处理程序 end ------------------------*/
		onload : function(argu,fnName){
			this.bind(win,"load",argu,fnName);
		},
		$ : function (argu,type){ //选择器
			var elem = null;
			switch (typeof argu){
				case "function":
					this.onload(argu);
					break;
				case "string":
					switch(argu.charAt(0)){
						case "#": //ID
							if(type == "object" || type == "obj")
							elem = doc.getElementById(argu.substring(1));
							else
							elem.push(doc.getElementById(argu.substring(1)));
							break;
						case ".": //class
							elem = binApp.getByClass(doc, argu.substring(1),"*");
							break;
						default: //tagName
							elem = doc.getElementsByTagName(argu);
					};
					break;
				case 'object':
					elem = argu;
					break;
			};
			return elem;
		},
		children : function(e,tagName){ //取子元素
			var a = e.children, d = [];
			for(var i=0;i<a.length;i++){ 
				((a[i].tagName).toLowerCase() == tagName.toLowerCase()) ? d.push(a[i]) : null;
			}
			return d;
		},
		getId : function (argu){
			return doc.getElementById(argu);
		},
		getByClass : function (parent, className, tagName){  //获取class对象
			var elem = [], child  = parent.getElementsByTagName(tagName || '*');
			for (var i=0;i<child.length;i++) {
				if(child[i].className.match(new RegExp('(\\s|^)' + (className.replace(/(^\s*)|(\s*$)/g, "")) + '(\\s|$)'),"g")) elem.push(child[i]);
			}
			return elem;
		},
		hasClass : function(elem, className) { //校验是否包含class
			if(!elem) return false;
			return elem.className.match(new RegExp('(\\b|^)' + (className.replace(/(^\s*)|(\s*$)/g, "")) + '(\\b|$)'),"g");
		},
		addClass : function (elem, className) { //追加class
			if(!elem) return false;
			if (!this.hasClass(elem, className)) elem.className += " " + (className.replace(/(^\s*)|(\s*$)/g, ""));
		},
		removeClass : function (elem, className) { //删除class
			if (binApp.hasClass(elem, className)) {
				var reg = new RegExp('(\\b|^)' + (className.replace(/(^\s*)|(\s*$)/g, "")) + '(\\b|$)',"g");
				elem.className = (elem.className.replace(reg, ' ')).replace(/\s+/g, ' ').replace(/(^\s*)|(\s*$)/g, "");
			}
		},
		getStyle : function (elem,attr){ //兼容获取样式值
			return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem, false)[attr];
		},
		objSet : function (){ //设置对象变量 || css
			for(var i=0;i<arguments.length;i++){
				for(var k in arguments[i]['json']){
					if(arguments[i]['css']){
						arguments[i]['e']['style'][k] = arguments[i]['json'][k];
					}else{
						arguments[i]['e'][k] = arguments[i]['json'][k];
					}
				}
			}
		},
		getHandlerName : function(handler){ //获取类名或函数名
			if(handler === null)
			return false;
			if (typeof handler == "object")
			return /(\w+)\(/.exec(handler.constructor.toString())[1];
			if (typeof handler == "function")
			return new String(handler).replace(/^function(\s|\n)+(.+)\((.|\n)+$/,'$2');
		},
		getType : function(o) { //获取对象类型
			if(typeof o == "object"){
				if(o instanceof Array || o.constructor == Array)
				return "array";
				if(o instanceof Number || o.constructor == Number)
				return "number";
				if(o instanceof String || o.constructor == String)
				return "string";
				if(o instanceof Date || o.constructor == Date)
				return "date";
				if(o instanceof Object || o.constructor == Object)
				return "object";
			}else
			return typeof o;
		},
		/* @ bingoo 运动框架（缓动类） --------------
		*  mode : Quad || Cubic || Quart || Quint || Sine || Expo || Circ || Elastic || Back || Bounce
		*  efect : easeIn(从0开始加速的缓动) || easeOut(减速到0的缓动) || easeInOut(前半段从0开始加速，后半段减速到0的缓动) */
		animate : function(elem,opts,json,time,callback){
			clearInterval(elem.timer);
			var config = {};
			config.startTime = new Date();
			config.nowTime = new Date();
			config.mode = opts.mode; //模式
			config.effect = opts.effect; //效果
			config.t = 0; //当前时间
			config.d = time=='fast' ? 300 : time=='slow' ? 800 : time=='normal' ? 500 : time || 500; //持续时间，分1毫秒帧执行
			config.b = []; //初始值
			config.c = []; //变化值
			config.tagVal = []; //目标值
			config.attr = [];
			for(key in json){
				var iCur = key == 'opacity' ? parseFloat(binApp.getStyle(elem,key)) * 100 : parseFloat(binApp.getStyle(elem,key));
				config.b.push(iCur);
				config.c.push(-(iCur - json[key]));
				config.tagVal.push(json[key]);
				config.attr.push(key);
			}
			config.offLen = config.attr.length;
			var _setStyle = function (i,end){
				var countVal = end ? config.tagVal[i] : _count(i);
				switch(config.attr[i]){
					case 'opacity':
						elem.style[config.attr[i]] = countVal / 100;
						elem.style.filter = 'alpha(opacity='+ countVal +')';
						break;
					default:
						elem.style[config.attr[i]] = countVal + "px";
				}
			},
			_count = function (i){
				return Math.ceil(_Tween[config.mode][config.effect](config.t,config.b[i],config.c[i],config.d));
			},
			_animate = function (){
				config.nowTime = new Date();
				config.t = config.nowTime - config.startTime;
				config.t >= config.d ? config.t = config.d : null;
				for(var i=0;i<config.offLen;i++){
					_setStyle(i);
				}
				if(config.t >= config.d)
				{
					 clearInterval(elem.timer);
					 for(var j=0;j<config.offLen;j++){
						_setStyle(j,'end');
					 }
					 if(config.t == config.d){
						 callback && callback.call(elem);
					 }
				}
			};
			elem.timer = setInterval(_animate, 1);
		},
		/* @ bingoo 运动框架 end ------------------------*/
		sildeDown : function (elem,time,callback){ //binApp.sildeDown(elem,time,callback);
			this.objSet({e:elem,json:{display:"block",height:"",overflow:"hidden"},css:true});
			var getH = parseInt(elem.clientHeight);
			elem.style.height = "0px";
			this.animate(elem, {mode:'Quad', effect:'easeInOut'}, {height:getH,opacity:100}, time ? time : 'normal', function (){
				elem.style.overflow = "visible";
				callback && callback.call(elem);
			});
		},
		sildeUp : function (elem,time,callback){ //binApp.sildeUp(elem,time,callback);
			elem.style.overflow = "hidden";
			var getH = parseInt(elem.clientHeight);
			this.animate(elem, {mode:'Quad', effect:'easeInOut'}, {height:0,opacity:0}, time ? time : 'normal', function (){
				elem.style.display = "none";
				callback && callback.call(elem);
			});
		},
		fadeIn : function (elem,time,callback){ //binApp.fadeIn(elem,time,callback);
			this.objSet({e:elem,json:{display:"block",opacity:"0",filter:"alpha(opacity=0)"},css:true});
			this.animate(elem, {mode:'Quad', effect:'easeInOut'}, {opacity:100}, time ? time : 'normal',function (){
				callback && callback.call(elem);
			});
		},
		fadeOut : function (elem,time,callback){ //binApp.fadeOut(elem,time,callback);
			this.animate(elem, {mode:'Quad', effect:'easeInOut'}, {opacity:0}, time ? time : 'normal',function (){
				elem.style.display = "none";
				callback && callback.call(elem);
			});
		},
		removeElement : function (){ //删除元素 binApp.removeElement([elem]);
			for(var i=0;i<arguments.length;i++){
				var _parentElement = arguments[i].parentNode;
				if(_parentElement){
					_parentElement.removeChild(arguments[i]);
				}
			} 
		},
		clearAllNode : function (parentNode){ //删除所有子元素 binApp.clearAllNode(elem);
			while (parentNode.firstChild){
				var oldNode = parentNode.removeChild(parentNode.firstChild);
				oldNode = null;
			}
		},
		showNode : function (){ //显示元素 binApp.showNode([elem]);
			for(var i=0;i<arguments.length;i++){
				arguments[i].style.display = "block";
			} 
		},
		hideNode : function (){ //隐藏元素 binApp.hideNode([elem]);
			for(var i=0;i<arguments.length;i++){
				arguments[i].style.display = "none";
			} 
		},
		pageX : function (elem){ //获取元素相对于这个页面的x坐标。
			return elem.getBoundingClientRect().left + (document.documentElement.scrollLeft || document.body.scrollLeft);
		},
		pageY : function (elem){ //获取元素相对于这个页面的Y坐标。
			return elem.getBoundingClientRect().top + (document.documentElement.scrollTop || document.body.scrollTop);
		},
		toTime : function(iSec){ // hh:mm:ss format 秒数返回时间格式
			var iH = Math.floor(iSec / 3600);
			var iMin = Math.floor(iSec / 60);
			iSec = iSec - (iMin * 60);
			if(iH >= 1){
				iMin -= iH * 60;
				return binApp.fillZero(iH,2) + ":" + binApp.fillZero(iMin,2) + ":" + binApp.fillZero(iSec,2);
			}
			return binApp.fillZero(iMin,2) + ":" + binApp.fillZero(iSec,2);
		},
		fillZero : function (num, digit){ //前零填补
			var str=''+num;
			while(str.length<digit){
				str='0'+str;
			}
			return str;
		},
		each : function (elems,callback){ //元素循环
			for(var i=0;i<elems.length;i++){
				elems[i].index = i;
				callback.call(elems[i],i);
			}
		},
		hover : function (elem,fnOver, fnOut){ //mouseover && mouseout
			binApp.bind(elem,"mouseover", function(event){
				if(fixedMouse((event || window.event),elem)) fnOver.call(elem);
			});
			if(fnOut){
				binApp.bind(elem,"mouseout", function (event){
					if(fixedMouse((event || window.event),elem)) fnOut.call(elem);
				});
			}
		},
		css : function (elem,json){
			switch(typeof json){
				case 'string':
					binApp.getStyle(elem,json);
					break;
				default :
					for(key in json){
						elem.style[key] = (typeof json[key] == "number") ? json[key]+="px" : json[key];
					}
			}
		},
		//DOM元素对位 binApp.domElemBit(object,{mode:"Back",effect:"easeInOut",negNum:80},1500);
		domElemBit : function (elem,opts,time){
			clearInterval(elem.domElemBitTimer);
			var iScrollTop = (binApp.pageY(elem)-("negNum" in opts ? opts.negNum : 0)),t = 0,d = time,b = document.documentElement.scrollTop || document.body.scrollTop,c = -(b-iScrollTop),startTime = new Date(),nowTime = new Date(),domElemBitTimer = null;
			//document.title=(binApp.pageY(elem)+", "+ iScrollTop);
			function doMove(){
				nowTime = new Date();
				t = nowTime - startTime;
				t >= d ? t = d : null;
				document.documentElement.scrollTop = document.body.scrollTop = Math.ceil(_Tween[opts.mode][opts.effect](t,b,c,d));
				if(t >= d){
					clearInterval(elem.domElemBitTimer);
					//alert("DOM对位停止");
				}
			};
			elem.domElemBitTimer = setInterval(doMove,1);
		},
		getParentNode : function (elem,tagName){ //查找设定父级对象
			if(!elem.parentNode) alert("抱歉！找不到对应的父级对象！");
			return elem.tagName.toLowerCase()==tagName?elem:(this.getParentNode(elem.parentNode,tagName));
		},
		jsonExtend : function(des, src, override){ //合并json  var json = jsonExtend({},[json1,json2],true);
			if(src instanceof Array){
				for(var i = 0, len = src.length; i < len; i++)
					this.jsonExtend(des, src[i], override);
			}
			for(var i in src){
				if(override || !(i in des))
					des[i] = src[i];
			}
			return des;
		},
		/* @ cookie 应用 ------------------------------*/
		setCookie : function(name, value, iDay){
			var oDate=new Date();
			oDate.setDate(oDate.getDate()+iDay);
			document.cookie=name+'='+value+';expires='+oDate;
		},
		getCookie : function(name){
			var arr=document.cookie.split('; ');
			for(var i=0;i<arr.length;i++)
			{
				var arr2=arr[i].split('=');
				if(arr2[0]==name)
				return arr2[1];
			}
			return '';
		},
		removeCookie : function(name){
			this.setCookie(name, '', -1);
		},
		/* @ cookie 应用 end -----------------------*/
		getQueryString : function(name){ //获取链接地址？后边带的参数
			var reg = new RegExp(name + "=([^&]*)");
			var r = window.location.href.match(reg);
			if (r != null)
				return decodeURI(r[1]);
			return null;
		},
		winScaleData : function(){  //@ window scale data
			var D = {},OS = detectOS();
			D.sT = document.documentElement.scrollTop || document.body.scrollTop;
			D.sL = document.documentElement.scrollLeft || document.body.scrollLeft;
			D.sH = document.documentElement.scrollHeight||document.body.scrollHeight;
			D.cH = document.documentElement.clientHeight||document.body.clientHeight;
			D.sW = document.documentElement.scrollWidth||document.body.scrollWidth;
			D.cW = document.documentElement.clientWidth||document.body.clientWidth;
			D.minW = (OS.mobile) ? parseInt(binApp.getStyle(document.body,'minWidth')) : D.cW;
			D.minH = (OS.mobile) ? Math.ceil(D.cH + (-(D.cW-D.minW))/D.cW*D.cH) : D.cH;
			D.scale = D.cW / D.minW;
			return D;
		},
		/*******************************************
		*  @ 弹出窗运动 函数
		*  binApp.window(testObj,{action:"scale",zIndex:88888,fixed:true,maskFlag:true,maskColor:"transparent"},'normal');
		*  opts API
		*  {
		*  action : "top"或"left"或"right"或"bottom"或"right,bottom",
		*  fixed : boolean类型
		*  With : 同步函数
		*  maskFlag : boolean类型
		*  maskColor : 'transparent'
		*  zIndex : '99999'
		*  }
		*  窗口对象.off(); //外部调用（离场函数）
		*  在窗口对象下  任何标签上添加class="binDrag"  即可激活拖拽功能
		********************************************/
		window : function (elem,opts,time,callback){
			binApp.unbind(elem,"mousemove");
			binApp.removeEvent(elem,"mouseout");
			opts = opts || {};
			opts.maskFlag = "maskFlag" in opts ? opts.maskFlag : true;
			elem.style.position = opts.fixed ? "fixed" : "absolute";
			elem.oAddScrollBar = binApp.getByClass(document,"gradient-bg-body","div")[0]; //附加滚动对象
			elem.oClose = binApp.getByClass(elem,"close","a");
			elem.iWinSD = binApp.winScaleData();
			elem.setUp = function(e,j,s){ for(var k in j){ s ? e[s][k] = j[k] : e[k] = j[k]; } };
			elem.getWinSD = function(){
				var D = binApp.winScaleData(),oSE = elem.oAddScrollBar;
				D.cW = D.minW;
				if(oSE){
					D.sT += oSE.scrollTop;
					D.sL += oSE.scrollLeft;
					D.sH = D.sH > oSE.scrollHeight? D.sH : oSE.scrollHeight;
					D.sW = D.sW > oSE.scrollWidth? D.sW : oSE.scrollWidth;
				}
				return D;
			};
			elem.winSD = elem.getWinSD();
			elem.overflowHidden = function(){
				var oHtml = document.getElementsByTagName('html')[0];
				oHtml.style.overflow = "hidden";
				if(elem.iWinSD.sT > 0 || elem.iWinSD.sH > elem.iWinSD.cH){
					oHtml.style.overflowY = "scroll";
				}
			};
			elem.overflowVisible = function(){ document.getElementsByTagName('html')[0].style.overflow = ""; };
			
			elem.overflowHidden();
			elem.setUp(elem,{zIndex:opts.zIndex || "88888",display:"block",opacity:0,filter:"alpha(opacity=0)"}, 'style');
			elem.setUp(elem,{opts : opts || {},iLeft : new Number(),iTop : new Number(),defaultLeft : new Number(),defaultTop : new Number(),setMode : "Back",setEffect : "easeOut",outEffect : "easeIn",callback : callback || false,time:time || 'normal'}, false);
			if(!opts.fixed || isIE6()){
				elem.iTop = (elem.offsetHeight > elem.winSD.cH) ? (elem.winSD.sT+28) : ((elem.winSD.sT + elem.winSD.cH/2) - elem.offsetHeight/2);
			}else {
				elem.iTop = (elem.offsetHeight > elem.winSD.cH) ? 28 : (elem.winSD.cH/2 - elem.offsetHeight/2);
			}
			elem.iLeft = (elem.winSD.sL + elem.winSD.cW/2) - elem.offsetWidth/2;
			
			elem.maskComeIn = function (){
				binApp.winMask(elem,{css : {backgroundColor : (opts.maskColor ? opts.maskColor : "black")},animate:{tween:{mode:'Quint', effect:'easeOut'},css:{opacity:30},speed:'fast'}});
			};
			elem.maskOff = function (){
				binApp.animate(elem.oMask, {mode:"Quart", effect:"easeOut"}, {opacity:0}, elem.time,function (){binApp.removeElement(elem.oMask);});
			};
			elem.comeIn = function(action){
				if(action){
					switch(action){
						case "top":
							elem.setUp(elem,{defaultTop:-(elem.winSD.sT + elem.offsetHeight + 200)}, false);
							elem.setUp(elem,{right:'auto',bottom:'auto',left:elem.iLeft +"px", top:elem.defaultTop+"px"}, 'style');
							break;
						case "bottom":
							elem.setUp(elem,{defaultTop:(elem.winSD.sT + elem.winSD.cH + 200)}, false);
							elem.setUp(elem,{right:'auto',bottom:'auto',left:elem.iLeft +"px", top:elem.defaultTop+"px"}, 'style');
							break;
						case "left":
							elem.setUp(elem,{defaultLeft:-(elem.offsetWidth + 200)}, false);
							elem.setUp(elem,{right:'auto',bottom:'auto',left:elem.defaultLeft +"px", top:elem.iTop+"px"}, 'style');
							break;
						case "right":
							elem.setUp(elem,{defaultLeft:(elem.winSD.sL + elem.winSD.cW + 200)}, false);
							elem.setUp(elem,{right:'auto',bottom:'auto',left:elem.defaultLeft +"px", top:elem.iTop+"px"}, 'style');
							break;
						case "right,bottom":
							elem.setUp(elem,{defaultTop:-(elem.offsetHeight + 200), iLeft:(elem.winSD.cW - elem.offsetWidth), iTop:(elem.winSD.cW - elem.offsetHeight), setMode:"Quart"}, false);
							elem.setUp(elem,{left:"auto", top:"auto", right:0+"px", bottom:elem.defaultTop +"px"}, 'style');
							break;
						default:
							elem.setUp(elem,{time:8, defaultTop:elem.iTop, setMode:"Quart"}, false);
							elem.setUp(elem,{top:elem.iTop+"px", left:elem.iLeft+"px"}, 'style');
							break;
					}
				}else{
					elem.setUp(elem,{defaultTop:elem.iTop, setMode:"Quart"}, false);
					elem.setUp(elem,{top:elem.iTop+"px", left:elem.iLeft+"px"}, 'style');
				}
				var actionJson = (action == "top" || action == "bottom") ? {opacity:100,top:elem.iTop} :
								 (action == "left" || action == "right") ? {opacity:100,left:elem.iLeft} :
								 (action == "right,bottom") ? {opacity:100,bottom:0} : {opacity:100};
				if(action == "scale"){
					elem.setUp(elem,{opacity:1, filter:"alpha(opacity=100)", top:elem.iTop+"px", left:elem.iLeft+"px"}, 'style');
					if(elem.opts.fullScreen){
						elem.setUp(elem,{left:0+"px", top:0+"px"}, 'style');
						document.getElementsByTagName('html')[0].style.overflow = "hidden";
					}
					if(CSS3Check()){
						binApp.addClass(elem,"scaleIn animated");
						css3AnimatedEnd(elem,function (){ binApp.removeClass(elem,"scaleIn animated"); });
					}
					callback && callback.call(elem);
					elem.time = 'normal';
					elem.style.filter = "none";
				}else{
					binApp.animate(elem, {mode:(elem.setMode), effect:(elem.setEffect)}, actionJson, elem.time,function (){
						elem.style.filter = "none";
						elem.overflowVisible();
						callback && callback.call(elem);
					});
				}
				if(opts.maskFlag) elem.maskComeIn();
				binApp.drag(elem);
			};
			elem.off = function (){
				elem.overflowHidden();
				if(opts.action == "scale"){
					if(CSS3Check()){
						binApp.addClass(elem,"scaleOut animated");
						css3AnimatedEnd(elem,function (){ 
							binApp.removeClass(elem,"scaleOut animated");
							elem.style.display = "none";
							elem.overflowVisible();
						});
					}else{
						elem.style.display = "none";
						elem.overflowVisible();
					}
					if(opts.maskFlag) elem.maskOff();
					return;
				}
				var actionJson = (opts.action == "top" || opts.action == "bottom") ? {opacity:0,top:elem.defaultTop} :
								 (opts.action == "left" || opts.action == "right") ? {opacity:0,left:elem.defaultLeft} :
								 (opts.action == "right,bottom") ? {opacity:0,bottom:elem.defaultTop} : {opacity:0};
				binApp.animate(elem, {mode:elem.setMode, effect: elem.outEffect}, actionJson, elem.time,function (){
					elem.style.display = "none";
					elem.overflowVisible();
				});
				if(opts.maskFlag) elem.maskOff();
			};
			elem.comeIn((opts.action || false));
			binApp.each(elem.oClose,function (){ binApp.addEvent(this,"click", elem.off); });
			if(opts.With){opts.With.call(elem);}
		},
		confirm : function (str,opts,callback){ //opts{confirmHdStr:'温馨提示',action:("top" || "middle" || "static" || "scale"), maskColor:"transparent"}
			opts = opts ? opts : {};
			opts.confirmFlag = true;
			this.alert(str,opts,callback);
		},
		alert : function(str,opts,callback){ //opts{action:("top" || "middle" || "static", maskColor:"white")}
			binApp.tips.guid++;
			binApp.tips.$events[binApp.tips.guid] = {};
			binApp.tips.$events[binApp.tips.guid]["str"] = str;
			binApp.tips.$events[binApp.tips.guid]["opts"] = opts;
			binApp.tips.$events[binApp.tips.guid]["callback"] = callback;
			binApp.tips.handler(binApp.tips.guid,callback);
		},
		tips : win.binAppLoadFlag ? binApp.tips : {
			$events : {},  //用来创建唯一堆栈
			guid : 0,  //用来创建唯一的ID的计数器
			passFlag : true,
			handler : function(guid,callback){
				binApp.tips.forEvent(binApp.tips.$events[guid].str, binApp.tips.$events[guid].opts, function (){
					delete binApp.tips.$events[guid];
					binApp.tips.passFlag = true;
					if((guid+1) in binApp.tips.$events) binApp.tips.handler((guid+1),binApp.tips.$events[(guid+1)].callback);
				},function (){
					//document.title = guid;
					//console.log(guid, binApp.tips.$events);
				},callback);
			},
			handler : function(guid,callback){
				binApp.tips.forEvent(binApp.tips.$events[guid].str, binApp.tips.$events[guid].opts, function (){
					delete binApp.tips.$events[guid];
					binApp.tips.passFlag = true;
					if((guid+1) in binApp.tips.$events) binApp.tips.handler((guid+1),binApp.tips.$events[(guid+1)].callback);
				},function (){
					//document.title = guid;
					//console.log(guid, binApp.tips.$events);
				},callback);
			},
			forEvent : function (str,opts,callback,callwith,confirmCallback){
				if(!binApp.tips.passFlag) return;
				binApp.tips.passFlag = false;
				if(callwith) callwith();
				clearTimeout(binApp.tips.offTimer);
				clearTimeout(binApp.tips.comeInTimer);
				if(binApp.tips.oMask) clearTimeout(binApp.tips.oMask.timer);
				if(binApp.tips.oInfo) clearTimeout(binApp.tips.oInfo.timer);
				if(binApp.tips.oMask) binApp.removeElement(binApp.tips.oMask);
				if(binApp.tips.oInfo) binApp.removeElement(binApp.tips.oInfo);
				var oP = document.createElement('div');
				opts = opts || {};
				opts.confirmHdStr = ('confirmHdStr' in opts) ? opts.confirmHdStr : '操作确认';
				oP.callback = callback || false;
				oP.iMS = binApp.winScaleData();
				oP.init = function(){
					binApp.tips.oInfo = oP;
					document.body.appendChild(oP);
					oP.innerHTML = "<div class='binTips_mBg'></div><div class='binTips_info'>"+str+"</div>";
					if(opts.confirmFlag){
						oP.innerHTML = "<div class='binTips_mBg"+ (opts.action !== "top" ? " binDrag" : "") +"' style='cursor: default;'></div>"+
									   "<div class='"+ (opts.action !== "top" ? "binDrag" : "") +"' style='cursor: default;'>"+
									   	   "<div class='binTips_info'>"+str+"</div>"+
								       	   "<div class='binTips_ft_bar'><a href='javascript:;' class='define'>确定</a><a href='javascript:;' class='close'>取消</a></div>"+
										   "<div class='binTips_hd_bar'><b>"+opts.confirmHdStr+"</b><a href='javascript:;' class='close close-btn'>X</a></div>"+
									   "</div>";
						if(opts.action !== "top") oP.style.paddingTop = 30+"px";
					}
					oP.effect = {};
					oP.effect["static"] = opts.action == "static" || opts.action == "" || opts.action == undefined ? true : false;
					oP.effect["top"] = opts.action == "top" ? true : false;
					oP.effect["middle"] = opts.action == "middle" ? true : false;
					oP.effect["scale"] = opts.action == "scale" ? true : false;
					oP.maskFlag = "maskFlag" in opts ? opts.maskFlag : !oP.effect["top"] ? true : false;
					oP.className = oP.effect["top"] ? "binTips_top" : "binTips_middle";
					oP.thisH = oP.offsetHeight;
					oP.thisW = oP.offsetWidth;
					oP.wClientH = oP.iMS.cH;
					oP.wClientW = oP.iMS.minW;
					oP.startT = -oP.thisH*1.6;
					oP.targetL = oP.wClientW/2-oP.thisW/2;
					if(oP.effect["top"]){
						oP.targetT = -100;
						oP.offT = oP.startT;
					}else{
						oP.targetT = oP.wClientH/2-oP.thisH/2;
						oP.offT = oP.wClientH+Math.abs(oP.startT);
					}
					if(isIE6()){
						oP.targetL+=document.documentElement.scrollLeft;
						oP.targetT+=document.documentElement.scrollTop;
						oP.startT=document.documentElement.scrollTop-Math.abs(oP.startT);
						oP.offT+=document.documentElement.scrollTop;
					}
					oP.style.width = oP.thisW+"px";
					oP.style.left = oP.targetL+"px";
					oP.style.top = oP.startT+"px";
					oP.children[0].style.height = oP.thisH+"px";
					binApp.drag(oP);
					//binApp.drag(oP,{range:true,minX:5,maxX:(document.documentElement.clientWidth-oP.offsetWidth-5),minY:5,maxY:(document.documentElement.clientHeight-oP.offsetHeight-5)});
				};
				oP.comeIn = function(){
					oP.init();
					if(oP.effect["static"] || oP.effect["scale"]){
						if(oP.effect["scale"] && CSS3Check()){ binApp.scaleIn(oP); }
						if(oP.maskFlag)
						binApp.winMask(oP,{css:{backgroundColor: (opts.maskColor ? opts.maskColor : "black"),opacity:.3,filter:"alpha(opacity=30)"},animate:false});
						oP.style.top = oP.targetT+"px";
					}else{
						if(oP.maskFlag)
						binApp.winMask(oP,{css : {backgroundColor : (opts.maskColor ? opts.maskColor : "black")},animate:{tween:{mode:'Quint', effect:'easeOut'},css:{opacity:30},speed:'fast'}});
						binApp.animate(oP, {mode:'Back', effect:'easeOut'}, {top:oP.targetT},'normal');
					}
					if(opts.confirmFlag){ oP.forBtnFN(); return; }
					binApp.tips.offTimer = setTimeout(oP.off,1500);
				};
				oP.off = function(){
					binApp.removeEvent(document,'keydown',oP.keydown);
					if(oP.effect["static"] || oP.effect["scale"]){
						if(oP.effect["scale"]){
							binApp.scaleOut(oP,function (){
								oP.forOffAfter();
							});
						}else{oP.forOffAfter();}
						return;
					}
					if(oP.maskFlag) binApp.animate(oP.oMask, {mode:'Quint', effect:'easeIn'}, {opacity:0},'normal');
					binApp.animate(oP, {mode:'Back', effect:'easeIn'}, {top:oP.offT},'normal',oP.forOffAfter);
				};
				oP.forOffAfter = function (){
					binApp.removeElement(oP);
					if(oP.maskFlag) binApp.removeElement(oP.oMask);
					if(oP.confirmCallback) oP.confirmCallback();
					if(oP.callback) oP.callback();
				};
				oP.keydown = function (event){ ((event || window.event).keyCode == 13) ? oP.forDefineFN() : null; };
				oP.forDefineFN = function (){oP.confirmCallback = confirmCallback;oP.off();};
				oP.forCloseFN = function (){oP.confirmCallback = false;oP.off();};
				oP.forBtnFN = function (){
					oP.oClose = binApp.getByClass(oP,"close","a");
					binApp.each(oP.oClose,function (){binApp.addEvent(this,"click", oP.forCloseFN);});
					oP.oDefine = binApp.getByClass(oP,"define","a");
					binApp.each(oP.oDefine,function (){binApp.addEvent(this,"click", oP.forDefineFN);});
					binApp.addEvent(document,'keydown',oP.keydown);
				};
				binApp.tips.comeInTimer = setTimeout(oP.comeIn,168);
			}
		},		
		scaleIn : function (e,css3callback){
			if(CSS3Check()){
				binApp.addClass(e,"scaleIn animated");
				css3AnimatedEnd(e,function (){
					binApp.removeClass(e,"scaleIn animated");
					css3callback && css3callback.call(e);
				});
			}else{
				css3callback && css3callback.call(e);
			}
		},
		scaleOut : function (e,css3callback){
			function remove(){
				css3callback && css3callback.call(e);
				binApp.removeElement(e); 
			};
			if(CSS3Check()){
				binApp.addClass(e,"scaleOut animated");
				css3AnimatedEnd(e,function (){
					binApp.removeClass(e,"scaleOut animated");
					remove();
				});
			}else{
				remove();
			}
		},
		/* @ bingoo 拖拽 --------------------------*/
		drag : function (e,opts){
			e.isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
			e.hasTouch = 'ontouchstart' in window && !e.isTouchPad;
			e.touchDown = e.hasTouch ? 'touchstart' : 'mousedown';
			e.touchMove = e.hasTouch ? 'touchmove' : 'mousemove';
			e.touchUp = e.hasTouch ? 'touchend' : 'mouseup';
			e.oDrags = this.getByClass(e,"binDrag","*");
			e.dDb = {};
			opts = opts ? opts : {};
			e.dDb.mDown = function (event){
				event = event || window.event;
				e.event = e.hasTouch ? event.touches[0] : event;
				e.dDb.sX = e.event.clientX - parseInt(binApp.getStyle(e,"left"));
				e.dDb.sY = e.event.clientY - parseInt(binApp.getStyle(e,"top"));
				binApp.addEvent(document,e.touchMove,e.dDb.mMove);
				binApp.addEvent(document,e.touchUp,e.dDb.mUp);
				document.body.onselectstart = function (){return false};
				e.style.MozUserSelect = 'none';
				//return false;
			};
			e.dDb.mMove = function (event){
				event = event || window.event;
				e.event = e.hasTouch ? event.touches[0] : event;
				e.dDb.nX = e.event.clientX - e.dDb.sX;
				e.dDb.nY = e.event.clientY - e.dDb.sY;
				e.iMS = binApp.winScaleData();
				if(opts.range){
					e.dDb.minX = "minX" in opts ? opts.minX : 0;
					e.dDb.maxX = "maxX" in opts ? opts.maxX : e.iMS.minW - e.offsetWidth;
					e.dDb.minY = "minY" in opts ? opts.minY : 0;
					e.dDb.maxY = "maxY" in opts ? opts.maxY : e.iMS.cH - e.offsetHeight;
					e.dDb.nX = new Number(e.dDb.nX)._range(e.dDb.minX,e.dDb.maxX);
					e.dDb.nY = new Number(e.dDb.nY)._range(e.dDb.minY,e.dDb.maxY);
				}
				e.style.left = e.dDb.nX+"px";
				e.style.top = e.dDb.nY+"px";
				return false;
			};
			e.dDb.mUp = function (){
				binApp.removeEvent(document,e.touchMove,e.dDb.mMove);
				binApp.removeEvent(document,e.touchUp,e.dDb.mUp);
				document.body.onselectstart = function (){return true};
				e.style.MozUserSelect = '';
			};
			function cancelBubble(obj){
				for(var i=0;i<obj.length;i++){
					binApp.bind(obj[i],e.touchDown,function (event){
						if(this.tagName == 'img')
						(event && event.preventDefault) ? event.preventDefault() : window.event.returnValue = false; 
						else
						(event && event.stopPropagation) ? event.stopPropagation() : window.event.cancelBubble = true;
					});
				}
			}
			for(var i=0;i<e.oDrags.length;i++){
				binApp.addEvent(e.oDrags[i],e.touchDown,e.dDb.mDown);
				cancelBubble(e.oDrags[i].getElementsByTagName('textarea'));
				cancelBubble(e.oDrags[i].getElementsByTagName('select'));
				cancelBubble(e.oDrags[i].getElementsByTagName('button'));
				cancelBubble(e.oDrags[i].getElementsByTagName('input'));
				cancelBubble(e.oDrags[i].getElementsByTagName('a'));
				cancelBubble(e.oDrags[i].getElementsByTagName('img'));
				cancelBubble(binApp.getByClass(e.oDrags[i],'cancelBubble'));
			}
		},
		/* @ bingoo 拖拽 end --------------------------*/
		insertCssRule : function (myCss){ //css insertCssRule
			var obj = document.createElement('style');
			obj.type="text/css";
			document.getElementsByTagName('head')[0].appendChild(obj);
			obj.oCss = document.styleSheets[(document.styleSheets.length-1)];
			if(obj.oCss.cssRules){
				for(var i=0;i<myCss.length;i++){
					obj.oCss.insertRule(myCss[i].name+"{"+myCss[i].cssText+"}", obj.oCss.cssRules.length); //FF
				}
			}else{
				for(var i=0;i<myCss.length;i++){
					obj.oCss.addRule(myCss[i].name, myCss[i].cssText); //IE
				}
			}
		},
		winMask : function (obj,opts){
			obj.oMask = doc.createElement('div');
			//doc.body.appendChild(obj.oMask);
			obj.parentNode.insertBefore(obj.oMask,obj);
			obj.oMask.className = "binWinMask";
			opts = opts || {};
			opts.animate = opts.animate || {};
			if(opts.css){
				for(var key in opts.css){
					obj.oMask.style[key] = opts.css[key];
				}
			}
			if(opts.animate) {
				binApp.animate(
					obj.oMask,
					(opts.animate.tween || {mode:'Quint', effect:'easeOut'}),
					(opts.animate.css || {opacity:30}),
					(opts.animate.speed || 'fast')
				);
			}
		},
		/* @ loading --------------------------*/
		loadingIn : function (opts,callback){ //opts = {innerHTML:'',css:'',maskCss:''}
			binApp.OLD = binApp.OLD || {};
			var o = binApp.OLD;
			if(o.o) return;
			o.o = doc.createElement('div');
			o.o.className = 'oFullScreenLoading';
			doc.body.appendChild(o.o);
			opts = opts || {};
			binApp.winMask(o.o,(opts.maskCss || {}));
			if(opts.css){
				for(var key in opts.css){
					o.o.style[key] = opts.css[key];
				}
			}
			if(opts.innerHTML){ o.o.innerHTML = opts.innerHTML; }
			binApp.scaleIn(o.o,function (){
				callback && callback();
			});
		},
		loadingOut : function (callback){
			binApp.OLD = binApp.OLD || {};
			var o = binApp.OLD;
			if(!o.o) return;
			binApp.scaleOut(o.o);
			binApp.animate(o.o.oMask, {mode:'Quint', effect:'easeIn'}, {opacity:0},300,function (){
				binApp.removeElement(o.o.oMask);
				delete o.o;
				callback && callback();
			});
		}
		/* @ loading end --------------------------*/
	};
	
	!this.binAppLoadFlag ? binApp.insertCssRule(binApp.myStyle) : this.binAppLoadFlag = true;
})(window,document);

//为防止以前写的js用了保留老版本
function getElementsByClassName(idWrap, clsName, tagName){
	var elements = [], children  = idWrap.getElementsByTagName(tagName);
	for (var i = 0; i < children .length; i++) {
		if(children[i].className.match(new RegExp('(\\s|^)' + (clsName.replace(/(^\s*)|(\s*$)/g, "")) + '(\\s|$)'),"g")) elements.push(children[i]);
	}
	return elements;
};
//为防止以前写的js用了保留老版本
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
};
//IE9-
function isIE(){
	var navAgent=window.navigator.userAgent.toLowerCase(), flag;
	if(navAgent.indexOf("msie") != -1){
		var IE=navAgent.match(/msie\s([0-9])/);
		flag = (IE[1] > 5 && IE[1] < 9) ? IE[1] : false;
	};
	return flag;
};
function isIE6(){
	return (isIE() == 6) ? true : false;
};
//浏览器区分
function browseCheck(){
    var oBrowse = {}, Sys = {}, ua = navigator.userAgent.toLowerCase(), s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	for(var k in Sys){
		oBrowse['edition'] = k+':'+Sys[k];
		oBrowse['name'] = k;
	}
    return oBrowse;
};
//检测操作系统 var OS = detectOS();binApp.confirm('PC端：'+ OS.pc + '<br>Mobile端：'+ OS.mobile + "<br>您的操作系统是：" + OS.name);
function detectOS() {
	var D = {};
	D.ua = navigator.userAgent;
	D.uaTLC = D.ua.toLowerCase();
	D.platform = navigator.platform;
	D.isLinux = (String(D.platform).indexOf("Linux") > -1);
	D.isWin = D.platform === ("Win32" || "Windows");
	D.isMac = D.platform === ("Mac68K" || "MacPPC" || "Macintosh" || "MacIntel");
	D.isUnix = (D.platform === "X11") && !D.isWin && !D.isMac;
	D.isSymbian = D.platform === ('SymbianOS');
	D.bIsCE = D.uaTLC.match(/windows ce/i);
	D.bIsWM = D.uaTLC.match(/windows mobile/i);
	D.bIsAndroid = D.uaTLC.match(/android/i);
	D.bIsIpad = D.uaTLC.match(/ipad/i);
	D.bIsIphoneOs = D.uaTLC.match(/iphone os/i);
	D.bIsMidp = D.uaTLC.match(/midp/i);  
	D.bIsUc7 = D.uaTLC.match(/rv:1.2.3.4/i);  
	D.bIsUc = D.uaTLC.match(/ucweb/i);
	D.mobile = (D.bIsIpad || D.bIsIphoneOs || D.bIsMidp || D.bIsUc7 || D.bIsUc || D.bIsAndroid || D.bIsCE || D.bIsWM || D.isSymbian) ? true : false;
	D.pc = D.mobile ? false : true;
	D.name = (D.bIsIpad) ? "iPad" : (D.bIsIphoneOs) ? "iPhone" : (D.bIsMidp) ? "midp" : (D.bIsUc7) ? "Uc7" : (D.bIsUc) ? "Ucweb" : (D.isMac) ? "Mac" : (D.isLinux) ? ((D.bIsAndroid) ? "Android" : "Linux") : (D.isSymbian) ? "SymbianOS" : (D.bIsCE || D.bIsWM) ? "wm" : 'other';
	if (D.isWin) {
		D.isWin2K = D.ua.indexOf("Windows NT 5.0") > -1 || D.ua.indexOf("Windows 2000") > -1;
		D.isWinXP = D.ua.indexOf("Windows NT 5.1") > -1 || D.ua.indexOf("Windows XP") > -1;
		D.isWin2003 = D.ua.indexOf("Windows NT 5.2") > -1 || D.ua.indexOf("Windows 2003") > -1;
		D.isWinVista = D.ua.indexOf("Windows NT 6.0") > -1 || D.ua.indexOf("Windows Vista") > -1;
		D.isWin7 = D.ua.indexOf("Windows NT 6.1") > -1 || D.ua.indexOf("Windows 7") > -1;
		D.isWin8 = D.ua.indexOf("Windows NT 6.2") > -1 || D.ua.indexOf("Windows 8") > -1;
		D.name = (D.isWin2K) ? "Win2000" : (D.isWinXP) ? "WinXP" : (D.isWin2003) ? "Win2003" : (D.isWinVista) ? "WinVista" : (D.isWin7) ? "Win7" : (D.isWin8) ? "Win8" : 'other';
	}
	return D;
};
//检测支持 CSS3
function CSS3Check() {  
    var div = document.createElement("div"),  
    vendors = new String("webkitAnimation mozAnimation oAnimation msAnimation animation").split(" ");
    for(var i=0;i<vendors.length;i++){if(vendors[i] in div.style){return true;break;}}
    return false;
};
//css3 动画结束时事件
function css3AnimatedEnd(e,callback){
	var type = ['webkitAnimationEnd','mozAnimationEnd','MSAnimationEnd','oanimationend','animationend'];
	function handler(){
		callback();
		for(var j=0;j<type.length;j++){
			e.removeEventListener(type[j] , handler, false);
		}
	};
	for(var i=0;i<type.length;i++){
		e.addEventListener(type[i], handler, false);
	}
};
//阻止多次触发mouseover和mouseout事件
function fixedMouse(e,target){ //var oEvent = ev || window.event; if(fixedMouse(oEvent,this)){ 执行语句 }
	var related,
	type=e.type.toLowerCase();//这里获取事件名字 
	if(type=='mouseover'){
		related=e.relatedTarget||e.fromElement
	}else if(type='mouseout'){
		related=e.relatedTarget||e.toElement
	}else return true;
	return related && related.prefix!='xul' && !contains(target,related) && related!==target;
};
function contains(p,c){ //检测包含
	return p.contains ?
	p != c && p.contains(c) :
	!!(p.compareDocumentPosition(c) & 16);
};
//阻止浏览器的默认行为
function stopDefault(e) {
	(e && e.preventDefault) ? e.preventDefault() : window.event.returnValue = false; 
	return false; 
};
//停止事件冒泡
function stopBubble(e) { 
	(e && e.stopPropagation) ? e.stopPropagation() : window.event.cancelBubble = true; 
	return false; 
};

/****************************************
 @ 系统中JS的扩展函数
*****************************************/

// 清除两边的空格
String.prototype._trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
// 合并多个空白为一个空白
String.prototype._resetBlank = function(){
    var regEx = /\s+/g;
    return this.replace(regEx, ' ');
};
// 保留数字
String.prototype._getNum = function(){
    var regEx = /[^\d]/g;
    return this.replace(regEx, '');
};
// 保留中文
String.prototype._getCN = function(){
    var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
    return this.replace(regEx, '');
};
// String转化为Number
String.prototype._toInt = function(){
    return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
};
// 得到字节长度
String.prototype._getLen = function(){
    var regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;
    if (regEx.test(this)) {
        return this.length * 2;
    } else {
        var oMatches = this.match(/[\x00-\xff]/g);
        var oLength = this.length * 2 - oMatches.length;
        return oLength;
    }
};
// 限定字节长度
String.prototype._limitLen = function(len,suffix){
	if(this._getLen() < len) return this.toString();
	var string = "", lenControl = 0, regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;
	for(var i=0;i<this.length;i++){
		regEx.test(this.charAt(i)) ? lenControl += 2 : lenControl +=1;
		string+=this.charAt(i);
		if(lenControl >= len) break;
	}
	return (string+(suffix?suffix:"...")).toString();
};
// 获取文件全名
String.prototype._getFileName = function(){
    var regEx = /^.*\/([^\/\?]*).*$/;
    return this.replace(regEx, '$1');
};
// 获取文件扩展名
String.prototype._getExtensionName = function(){
    var regEx = /^.*\/[^\/]*(\.[^\.\?]*).*$/;
    return this.replace(regEx, '$1');
};
// 字符串全局替换
String.prototype._replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};
//格式化字符串
String.Format = function(){
    if (arguments.length == 0)
    return '';
    if (arguments.length == 1) 
    return arguments[0];
    var reg = /{(\d+)?}/g;
    var args = arguments;
    var result = arguments[0].replace(reg, function($0, $1) {
        return args[parseInt($1) + 1];
    });
    return result;
};
//限制最小值&&最大值
Number.prototype._range = function(iMin,iMax){
	if(parseFloat(this)>iMax){return iMax;}
	else if(parseFloat(this)<iMin){return iMin;}
	else{return parseFloat(this);}
};
// 数字补零
Number.prototype._lenWithZero = function(oCount) {
    var strText = this.toString();
    while (strText.length < oCount) {
        strText = '0' + strText;
    }
    return strText;
};
// Unicode还原
Number.prototype._chrW = function(){
    return String.fromCharCode(this);
};
// 数字数组由小到大排序
Array.prototype._minToMax = function(){
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] < this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};
// 数字数组由大到小排序
Array.prototype._maxToMin = function(){
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] > this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};
// 获得数字数组中最大项
Array.prototype._getMax = function(){
    var oValue;
	for (var i=0;i<this.length;i++){
		oValue = (i<1) ? this[i] : this[i] > oValue ? this[i] : oValue;
	}
	return oValue;
};
// 获得数字数组中最小项
Array.prototype._getMin = function(){
    var oValue;
	for (var i=0;i<this.length;i++){
		oValue = (i<1) ? this[i] : this[i] < oValue ? this[i] : oValue;
	}
	return oValue;
};
// 获得数组中,值的索引
Array.prototype._indexOf = function(val){
	var index;
	for (var i=0;i<this.length;i++){
		if(val == this[i])
		index = i;
	}
	return index;
};
// 获取当前时间的中文形式
Date.prototype._getCNDate = function(){
    var oDateText = '';
    oDateText += this.getFullYear()._lenWithZero(4) + new Number(24180)._chrW();
    oDateText += this.getMonth()._lenWithZero(2) + new Number(26376)._chrW();
    oDateText += this.getDate()._lenWithZero(2) + new Number(26085)._chrW();
    oDateText += this.getHours()._lenWithZero(2) + new Number(26102)._chrW();
    oDateText += this.getMinutes()._lenWithZero(2) + new Number(20998)._chrW();
    oDateText += this.getSeconds()._lenWithZero(2) + new Number(31186)._chrW();
    oDateText += new Number(32)._chrW() + new Number(32)._chrW() + new Number(26143)._chrW() + new Number(26399)._chrW() + new String('26085199682010819977222352011620845').substr(this.getDay() * 5, 5)._toInt()._chrW();
    return oDateText;
};
//扩展Date格式化 new Date().format("yyyy-MM-dd hh:mm:ss:S q");
Date.prototype._format = function(format) {
    var o = {
		"M+" : this.getMonth() + 1, //月
		"d+" : this.getDate(), //日
		"h+" : this.getHours(), //小时
		"m+" : this.getMinutes(), //分
		"s+" : this.getSeconds(), //秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季
		"S" : this.getMilliseconds() //毫秒
	};

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
Date.prototype._diff = function(interval, objDate) {
    //若参数不足或 objDate 不是日期类型則回传 undefined
    if (arguments.length < 2 || objDate.constructor != Date) { return undefined; }
    switch (interval) {
        //计算秒差                                                        
        case 's': return parseInt((objDate - this) / 1000);
            //计算分差
        case 'n': return parseInt((objDate - this) / 60000);
            //计算時差
        case 'h': return parseInt((objDate - this) / 3600000);
            //计算日差
        case 'd': return parseInt((objDate - this) / 86400000);
            //计算周差
        case 'w': return parseInt((objDate - this) / (86400000 * 7));
            //计算月差
        case 'm': return (objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
            //计算年差
        case 'y': return objDate.getFullYear() - this.getFullYear();
            //输入有误
        default: return undefined;
    }
};
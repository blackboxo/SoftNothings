
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/me/me","pages/add/add"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#b7282e","borderStyle":"black","backgroundColor":"#ffffff","position":"bottom","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/index/index","iconPath":"static/index.png","selectedIconPath":"static/index_cur.png","text":"Soft"},{"pagePath":"pages/add/add","iconPath":"static/add.png","selectedIconPath":"static/add_cur.png","text":"Add"},{"pagePath":"pages/me/me","iconPath":"static/me.png","selectedIconPath":"static/me_cur.png","text":"Me"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Soft Nothings","compilerVersion":"2.5.11","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"Soft Nothings"}},{"path":"/pages/me/me","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"My Softs"}},{"path":"/pages/add/add","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"New Soft"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});

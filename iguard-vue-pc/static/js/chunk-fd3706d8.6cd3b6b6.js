(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fd3706d8","chunk-1d49f90a"],{2017:function(t,e,n){"use strict";var o=n("b12d"),s=n.n(o);s.a},"7f65":function(t,e,n){"use strict";var o=n("f75a"),s=n.n(o);s.a},9067:function(t,e,n){},"9ed6":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-container",style:t.bgImg},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,autocomplete:"on","label-position":"left"}},[n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[t._v("物业管控平台")])]),t._v(" "),n("el-form-item",{attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"user"}})],1),t._v(" "),n("el-input",{ref:"username",attrs:{placeholder:"用户名",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),t._v(" "),n("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),t._v(" "),n("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"密码",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:[function(e){return t.checkCapslock(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}]},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),t._v(" "),n("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1)],1),t._v(" "),n("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登录")]),t._v(" "),n("div",{staticStyle:{position:"relative"}},[n("div",{staticClass:"tips"})])],1),t._v(" "),n("el-dialog",{attrs:{title:"Or connect with",visible:t.showDialog},on:{"update:visible":function(e){t.showDialog=e}}},[t._v("\n    Can not be simulated on local, so please combine you own business simulation! ! !\n    "),n("br"),t._v(" "),n("br"),t._v(" "),n("br"),t._v(" "),n("social-sign")],1)],1)},s=[],i=(n("ac6a"),n("456d"),n("61f7")),a=n("c62e"),r={name:"Login",components:{SocialSign:a["default"]},data:function(){var t=function(t,e,n){Object(i["e"])(e)?n():n(new Error("请输入正确的用户名"))},e=function(t,e,n){e.length<6?n(new Error("密码不能少于6位")):n()};return{loginForm:{username:"admin",password:"123456"},loginRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:e}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{},bgImg:{backgroundImage:"url("+n("a21b")+")",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}},watch:{$route:{handler:function(t){var e=t.query;e&&(this.redirect=e.redirect,this.otherQuery=this.getOtherQuery(e))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{checkCapslock:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.shiftKey,n=t.key;n&&1===n.length&&(this.capsTooltip=!!(e&&n>="a"&&n<="z"||!e&&n>="A"&&n<="Z")),"CapsLock"===n&&!0===this.capsTooltip&&(this.capsTooltip=!1)},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;console.log("我点击登陆1"),t.loading=!0,t.$store.dispatch("user/login",t.loginForm).then((function(){console.log("我点击登陆2"),t.$router.push({path:t.redirect||"/",query:t.otherQuery}),t.loading=!1})).catch((function(){console.log("我点击登陆但是失败"),t.loading=!1}))}))},getOtherQuery:function(t){return Object.keys(t).reduce((function(e,n){return"redirect"!==n&&(e[n]=t[n]),e}),{})}}},c=r,l=(n("2017"),n("7f65"),n("2877")),u=Object(l["a"])(c,o,s,!1,null,"7846be1c",null);e["default"]=u.exports},a21b:function(t,e,n){t.exports=n.p+"static/img/bk.51a4b746.jpg"},b12d:function(t,e,n){},c62e:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"social-signup-container"},[n("div",{staticClass:"sign-btn",on:{click:function(e){return t.wechatHandleClick("wechat")}}},[n("span",{staticClass:"wx-svg-container"},[n("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),t._v("\n    WeChat\n  ")]),t._v(" "),n("div",{staticClass:"sign-btn",on:{click:function(e){return t.tencentHandleClick("tencent")}}},[n("span",{staticClass:"qq-svg-container"},[n("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),t._v("\n    QQ\n  ")])])},s=[],i={name:"SocialSignin",methods:{wechatHandleClick:function(t){alert("ok")},tencentHandleClick:function(t){alert("ok")}}},a=i,r=(n("d9fb"),n("2877")),c=Object(r["a"])(a,o,s,!1,null,"7309fbbb",null);e["default"]=c.exports},d9fb:function(t,e,n){"use strict";var o=n("9067"),s=n.n(o);s.a},f75a:function(t,e,n){}}]);
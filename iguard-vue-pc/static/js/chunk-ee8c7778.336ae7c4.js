(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ee8c7778"],{"06cd":function(e,t,o){"use strict";var r=o("bc3a"),n=o.n(r),a=o("5c96"),s=o("4360"),i=o("5f87"),l=n.a.create({baseURL:"http://47.100.240.228:8950",timeout:3e7,responseType:"json"});l.interceptors.request.use((function(e){return s["a"].getters.token&&(e.headers["LinkAdmin-Token"]=Object(i["a"])()),e}),(function(e){return console.log(e),Promise.reject(e)})),l.interceptors.response.use((function(e){var t=e.data;return 2e4!==t.code?(Object(a["Message"])({message:t.msg||"Error",type:"error",duration:3e3}),50001===t.code&&a["MessageBox"].confirm("你已经退出系统了, 你可以取消停留在这一页, 或者再次登录","提示",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then((function(){s["a"].dispatch("user/resetToken").then((function(){location.reload()}))})),Promise.reject(new Error(t.msg||"Error"))):t}),(function(e){return console.log("err"+e),Object(a["Message"])({message:e.message,type:"error",duration:3e3}),Promise.reject(e)})),t["a"]=l},"09f4":function(e,t,o){"use strict";o.d(t,"a",(function(){return s})),Math.easeInOutQuad=function(e,t,o,r){return e/=r/2,e<1?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function n(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function a(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,o){var s=a(),i=e-s,l=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=l;var a=Math.easeInOutQuad(u,s,i,t);n(a),u<t?r(e):o&&"function"===typeof o&&o()};c()}},"800a":function(e,t,o){"use strict";var r=o("a578"),n=o.n(r);n.a},a578:function(e,t,o){},eb48:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("el-row",{attrs:{gutter:24}},[o("el-col",{attrs:{span:3}},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("新增")])],1)],1),e._v(" "),o("el-divider"),e._v(" "),o("dir",[o("el-row",[o("el-col",{attrs:{span:24}},[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,height:"600",border:""}},[o("el-table-column",{attrs:{width:"50",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",[e._v(e._s(t.$index+e.listQuery.page*e.listQuery.pageSize+1))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"groupName",label:"组名称"}}),e._v(" "),o("el-table-column",{attrs:{prop:"type",label:"组类型"}}),e._v(" "),o("el-table-column",{attrs:{prop:"groupManageName",label:"组长"}}),e._v(" "),o("el-table-column",{attrs:{prop:"groupWorkerName",label:"组员"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return e.remove(t.row.id)}}},[e._v("删除")]),e._v(" "),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return e.edit(t)}}},[e._v("编辑")])]}}])})],1),e._v(" "),o("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}})],1)],1)],1),e._v(" "),o("div",[o("el-dialog",{attrs:{title:"新增",visible:e.dialogVisible,width:"35%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[o("el-form",{attrs:{"label-width":"80px",model:e.form}},[o("el-form-item",{attrs:{label:"组名称"}},[o("el-input",{attrs:{type:"text",placeholder:"不超过六个字",maxlength:"6"},model:{value:e.form.groupName,callback:function(t){e.$set(e.form,"groupName",t)},expression:"form.groupName"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"组长"}},[o("el-select",{attrs:{placeholder:"请选择组长",filterable:""},on:{change:e.zuZhang},model:{value:e.form.gl,callback:function(t){e.$set(e.form,"gl",t)},expression:"form.gl"}},e._l(e.form.options1,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"组员"}},[o("el-select",{attrs:{placeholder:"请选择组员",filterable:"",multiple:""},on:{change:e.zuYuan},model:{value:e.form.crew,callback:function(t){e.$set(e.form,"crew",t)},expression:"form.crew"}},e._l(e.form.options2,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.handleClose}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.xinZ}},[e._v("确 定")])],1)],1)],1),e._v(" "),o("div",[o("el-dialog",{attrs:{title:"编辑",visible:e.dialogVisible1,width:"35%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible1=t}}},[o("el-form",{attrs:{"label-width":"80px",model:e.form1}},[o("el-form-item",{attrs:{label:"组名称"}},[o("el-input",{attrs:{type:"text",placeholder:"不超过六个字",maxlength:"6"},model:{value:e.form1.groupName,callback:function(t){e.$set(e.form1,"groupName",t)},expression:"form1.groupName"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"组长"}},[o("el-select",{attrs:{placeholder:"请选择组长",filterable:""},on:{change:e.zuZhang1},model:{value:e.form1.gl,callback:function(t){e.$set(e.form1,"gl",t)},expression:"form1.gl"}},e._l(e.form1.options1,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"组员"}},[o("el-select",{attrs:{placeholder:"请选择组员",filterable:"",multiple:""},on:{change:e.zuYuan1},model:{value:e.form1.crew,callback:function(t){e.$set(e.form1,"crew",t)},expression:"form1.crew"}},e._l(e.form1.options2,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.handleClose}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("确 定")])],1)],1)],1)],1)},n=[],a=(o("28a5"),o("ac6a"),o("96cf"),o("3b8d")),s=o("333d"),i=o("06cd");o("b775"),o("7605");function l(e){return Object(i["a"])({url:"/rest/patrolCheckGroup/getPatrolCheckGroupByParam",method:"post",data:e})}function u(e){return Object(i["a"])({url:"/rest/patrolCheckGroup/getGroupManage",method:"get",params:{companyId:e}})}function c(e){return Object(i["a"])({url:"/rest/patrolCheckGroup/getGroupWorkers",method:"get",params:{companyId:e}})}function p(e){return Object(i["a"])({url:"/rest/patrolCheckGroup/add",method:"post",data:e})}function m(e){return Object(i["a"])({url:"/rest/patrolCheckGroup/editPatrolCheckGroup",method:"post",data:e})}function g(e){return Object(i["a"])({url:"/rest/patrolCheckGroup/removePatrolCheckGroup",method:"get",params:{id:e}})}var f={components:{Pagination:s["a"]},data:function(){return{loading:!1,dialogVisible:!1,dialogVisible1:!1,tableData:[],total:0,listQuery:{page:0,pageSize:50},form:{groupName:"",groupType:"1",options:[{value:"1",label:"巡更组"},{value:"2",label:"点检组"}],gl:"",options1:[],crew:"",options2:[]},form1:{groupName:"",groupType:"1",options:[{value:"1",label:"巡更组"},{value:"2",label:"点检组"}],gl:"",options1:[],crew:"",options2:[]},glId:"",newObj:{companyId:localStorage.getItem("deptid")},editObj:{companyId:localStorage.getItem("deptid")}}},mounted:function(){this.getList(),this.gl(),this.editCrew()},methods:{handleClose:function(e){this.$confirm("确认关闭？关闭后页面将刷新").then((function(t){history.go(0),e()})).catch((function(e){}))},getList:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,o=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.listQuery.page=0,e.prev=1,e.next=4,l(this.listQuery);case 4:t=e.sent,this.tableData=t.data.rows,this.total=t.data.records,this.tableData.forEach((function(e){"1"==e.groupType?o.$set(e,"type","巡更组"):"2"==e.groupType&&o.$set(e,"type","点检组")})),console.log(t),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),console.log(e.t0);case 14:case"end":return e.stop()}}),e,this,[[1,11]])})));function t(){return e.apply(this,arguments)}return t}(),remove:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g(t);case 3:o=e.sent,console.log(o),2e4==o.code&&(this.$message({message:o.msg,type:"success"}),this.getList()),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(t){return e.apply(this,arguments)}return t}(),gl:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,o=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u(localStorage.getItem("companyId"));case 3:t=e.sent,this.form.options1=t.data,this.form.options1.forEach((function(e){o.$set(e,"value",e.uid),o.$set(e,"label",e.userName)})),this.form1.options1=t.data,this.form1.options1.forEach((function(e){o.$set(e,"value",e.uid),o.$set(e,"label",e.userName)})),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}(),crew:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,o=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.form.options2=[],e.prev=1,e.next=4,c(localStorage.getItem("companyId"));case 4:t=e.sent,t.data.forEach((function(e){e.uid!=o.form.gl&&o.form.options2.push(e)})),this.form.options2.forEach((function(e){o.$set(e,"value",e.uid),o.$set(e,"label",e.userName)})),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),console.log(e.t0);case 12:case"end":return e.stop()}}),e,this,[[1,9]])})));function t(){return e.apply(this,arguments)}return t}(),editCrew:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,o=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.form1.options2=[],e.prev=1,e.next=4,c(localStorage.getItem("companyId"));case 4:t=e.sent,t.data.forEach((function(e){e.uid!=o.form1.gl&&o.form1.options2.push(e)})),this.form1.options2.forEach((function(e){o.$set(e,"value",e.uid),o.$set(e,"label",e.userName)})),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),console.log(e.t0);case 12:case"end":return e.stop()}}),e,this,[[1,9]])})));function t(){return e.apply(this,arguments)}return t}(),zuZhang:function(e){console.log(e),this.newObj.groupManage=e,console.log(this.form),console.log(this.form1),this.crew()},groupType:function(e){},zuYuan:function(e){""==this.form.gl?(this.$message({message:"请先选择组长",type:"warning"}),this.form.crew=""):(console.log(e),this.newObj.groupWorker=e.join(","),this.newObj.groupName=this.form.groupName,console.log(this.newObj.groupWorker))},newAdd:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p(this.newObj);case 3:t=e.sent,console.log(t),history.go(0),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}(),xinZ:function(){""==this.form.groupName?this.$message({message:"请填写组名",type:"warning"}):""==this.form.gl?this.$message({message:"请选择组长",type:"warning"}):""==this.form.crew?this.$message({message:"请选择组员",type:"warning"}):this.newAdd()},zuZhang1:function(e){console.log(e),this.glId==e?this.editObj.groupManage=this.glId:this.editObj.groupManage=e,this.editCrew()},groupType1:function(e){},zuYuan1:function(e){""==this.form1.gl?(this.$message({message:"请先选择组长",type:"warning"}),this.form1.crew=""):(console.log(e),this.editObj.groupWorker=e.join(","),this.editObj.groupName=this.form1.groupName,console.log(this.editObj.groupWorker))},edit:function(e){console.log(e),this.dialogVisible1=!0,this.form1.groupName=e.row.groupName,this.editObj.groupName=e.row.groupName,this.editObj.id=e.row.id,this.form1.gl=e.row.groupManageName,this.glId=e.row.groupManage,this.editObj.groupManage=e.row.groupManage,this.form1.crew=e.row.groupWorker.split(","),this.editObj.groupWorker=e.row.groupWorker},update:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(this.editObj),e.prev=1,e.next=4,m(this.editObj);case 4:t=e.sent,history.go(0),console.log(t),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),console.log(e.t0);case 12:case"end":return e.stop()}}),e,this,[[1,9]])})));function t(){return e.apply(this,arguments)}return t}()}},d=f,h=(o("800a"),o("2877")),b=Object(h["a"])(d,r,n,!1,null,"6ab7b022",null);t["default"]=b.exports}}]);
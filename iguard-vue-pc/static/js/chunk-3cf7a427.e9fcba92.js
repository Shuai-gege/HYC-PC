(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cf7a427"],{"09f4":function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),Math.easeInOutQuad=function(e,t,n,i){return e/=i/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function a(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(e,t,n){var r=s(),o=e-r,l=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=l;var s=Math.easeInOutQuad(u,r,o,t);a(s),u<t?i(e):n&&"function"===typeof n&&n()};c()}},"24b9":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("3b2b"),n("a481");function i(e,t){var n=new Date(e).Format("yyyy-MM-dd hh:mm:ss");return t&&(n=new Date(e).Format(t)),n.toLocaleString()}Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var n in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e}},"6b93":function(e,t,n){"use strict";var i=n("886e"),a=n.n(i);a.a},"886e":function(e,t,n){},fb0a:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticStyle:{"margin-top":"20px","margin-bottom":"20px"}},[n("el-divider"),e._v(" "),n("el-row",{attrs:{gutter:12}},[n("el-col",{attrs:{span:8}},[n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:e.handleAdd}},[n("i",{staticClass:"el-icon-plus"}),e._v("新增\n        ")])],1)],1)],1),e._v(" "),n("div",[n("el-row",[n("el-col",{attrs:{span:23}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,height:"550",border:"",stripe:!0,"highlight-current-row":!0}},[n("el-table-column",{attrs:{width:"50",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.$index+(e.listQuery.page-1)*e.listQuery.limit+1))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"eventType",label:"事件类型名称"}}),e._v(" "),n("el-table-column",{attrs:{prop:"executeUserName",label:"执行人"}}),e._v(" "),n("el-table-column",{attrs:{prop:"departmentName",label:"部门id"}}),e._v(" "),n("el-table-column",{attrs:{prop:"userIdAName",label:"响应人A"}}),e._v(" "),n("el-table-column",{attrs:{prop:"userIdBName",label:"响应人B"}}),e._v(" "),n("el-table-column",{attrs:{prop:"invalidUserName",label:"无效任务审核人"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.handleEdit(t)}}},[e._v("编辑")]),e._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.handleDelete(t)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}})],1)],1)],1),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogVisibleEdit,title:"编辑","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisibleEdit=t}}},[n("el-form",{ref:"form",attrs:{model:e.entityVO,"label-width":"80px","label-position":"right"}},[n("el-form-item",{attrs:{label:"事件类型"}},[n("el-input",{attrs:{placeholder:"报事类型"},model:{value:e.entityVO.eventType,callback:function(t){e.$set(e.entityVO,"eventType",t)},expression:"entityVO.eventType"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"执行人"}},[n("el-select",{attrs:{filterable:"",multiple:"",placeholder:"请选择"},on:{change:e.execute},model:{value:e.entityVO.executeName,callback:function(t){e.$set(e.entityVO,"executeName",t)},expression:"entityVO.executeName"}},e._l(e.options2,(function(e){return n("el-option",{key:e.uid,attrs:{label:e.vserName,value:e.uid}})})),1)],1),e._v(" "),n("el-form-item",{attrs:{label:"响应人A"}},[n("el-row",{staticClass:"demo-autocomplete"},[n("el-col",{attrs:{span:12}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.duoXuanA},model:{value:e.entityVO.userIdAName,callback:function(t){e.$set(e.entityVO,"userIdAName",t)},expression:"entityVO.userIdAName"}},e._l(e.options,(function(e){return n("el-option",{key:e.uid,attrs:{label:e.vserName,value:e.uid}})})),1)],1)],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"响应人B"}},[n("el-row",{staticClass:"demo-autocomplete"},[n("el-col",{attrs:{span:12}},[n("el-select",{attrs:{filterable:"",multiple:"",placeholder:"请选择"},on:{change:e.duoXuanB},model:{value:e.entityVO.userBName,callback:function(t){e.$set(e.entityVO,"userBName",t)},expression:"entityVO.userBName"}},e._l(e.options3,(function(t){return t.uid!=e.uidA?n("el-option",{key:t.uid,attrs:{label:t.vserName,value:t.uid}}):e._e()})),1)],1)],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"无效任务审核人","label-width":"120px"}},[n("el-row",{staticClass:"demo-autocomplete"},[n("el-col",{attrs:{span:12}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,placeholder:"请选择无效任务审核人"},on:{select:e.handleSelect2},model:{value:e.entityVO.invalidUserName,callback:function(t){e.$set(e.entityVO,"invalidUserName",t)},expression:"entityVO.invalidUserName"}})],1)],1)],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"danger"},on:{click:e.shuaXin}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.confirmTbeventtypeconfigEdit}},[e._v("确定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogVisibleAdd,title:"新增","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisibleAdd=t}}},[n("el-form",{ref:"form",attrs:{model:e.entityVO,"label-width":"80px","label-position":"right"}},[n("el-form-item",{attrs:{label:"事件类型"}},[n("el-input",{attrs:{placeholder:"报事类型"},model:{value:e.entityVO.eventType,callback:function(t){e.$set(e.entityVO,"eventType",t)},expression:"entityVO.eventType"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"执行人"}},[n("el-select",{attrs:{filterable:"",multiple:"",placeholder:"请选择"},on:{change:e.execute},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}},e._l(e.options2,(function(e){return n("el-option",{key:e.uid,attrs:{label:e.vserName,value:e.uid}})})),1)],1),e._v(" "),n("el-form-item",{attrs:{label:"响应人A"}},[n("el-row",{staticClass:"demo-autocomplete"},[n("el-col",{attrs:{span:12}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.duoXuan2},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,(function(e){return n("el-option",{key:e.uid,attrs:{label:e.vserName,value:e.uid}})})),1)],1)],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"响应人B"}},[n("el-row",{staticClass:"demo-autocomplete"},[n("el-col",{attrs:{span:12}},[n("el-select",{attrs:{filterable:"",multiple:"",placeholder:"请选择"},on:{change:e.duoXuan1,focus:e.focus},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}},e._l(e.options1,(function(t){return t.uid!=e.uidA?n("el-option",{key:t.uid,attrs:{label:t.vserName,value:t.uid}}):e._e()})),1)],1)],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"无效任务审核人","label-width":"120px"}},[n("el-row",{staticClass:"demo-autocomplete"},[n("el-col",{attrs:{span:12}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,placeholder:"请选择无效任务审核人"},on:{select:e.handleSelect2},model:{value:e.state3,callback:function(t){e.state3=t},expression:"state3"}})],1)],1)],1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"danger"},on:{click:e.shuXin1}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.confirmTbeventtypeconfigAdd}},[e._v("确定")])],1)],1)],1)},a=[],s=(n("28a5"),n("96cf"),n("3b8d")),r=(n("7f7f"),n("bd86")),o=n("5f87"),l=n("b775");function u(e){return Object(l["a"])({url:"/rest/tbEventTypeConfig/list",method:"post",data:e})}function c(e){return Object(l["a"])({url:"/rest/tbEventTypeConfig/update",method:"post",data:e})}function d(e){return Object(l["a"])({url:"/rest/tbEventTypeConfig/add",method:"post",data:e})}function p(e){return Object(l["a"])({url:"/rest/tbEventTypeConfig/delete",method:"post",data:e})}function m(e){return Object(l["a"])({url:"/rest/user/list",method:"post",data:e})}function h(e,t){return Object(l["a"])({url:"/rest/tbEventTypeConfig/getUserIdA",method:"get",params:{uid:e,responseStatus:t}})}var f=n("333d"),b=n("ed08"),v=n("24b9"),g=Object(o["a"])(),y={uid:localStorage.getItem("uid"),id:"",eventType:"",departmentId:localStorage.getItem("deptid"),userIdA:"",userIdB:"",invalidUserId:"",createTime:"",executeUserId:""},w={name:"tbeventtypeconfig",components:{Pagination:f["a"]},data:function(){var e;return e={list:null,total:0,tableKey:0,listLoading:!1,listQuery:{uid:localStorage.getItem("uid"),page:1,limit:50,id:"",eventType:"",departmentId:"",userIdA:"",userIdB:"",invalidUserId:"",createTime:""},userList:{uid:"",name:"",vsername:"",mobile:"",state:"",deptid:"",jobid:"",email:""},headersObj:{"LinkAdmin-Token":g},activeName:"first",dialogVisibleEdit:!1,dialogVisibleAdd:!1,dialogType:"new",entityVO:Object.assign({},y),entityVO1:Object.assign({},y),value1:"",falg:!1,filterText:"",data:[],departmentId:"",defaultProps:{children:"childrens",label:"name"},restaurants:[],restaurants1:[],state1:"",state2:"",restaurants2:[],state3:"",restaurants3:[],options:[],value:""},Object(r["a"])(e,"value1",""),Object(r["a"])(e,"value2",""),Object(r["a"])(e,"options1",[]),Object(r["a"])(e,"options2",[]),Object(r["a"])(e,"options3",[]),Object(r["a"])(e,"value",""),Object(r["a"])(e,"uidA",""),e},watch:{searchDeptName:function(e){this.$refs.serchDeptTree.filter(e)},filterText:function(e){this.$refs.tree.filter(e)}},created:function(){this.getList(),this.a()},mounted:function(){this.zhiXingRen()},methods:{handleClose:function(e){this.$confirm("确认关闭？").then((function(t){e(),window.location.reload()})).catch((function(e){}))},shuaXin:function(){window.location.reload(),this.dialogVisibleEdit=!1},shuXin1:function(){window.location.reload(),this.dialogVisibleAdd=!1},filterNode:function(e,t){return!e||-1!==t.name.indexOf(e)},getList:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.listLoading=!0,e.prev=1,e.next=4,u(this.listQuery);case 4:t=e.sent,this.listLoading=!1,this.list=t.result.rows,this.total=t.result.records,console.log(this.list),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),this.listLoading=!1;case 14:case"end":return e.stop()}}),e,this,[[1,11]])})));function t(){return e.apply(this,arguments)}return t}(),xuan:function(e){console.log(e),this.filterText=e.name,this.entityVO.departmentId=e.id,this.userList.deptid=e.id},xuan1:function(e){console.log(e),this.entityVO.departmentName=e.name,this.entityVO.departmentId=e.id,this.userList.deptid=e.id},handleEdit:function(e){this.b(),console.log(e),this.dialogVisibleEdit=!0,this.entityVO=Object(b["c"])(e.row),this.entityVO1=Object(b["c"])(e.row);var t=this.entityVO.userIdB,n=this.entityVO.executeUserId;this.$set(this.entityVO,"userBName",t.split(",")),this.$set(this.entityVO,"executeName",n.split(",")),console.log(this.entityVO)},handleAdd:function(e){this.dialogVisibleAdd=!0},confirmTbeventtypeconfigEdit:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(this.entityVO),e.next=3,c(this.entityVO);case 3:t=e.sent,n=t.code,2e4==n&&(this.$message({showClose:!0,message:"编辑成功",type:"success"}),this.dialogVisibleEdit=!1,this.getList());case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),confirmTbeventtypeconfigAdd:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!=this.entityVO.eventType){e.next=4;break}this.$message({message:"请填写事件类型",type:"warning"}),e.next=21;break;case 4:if(""!=this.entityVO.executeUserId){e.next=8;break}this.$message({message:"请选择执行人",type:"warning"}),e.next=21;break;case 8:if(""!=this.entityVO.userIdA){e.next=12;break}this.$message({message:"请选择响应人A",type:"warning"}),e.next=21;break;case 12:if(""!=this.entityVO.invalidUserId){e.next=16;break}this.$message({message:"请选择无效任务审批人",type:"warning"}),e.next=21;break;case 16:return e.next=18,d(this.entityVO);case 18:t=e.sent,n=t.code,2e4==n&&(this.$message({showClose:!0,message:"新增成功",type:"success"}),this.dialogVisibleAdd=!1,this.getList());case 21:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleDelete:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var n,i=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=this.$createElement,this.entityVO=Object(b["c"])(t.row),this.$msgbox({title:"删除消息",message:n("p",null,[n("span",null,"确定要删除 "),n("i",{style:"color: teal"},"这条记录吗?")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,n,a){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("confirm"!==t){e.next=7;break}return e.next=3,p(i.entityVO);case 3:s=e.sent,2e4==s.code&&a(),e.next=8;break;case 7:a();case 8:case"end":return e.stop()}}),e)})));function t(t,n,i){return e.apply(this,arguments)}return t}()}).then((function(e){i.$message({showClose:!0,type:"success",message:"删除成功"}),i.getList()}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),formatDateTime:function(e,t){return Object(v["a"])(e.createTime,"yyyy-MM-dd hh:mm:ss")},zhiXingRen:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m(this.userList);case 3:t=e.sent,this.restaurants1=t.result.rows,this.options2=t.result.rows,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}(),querySearch:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,n){var i,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m(this.userList);case 3:for(i=e.sent,this.restaurants1=i.result.rows,a=0;a<i.result.rows.length;a++)this.$set(this.restaurants1[a],"value",this.restaurants1[a].vserName);this.options2=i.result.rows,console.log(i.result.rows),s=t?this.restaurants1.filter(this.createFilter(t)):this.restaurants1,e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.log(e.t0);case 14:n(s);case 15:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(t,n){return e.apply(this,arguments)}return t}(),a:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h(localStorage.getItem("uid"),"A");case 3:t=e.sent,this.options=t.result,e.next=11;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("到底怎么回事"),console.log(e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(){return e.apply(this,arguments)}return t}(),b:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h(localStorage.getItem("uid"),"B");case 3:t=e.sent,this.restaurants1=t.result,this.options1=t.result,this.options3=t.result,e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(){return e.apply(this,arguments)}return t}(),createFilter:function(e){return function(t){return 0===t.value.toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(e){this.entityVO.userIdA=e.uid},handleSelect1:function(e){this.entityVO.userIdB=e.uid},duoXuan:function(e){this.entityVO.executeUserId=e.join(",")},focus:function(){""==this.value?(this.$message({message:"请选择响应人A",type:"warning"}),this.options1=[]):this.b()},duoXuan1:function(e){this.entityVO.userIdB=e.join(",")},duoXuan2:function(e){this.entityVO.userIdA=e,this.uidA=e},duoXuanB:function(e){console.log(e),this.entityVO.userIdB=e.join(",")},duoXuanA:function(e){console.log(e),this.entityVO.userIdA=e,this.uidA=e},execute:function(e){console.log(e),this.entityVO.executeUserId=e.join(",")},handleSelect2:function(e){this.entityVO.invalidUserId=e.uid}}},O=w,x=(n("6b93"),n("2877")),V=Object(x["a"])(O,i,a,!1,null,"6bfe2ad9",null);t["default"]=V.exports}}]);
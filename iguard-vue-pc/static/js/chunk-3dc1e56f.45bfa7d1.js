(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3dc1e56f"],{"06cd":function(t,e,a){"use strict";var n=a("bc3a"),o=a.n(n),i=a("5c96"),r=a("4360"),l=a("5f87"),s=o.a.create({baseURL:"http://47.100.240.228:8950",timeout:3e7,responseType:"json"});s.interceptors.request.use((function(t){return r["a"].getters.token&&(t.headers["LinkAdmin-Token"]=Object(l["a"])()),t}),(function(t){return console.log(t),Promise.reject(t)})),s.interceptors.response.use((function(t){var e=t.data;return 2e4!==e.code?(Object(i["Message"])({message:e.msg||"Error",type:"error",duration:3e3}),50001===e.code&&i["MessageBox"].confirm("你已经退出系统了, 你可以取消停留在这一页, 或者再次登录","提示",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then((function(){r["a"].dispatch("user/resetToken").then((function(){location.reload()}))})),Promise.reject(new Error(e.msg||"Error"))):e}),(function(t){return console.log("err"+t),Object(i["Message"])({message:t.message,type:"error",duration:3e3}),Promise.reject(t)})),e["a"]=s},"09f4":function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),Math.easeInOutQuad=function(t,e,a,n){return t/=n/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function i(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(t,e,a){var r=i(),l=t-r,s=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=s;var i=Math.easeInOutQuad(c,r,l,e);o(i),c<e?n(t):a&&"function"===typeof a&&a()};u()}},2887:function(t,e,a){"use strict";a.d(e,"c",(function(){return o})),a.d(e,"d",(function(){return i})),a.d(e,"f",(function(){return r})),a.d(e,"a",(function(){return l})),a.d(e,"b",(function(){return s})),a.d(e,"e",(function(){return c}));var n=a("b775");function o(t){return Object(n["a"])({url:"/rest/tbEventReport/getPCReportEventByPage",method:"post",data:t})}function i(t){return Object(n["a"])({url:"/rest/department/subCompanyList",method:"get",params:{uid:t}})}function r(t){return Object(n["a"])({url:"/rest/department/subDeptByDeptId",method:"get",params:{deptId:t}})}function l(t){return Object(n["a"])({url:"/rest/department/getCompanyByUid",method:"get",params:{uid:t}})}function s(t){return Object(n["a"])({url:"/rest/tbEventTypeConfig/list",method:"post",data:t})}function c(t){return Object(n["a"])({url:"/rest/department/subDeptByDeptId",method:"get",params:{deptId:t}})}},"542c":function(t,e,a){},6403:function(t,e,a){"use strict";a.d(e,"f",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"e",(function(){return l})),a.d(e,"a",(function(){return s})),a.d(e,"d",(function(){return c})),a.d(e,"b",(function(){return u}));var n=a("b775"),o=a("7605");function i(t){return Object(n["a"])({url:"/rest/department/subCompanyList",method:"get",params:{uid:t}})}function r(t){return Object(o["a"])({url:"/rest/buildingLocation/getCompanyDeptByCompanyId",method:"get",params:{company_id:t}})}function l(t){return Object(n["a"])({url:"/rest/tbEventReport/getPCReportEventDetailByPage",method:"post",data:t})}function s(t){return Object(o["a"])({url:"/rest/buildingLocation/getBuildingLocationFloor",method:"get",params:{parentId:t}})}function c(t){return Object(n["a"])({url:"/rest/tbEventTypeConfig/list",method:"post",data:t})}function u(t){return Object(n["a"])({url:"/rest/department/getCompanyByUid",method:"get",params:{uid:t}})}},"69dd":function(t,e,a){"use strict";var n=a("6b6c"),o=a.n(n);o.a},"6b6c":function(t,e,a){},bb82:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:5.5}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.time},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),t._v(" "),a("el-col",{attrs:{span:3}},[a("el-select",{attrs:{placeholder:"请选择企业"},on:{change:t.qiYe},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}},t._l(t.options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("treeselect",{attrs:{options:t.departments,normalizer:t.normalizer,placeholder:"选择部门"},on:{input:t.shu},model:{value:t.listQuery.deptId,callback:function(e){t.$set(t.listQuery,"deptId",e)},expression:"listQuery.deptId"}})],1),t._v(" "),a("el-col",{attrs:{span:3}},[a("el-input",{attrs:{placeholder:"输入姓名"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:t.check}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.excel}},[t._v("导出")])],1)],1),t._v(" "),a("el-divider"),t._v(" "),a("div",[a("el-row",[a("el-col",{attrs:{span:23}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,height:"600",border:""}},[a("el-table-column",{attrs:{width:"50",label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+(t.listQuery.page-1)*t.listQuery.pageSize+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"deptName",label:"部门"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolEvents",label:"巡更事件数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"completePatrolEvents",label:"事件完成数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"eventCompletePR",label:"事件完成率",formatter:t.wanChengPR}}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolPointCount",label:"巡更点位数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"completePoints",label:"点位完成数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pointCompletePR",label:"点位完成率",formatter:t.dianWeiPR}}),t._v(" "),a("el-table-column",{attrs:{prop:"signInFaceNo",label:"人脸核验未通过数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.num(e)}}},[t._v(t._s(e.row.signInFaceNo))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"zip",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.order(e)}}},[t._v("详情")])]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.pageSize},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"pageSize",e)},pagination:t.parsonList}})],1)],1)],1),t._v(" "),a("div",[a("el-dialog",{attrs:{title:"个人巡更事件详情",visible:t.dialogVisible,width:"70%","before-close":t.handleClose,top:"3vh"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"title"},[a("div",[a("i",[t._v("企业")]),t._v("：\n          "),a("i",[t._v(t._s(t.PIM.companyName))])]),t._v(" "),a("div",[a("i",[t._v("部门")]),t._v("：\n          "),a("i",[t._v(t._s(t.PIM.deptName))])]),t._v(" "),a("div",[a("i",[t._v("姓名")]),t._v("：\n          "),a("i",[t._v(t._s(t.PIM.userName))])]),t._v(" "),void 0!=t.PIM.time?a("div",[a("i",[t._v("查询时间")]),t._v("：\n          "),a("i",[t._v(t._s(t.PIM.time))])]):a("div",[a("i",[t._v("查询时间")]),t._v("：\n          "),a("i",[t._v("全部")])])]),t._v(" "),a("el-tag",{attrs:{type:"warning"}},[t._v("未完成事件")]),t._v(" "),a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading1,expression:"loading1"}],staticStyle:{width:"100%"},attrs:{data:t.tableData1,height:"300",border:""}},[a("el-table-column",{attrs:{width:"50",label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+t.eventComplte.page*t.eventComplte.pageSize+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"detailCode",label:"事件编号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskName",label:"巡更事件名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"startTime",label:"开始时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"endTime",label:"结束时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zhuangTai",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.undone(e)}}},[t._v(t._s(e.row.zhuangTai))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolPointIdsCount",label:"巡更点数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolPointIdsNoCount",label:"未完成点数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"facePatrolPointNoCheckCount",label:"人脸核验未通过数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{color:"#f00"}},[t._v(t._s(e.row.facePatrolPointNoCheckCount))])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{background:"","page-sizes":[50,100,200,500],"page-size":50,layout:"total, sizes, prev, pager, next, jumper",total:t.total1},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-divider"),t._v(" "),a("el-tag",{attrs:{type:"success"}},[t._v("完成事件")]),t._v(" "),a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading2,expression:"loading2"}],staticStyle:{width:"100%"},attrs:{data:t.tableData2,height:"300",border:""}},[a("el-table-column",{attrs:{width:"50",label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+t.eventComplte.page*t.eventComplte.pageSize+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"detailCode",label:"事件编号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskName",label:"巡更事件名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"startTime",label:"开始时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"endTime",label:"结束时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zhuangTai",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.done(e)}}},[t._v(t._s(e.row.zhuangTai))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolPointIdsCount",label:"巡更点数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolPointIdsNoCount",label:"未完成点数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"facePatrolPointNoCheckCount",label:"人脸核验未通过数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{color:"#f00"},attrs:{type:"text",size:"small"},on:{click:function(a){return t.order1(e)}}},[t._v(t._s(e.row.facePatrolPointNoCheckCount))])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{background:"","page-sizes":[50,100,200,500],"page-size":50,layout:"total, sizes, prev, pager, next, jumper",total:t.total2},on:{"size-change":t.handleSizeChange1,"current-change":t.handleCurrentChange1}})],1)],1)],1),t._v(" "),a("div",[a("el-dialog",{attrs:{title:"人脸核验详情",visible:t.dialogVisible1,width:"40%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible1=e}}},[1==t.imgs.status?a("div",{staticClass:"con"},[t._v("核验结果：通过")]):a("div",{staticClass:"con"},[t._v("核验结果：未通过")]),t._v(" "),a("div",{staticClass:"con"},[t._v("人工核验："+t._s(t.adminOperation))]),t._v(" "),a("div",{staticClass:"imgs"},[a("div",[t._v("\n          人员照片\n          "),a("el-image",{attrs:{src:t.imgs.src}})],1),t._v(" "),a("div",[t._v("\n          核验照片\n          "),a("el-image",{attrs:{src:t.imgs.src1}})],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[1!=t.imgs.status?a("el-button",{attrs:{type:"primary"},on:{click:t.updateLian}},[t._v("重置为通过")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible1=!1}}},[t._v("关 闭")])],1)])],1),t._v(" "),a("div",[a("el-dialog",{attrs:{title:"人脸核验详情",visible:t.dialogVisible4,width:"40%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible4=e}}},[1==t.imgs.status?a("div",{staticClass:"con"},[t._v("核验结果：通过")]):a("div",{staticClass:"con"},[t._v("核验结果：未通过")]),t._v(" "),a("div",{staticClass:"con"},[t._v("人工核验："+t._s(t.adminOperation))]),t._v(" "),a("div",{staticClass:"imgs"},[a("div",[t._v("\n          人员照片\n          "),a("el-image",{attrs:{src:t.imgs.src}})],1),t._v(" "),a("div",[t._v("\n          核验照片\n          "),a("el-image",{attrs:{src:t.imgs.src1}})],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[1!=t.imgs.status?a("el-button",{attrs:{type:"primary"},on:{click:t.updateLian}},[t._v("重置为通过")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible4=!1}}},[t._v("关 闭")])],1)])],1),t._v(" "),a("div",[a("el-dialog",{attrs:{title:"巡更点签到详情",visible:t.dialogVisible2,width:"70%","before-close":t.handleClose,top:"3vh"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("div",{staticClass:"title"},[a("div",[a("i",[t._v("企业")]),t._v("：\n          "),a("i",[t._v(t._s(t.PIM.companyName))])]),t._v(" "),a("div",[a("i",[t._v("部门")]),t._v("：\n          "),a("i",[t._v(t._s(t.PIM.deptName))])]),t._v(" "),a("div",[a("i",[t._v("姓名")]),t._v("：\n          "),a("i",[t._v(t._s(t.PIM.userName))])]),t._v(" "),void 0!=t.PIM.time?a("div",[a("i",[t._v("查询时间")]),t._v("：\n          "),a("i",[t._v(t._s(t.PIM.time))])]):a("div",[a("i",[t._v("查询时间")]),t._v("：\n          "),a("i",[t._v("全部")])])]),t._v(" "),a("el-tag",{attrs:{type:"warning"}},[t._v("未完成巡更点")]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading3,expression:"loading3"}],staticStyle:{width:"100%"},attrs:{data:t.tableData3,height:"330",border:""}},[a("el-table-column",{attrs:{width:"50",label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+t.eventComplte.page*t.eventComplte.pageSize+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"buildingName",label:"建筑"}}),t._v(" "),a("el-table-column",{attrs:{prop:"floorName",label:"楼层"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolPointName",label:"巡更点名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zhuangTai",label:"人脸核验状态",formatter:t.face},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.faceCheck?a("el-button",{attrs:{type:"text",size:"small"}},[t._v("--")]):t._e(),t._v(" "),"1"==e.row.faceCheck?a("el-button",{attrs:{type:"text",size:"small"}},[t._v("人脸未核验")]):t._e(),t._v(" "),"2"==e.row.faceCheck?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.face(e)}}},[t._v("通过")]):t._e(),t._v(" "),"3"==e.row.faceCheck?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.face(e)}}},[t._v("未通过")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"signTime",label:"巡更时间",formatter:t.shiJian}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","page-sizes":[50,100,200,500],"page-size":50,layout:"total, sizes, prev, pager, next, jumper",total:t.total3},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("el-tag",{attrs:{type:"success"}},[t._v("已完成巡更点")]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading6,expression:"loading6"}],staticStyle:{width:"100%"},attrs:{data:t.tableData6,height:"330",border:""}},[a("el-table-column",{attrs:{width:"50",label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+t.eventComplte.page*t.eventComplte.pageSize+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"buildingName",label:"建筑"}}),t._v(" "),a("el-table-column",{attrs:{prop:"floorName",label:"楼层"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolPointName",label:"巡更点名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zhuangTai",label:"人脸核验状态",formatter:t.face},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.faceCheck?a("el-button",{attrs:{type:"text",size:"small"}},[t._v("--")]):t._e(),t._v(" "),"1"==e.row.faceCheck?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.face(e)}}},[t._v("人脸未核验")]):t._e(),t._v(" "),"2"==e.row.faceCheck?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.face(e)}}},[t._v("通过")]):t._e(),t._v(" "),"3"==e.row.faceCheck?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.face(e)}}},[t._v("未通过")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"signTime",label:"巡更时间",formatter:t.shiJian}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","page-sizes":[50,100,200,500],"page-size":50,layout:"total, sizes, prev, pager, next, jumper",total:t.total6},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("div",[a("el-dialog",{attrs:{title:"人脸核验未通过详情",visible:t.dialogVisible3,width:"70%","before-close":t.handleClose,top:"3vh"},on:{"update:visible":function(e){t.dialogVisible3=e}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading4,expression:"loading4"}],staticStyle:{width:"100%"},attrs:{data:t.tableData4,height:"800",border:""}},[a("el-table-column",{attrs:{width:"50",label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+t.eventComplte.page*t.eventComplte.pageSize+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"eventCode",label:"事件编号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"eventName",label:"巡更事件名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patrolPointName",label:"巡更点名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"signTime",label:"巡更时间",formatter:t.formattingTime}}),t._v(" "),a("el-table-column",{attrs:{label:"人脸核验状态",formatter:t.face},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.noFaceCheck(e)}}},[t._v("未通过")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{background:"","page-sizes":[50,100,200,500],"page-size":50,layout:"total, sizes, prev, pager, next, jumper",total:t.total4},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)},o=[],i=(a("7f7f"),a("ac6a"),a("96cf"),a("3b8d")),r=a("6403"),l=a("06cd");function s(t){return Object(l["a"])({url:"/rest/PCReportController/getPCReportUser",method:"post",data:t})}function c(t){return Object(l["a"])({url:"/rest/PCReportController/getEventDetailCompleteByUid",method:"post",data:t})}function u(t){return Object(l["a"])({url:"/rest/PCReportController/getEventDetailNoCompleteByUid",method:"post",data:t})}function d(t){return Object(l["a"])({url:"/rest/PCReportController/getPointNoCompleteByDetailId",method:"post",data:t})}function p(t){return Object(l["a"])({url:"/rest/PCReportController/getFaceCheckDetail",method:"post",data:t})}function v(t){return Object(l["a"])({url:"/rest/PCReportController/faceCheckNoPass",method:"post",data:t})}function h(t){return Object(l["a"])({url:"/rest/PCReportController/updateUserFaceSign",method:"post",data:t})}var m=a("2887"),g=a("ca17"),f=a.n(g),b=(a("542c"),a("333d")),_={components:{Pagination:b["a"],Treeselect:f.a},data:function(){return{value:[new Date,new Date],value1:"",value2:"",options:[],departments:[],listQuery:{uid:localStorage.getItem("uid"),page:1,pageSize:50,startDate:""},eventComplte:{uid:localStorage.getItem("uids"),startDate:"",page:0,pageSize:50},undoneDatail:{detailId:"",page:0,pageSize:50},undoneDatail1:{detailId:"",page:0,pageSize:50},faceList:{page:0,pageSize:50},updateFace:{uid:localStorage.getItem("uid")},adminOperation:"",faceDetail:{},PIM:{},tableData:[],loading:!0,loading1:!0,loading2:!0,loading3:!0,loading4:!0,loading6:!0,tableData1:[],tableData2:[],tableData3:[],tableData4:[],tableData6:[],total:0,total1:0,total2:0,total3:0,total4:0,total6:0,dialogVisible:!1,dialogVisible1:!1,dialogVisible2:!1,dialogVisible3:!1,dialogVisible4:!1,imgs:{src:"",src1:"",status:""}}},mounted:function(){this.time1([new Date,new Date]),1==localStorage.getItem("uid")?this.getList():this.getCompany(),this.parsonList()},methods:{noFace:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v(this.faceList);case 3:e=t.sent,console.log(e),this.tableData4=e.data,this.total4=parseInt(e.recode),this.loading4=!1,t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:case"end":return t.stop()}}),t,this,[[0,10]])})));function e(){return t.apply(this,arguments)}return e}(),startDetail:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d(e);case 3:a=t.sent,console.log(a),(a.code=2e4)?(this.total3=parseInt(a.recode),this.tableData3=a.data,this.loading3=!1):this.$message(a.code),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(e){return t.apply(this,arguments)}return e}(),startDetail1:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d(e);case 3:a=t.sent,console.log(a),(a.code=2e4)?(this.total6=parseInt(a.recode),this.tableData6=a.data,this.loading6=!1):this.$message(a.code),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(e){return t.apply(this,arguments)}return e}(),parsonList:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s(this.listQuery);case 3:e=t.sent,console.log(e),this.tableData=e.data,this.total=parseInt(e.recode),this.loading=!1,t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:case"end":return t.stop()}}),t,this,[[0,10]])})));function e(){return t.apply(this,arguments)}return e}(),getStartEvent:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c(e);case 3:a=t.sent,this.loading2=!1,console.log(a),this.tableData2=a.data,this.tableData2.forEach((function(t){n.$set(t,"patrolPointIdsNoCount",t.patrolPointIdsCount-t.patrolPointIdsEdCount),n.$set(t,"zhuangTai","完成")})),this.total2=parseInt(a.recode),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));function e(e){return t.apply(this,arguments)}return e}(),getEndEvent:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u(e);case 3:a=t.sent,this.loading1=!1,console.log(a),this.tableData1=a.data,this.tableData1.forEach((function(t){n.$set(t,"patrolPointIdsNoCount",t.patrolPointIdsCount-t.patrolPointIdsEdCount),n.$set(t,"zhuangTai","未完成")})),this.total1=parseInt(a.recode),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));function e(e){return t.apply(this,arguments)}return e}(),getList:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(r["f"])(localStorage.getItem("uid"));case 3:e=t.sent,console.log(e),this.options.push(e.result),this.options.forEach((function(t){a.$set(t,"label",t.name),a.$set(t,"value",t.id)})),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,this,[[0,9]])})));function e(){return t.apply(this,arguments)}return e}(),getCompany:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(r["b"])(localStorage.getItem("uid"));case 3:e=t.sent,console.log(e),this.options.push(e.result),this.options.forEach((function(t){a.$set(t,"label",t.name),a.$set(t,"value",t.id)})),this.value1=e.result.id,this.getSubDepartments(e.result.id),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));function e(){return t.apply(this,arguments)}return e}(),getSubDepartments:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(m["e"])(e);case 2:a=t.sent,n=a.result,console.log(a),this.diGuiTree(n),this.departments=n;case 7:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),normalizer:function(t){return{id:t.id,label:t.name,children:t.childrens}},diGuiTree:function(t){var e=this;t.forEach((function(t){""===t.childrens||void 0===t.childrens||null===t.childrens?delete t.childrens:e.diGuiTree(t.childrens)}))},p:function(t){return t<10?"0"+t:t},time:function(t){console.log(t);var e=new Date(t[0]),a=e.getFullYear(),n=this.p(e.getMonth()+1),o=this.p(e.getDate());this.listQuery.startDate=a+"-"+n+"-"+o+" 00:00:00",this.eventComplte.startDate=a+"-"+n+"-"+o+" 00:00:00";var i=new Date(t[1]),r=i.getFullYear(),l=this.p(i.getMonth()+1),s=this.p(i.getDate());this.listQuery.endDate=r+"-"+l+"-"+s+" 23:59:59",this.eventComplte.endTime=r+"-"+l+"-"+s+" 23:59:59",this.PIM.time=a+"-"+n+"-"+o+"~"+r+"-"+l+"-"+s},time1:function(t){console.log(t);var e=new Date(t[0]),a=e.getFullYear(),n=this.p(e.getMonth()+1),o=this.p(e.getDate());this.listQuery.startDate=a+"-"+n+"-"+o+" 00:00:00",this.eventComplte.startDate=a+"-"+n+"-"+o+" 00:00:00";var i=new Date(t[1]),r=i.getFullYear(),l=this.p(i.getMonth()+1),s=this.p(i.getDate());this.listQuery.endDate=r+"-"+l+"-"+s+" 23:59:59",this.eventComplte.endTime=r+"-"+l+"-"+s+" 23:59:59",this.PIM.time=a+"-"+n+"-"+o+"~"+r+"-"+l+"-"+s},shu:function(t){},qiYe:function(t){console.log(t),console.log("asdasdasd")},check:function(){console.log("asd"),this.listQuery.userName=this.value2,this.listQuery.companyId=this.value1,this.parsonList()},excel:function(){console.log("asdsadasdad")},handleClose:function(t){this.$confirm("确认关闭？").then((function(e){t()})).catch((function(t){}))},wanChengPR:function(t,e){return console.log(t),"0.0"==t.eventCompletePR?"0%":t.eventCompletePR+"%"},dianWeiPR:function(t,e){return"0.0"==t.pointCompletePR?"0%":t.pointCompletePR+"%"},handleSizeChange:function(t){this.eventComplte.uid=localStorage.getItem("uids"),this.eventComplte.pageSize=t,this.getEndEvent(this.eventComplte)},handleCurrentChange:function(t){this.eventComplte.uid=localStorage.getItem("uids"),this.eventComplte.pageSize=50,this.eventComplte.page=t-1,this.getEndEvent(this.eventComplte)},handleSizeChange1:function(t){this.eventComplte.uid=localStorage.getItem("uids"),this.eventComplte.pageSize=t,this.getStartEvent(this.eventComplte)},handleCurrentChange1:function(t){this.eventComplte.uid=localStorage.getItem("uids"),this.eventComplte.pageSize=50,this.eventComplte.page=t-1,this.getStartEvent(this.eventComplte)},order:function(t){console.log(t),this.faceDetail.executeUid=t.row.uid,this.dialogVisible=!0,this.faceList.uid=t.row.uid,localStorage.setItem("uids",t.row.uid),this.eventComplte.uid=localStorage.getItem("uids"),this.getStartEvent(this.eventComplte),this.getEndEvent(this.eventComplte),this.PIM.userName=t.row.userName,this.PIM.companyName=t.row.companyName,this.PIM.deptName=t.row.deptName},order1:function(t){console.log(t),this.dialogVisible=!0,localStorage.setItem("uids",t.row.uid),this.eventComplte.uid=localStorage.getItem("uids"),this.getStartEvent(this.eventComplte),this.getEndEvent(this.eventComplte),this.PIM.userName=t.row.userName,this.PIM.companyName=t.row.companyName,this.PIM.deptName=t.row.deptName},shiJian:function(t,e){return console.log(t),null==t.signTime?"-":t.signTime},formattingTime:function(t,e){var a=new Date(t.signTime),n=a.getFullYear(),o=this.p(a.getMonth()+1),i=this.p(a.getDate()),r=this.p(a.getHours()),l=this.p(a.getMinutes()),s=this.p(a.getSeconds());return n+"-"+o+"-"+i+" "+r+":"+l+":"+s},face:function(t){console.log(t),this.dialogVisible4=!0,this.faceDetail.taskDetailId=t.row.detailId,this.faceDetail.patrolPointId=t.row.patrolPointId,this.updateFace.patrolPointId=t.row.patrolPointId,this.updateFace.taskDetailId=t.row.detailId,this.faceCheckDetail("4")},num:function(t){this.dialogVisible3=!0,console.log(t),this.faceList.uid=t.row.uid,this.faceDetail.executeUid=t.row.uid,this.updateFace.executeUid=t.row.uid,this.noFace()},faceCheckDetail:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p(this.faceDetail);case 3:a=t.sent,console.log(a),2e4==a.code&&("4"==e?(this.imgs.src=a.data.oldBase64,this.imgs.src1=a.data.nowBase64,this.imgs.status=a.data.status,this.adminOperation=a.data.adminOperation,n=a.data.nowBase64.substr(a.data.nowBase64.lastIndexOf("/")),this.imgs.src1="http://47.100.240.228:8953/rest/PCReport/img"+n):(this.dialogVisible1=!0,this.imgs.src=a.data.oldBase64,this.imgs.src1=a.data.nowBase64,this.imgs.status=a.data.status,o=a.data.nowBase64.substr(a.data.nowBase64.lastIndexOf("/")),this.imgs.src1="http://47.100.240.228:8953/rest/PCReport/img"+o,this.adminOperation=a.data.adminOperation),console.log(this.imgs)),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(e){return t.apply(this,arguments)}return e}(),noFaceCheck:function(t){this.updateFace.patrolPointId=t.row.patrolPointId,this.updateFace.taskDetailId=t.row.taskDetailId,this.faceDetail.patrolPointId=t.row.patrolPointId,this.faceDetail.taskDetailId=t.row.taskDetailId,this.faceCheckDetail()},updateLian:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h(this.updateFace);case 3:e=t.sent,2e4==e.code&&(this.dialogVisible1=!1,this.dialogVisible4=!1,this.noFace(),this.parsonList()),console.log(e),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(){return t.apply(this,arguments)}return e}(),undone:function(t){this.dialogVisible2=!0,console.log(t),this.undoneDatail.status="1",this.undoneDatail.detailId=t.row.id,this.undoneDatail1.status="2",this.undoneDatail1.detailId=t.row.id,this.startDetail(this.undoneDatail),this.startDetail1(this.undoneDatail1)},done:function(t){this.dialogVisible2=!0,console.log(t),this.undoneDatail.status="2",this.undoneDatail.detailId=t.row.id,this.undoneDatail1.status="1",this.undoneDatail1.detailId=t.row.id,this.startDetail(this.undoneDatail1),this.startDetail1(this.undoneDatail)}}},C=_,w=(a("69dd"),a("2877")),y=Object(w["a"])(C,n,o,!1,null,"00dac924",null);e["default"]=y.exports}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f91a3cf"],{"09f4":function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),Math.easeInOutQuad=function(t,e,n,i){return t/=i/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function a(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(t,e,n){var s=o(),r=t-s,l=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=l;var o=Math.easeInOutQuad(c,s,r,e);a(o),c<e?i(t):n&&"function"===typeof n&&n()};u()}},"24b9":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("3b2b"),n("a481");function i(t,e){var n=new Date(t).Format("yyyy-MM-dd hh:mm:ss");return e&&(n=new Date(t).Format(e)),n.toLocaleString()}Date.prototype.Format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[n]:("00"+e[n]).substr((""+e[n]).length)));return t}},"276f":function(t,e,n){},"3f43":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticStyle:{"margin-top":"20px","margin-bottom":"20px"}},[n("el-row",{attrs:{gutter:12}},[n("el-col",{attrs:{span:18}},[n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:t.handleAdd}},[n("i",{staticClass:"el-icon-plus"}),t._v("新增建筑\n        ")]),t._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:t.handleAdd1}},[n("i",{staticClass:"el-icon-plus"}),t._v("新增楼层\n        ")]),t._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:t.handleAdd2}},[n("i",{staticClass:"el-icon-plus"}),t._v("新增房间\n        ")])],1)],1)],1),t._v(" "),n("div",[n("div",{staticClass:"block"},[n("el-tree",{attrs:{data:t.data1,props:t.defaultProps1,"expand-on-click-node":!1},on:{"node-click":t.handleNodeClick},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.node,a=e.data;return n("span",{staticClass:"custom-tree-node"},[n("span",[t._v(t._s(i.label))]),t._v(" "),n("span",[n("el-button",{attrs:{type:"text",icon:"el-icon-delete",size:"mini"},on:{click:function(){return t.remove(i,a)}}}),t._v(" "),n("el-button",{attrs:{type:"text",icon:"el-icon-edit-outline",size:"mini"},on:{click:function(){return t.edit(i,a)}}})],1)])}}])})],1)]),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogVisibleAdd,title:"新增","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisibleAdd=e},close:t.end}},[n("el-row",[n("el-col",{attrs:{span:18}},[n("el-form",{ref:"dynamicValidateForm",staticClass:"demo-dynamic",attrs:{model:t.entityVO,"label-width":"80px"}},[n("el-form-item",{attrs:{prop:"jianZhu",label:"公司名称"}},[n("el-input",{attrs:{placeholder:t.jianZhu,disabled:!0}})],1),t._v(" "),t._l(t.entityVO.vos,(function(e,i){return n("el-form-item",{key:e.key,attrs:{label:"建筑"+(i+1),prop:"vos."+i+".locationName",rules:{required:!0,message:"建筑不能为空",trigger:"blur"}}},[n("el-input",{model:{value:e.locationName,callback:function(n){t.$set(e,"locationName",n)},expression:"domain.locationName"}}),t._v(" "),n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(n){return n.preventDefault(),t.removeDomain(e)}}})],1)})),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("dynamicValidateForm")}}},[t._v("提交")]),t._v(" "),n("el-button",{on:{click:t.addDomain}},[t._v("新增建筑")])],1)],2)],1)],1)],1),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogVisibleAdd1,title:"新增","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisibleAdd1=e},close:t.end1}},[n("el-row",[n("el-col",{attrs:{span:18}},[n("el-form",{ref:"dynamicValidateForm",staticClass:"demo-dynamic",attrs:{model:t.entityVO1,"label-width":"80px"}},[n("el-form-item",{attrs:{prop:"jianZhu",label:"公司名称"}},[n("el-input",{attrs:{placeholder:t.jianZhu,disabled:!0}})],1),t._v(" "),n("el-form-item",{attrs:{prop:"",label:"建筑名称"}},[n("el-col",{attrs:{span:12}},[n("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"380px"},attrs:{"fetch-suggestions":t.querySearch,placeholder:"请输入内容",disabled:t.jinXuan},on:{select:t.handleSelect},model:{value:t.state1,callback:function(e){t.state1=e},expression:"state1"}})],1)],1),t._v(" "),t._l(t.entityVO1.vos,(function(e,i){return n("el-form-item",{key:e.key,attrs:{label:"楼层"+(i+1),prop:"vos."+i+".locationName",rules:{required:!0,message:"楼层不能为空",trigger:"blur"}}},[n("el-input",{model:{value:e.locationName,callback:function(n){t.$set(e,"locationName",n)},expression:"domain.locationName"}}),t._v(" "),n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(n){return n.preventDefault(),t.removeDomain1(e)}}})],1)})),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm1("dynamicValidateForm")}}},[t._v("提交")]),t._v(" "),n("el-button",{on:{click:t.addDomain1}},[t._v("新增楼层")])],1)],2)],1)],1)],1),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogVisibleAdd2,title:"新增","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisibleAdd2=e},close:t.end2}},[n("el-row",[n("el-col",{attrs:{span:18}},[n("el-form",{ref:"dynamicValidateForm",staticClass:"demo-dynamic",attrs:{model:t.entityVO2,"label-width":"80px"}},[n("el-form-item",{attrs:{prop:"jianZhu",label:"公司名称"}},[n("el-input",{attrs:{placeholder:t.jianZhu,disabled:!0}})],1),t._v(" "),n("el-form-item",{attrs:{prop:"",label:"建筑名称"}},[n("el-col",{attrs:{span:12}},[n("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"380px"},attrs:{"fetch-suggestions":t.querySearch1,placeholder:"请输入内容",disabled:t.jinXuan1},on:{select:t.handleSelect1},model:{value:t.state2,callback:function(e){t.state2=e},expression:"state2"}})],1)],1),t._v(" "),n("el-form-item",{attrs:{prop:"",label:"楼层名称"}},[n("el-col",{attrs:{span:12}},[n("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"380px"},attrs:{"fetch-suggestions":t.querySearch2,placeholder:"请输入内容",disabled:t.jinXuan2},on:{select:t.handleSelect2},model:{value:t.state3,callback:function(e){t.state3=e},expression:"state3"}})],1)],1),t._v(" "),t._l(t.entityVO2.vos,(function(e,i){return n("el-form-item",{key:e.key,attrs:{label:"房间"+(i+1),prop:"vos."+i+".locationName",rules:{required:!0,message:"房间不能为空",trigger:"blur"}}},[n("el-input",{model:{value:e.locationName,callback:function(n){t.$set(e,"locationName",n)},expression:"domain.locationName"}}),t._v(" "),n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(n){return n.preventDefault(),t.removeDomain2(e)}}})],1)})),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm2("dynamicValidateForm")}}},[t._v("提交")]),t._v(" "),n("el-button",{on:{click:t.addDomain2}},[t._v("新增房间")])],1)],2)],1)],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"编辑",visible:t.dialogVisible,width:"60%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-form",{ref:"form",attrs:{"label-width":"80px","label-position":"right"}},[n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"更新前：",prop:"id"}},[n("el-input",{attrs:{disabled:!0},model:{value:t.input1,callback:function(e){t.input1=e},expression:"input1"}})],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"更新为：",prop:"id"}},[n("el-input",{attrs:{size:"medium"},model:{value:t.input2,callback:function(e){t.input2=e},expression:"input2"}})],1)],1)],1)],1),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.endEdit}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.isEdit}},[t._v("确 定")])],1)],1)],1)},a=[],o=(n("20d6"),n("96cf"),n("3b8d")),s=n("5f87"),r=n("814f"),l=n("333d"),c=(n("24b9"),n("ed08")),u=Object(s["a"])(),d={vos:[{uid:"",locationName:"",parentId:""}]},h={vos:[]},m={vos:[]},p={name:"tbbuildinglocation",components:{Pagination:l["a"]},data:function(){return{list:null,total:0,tableKey:0,listLoading:!1,listQuery:{page:1,limit:50,id:"",locationName:"",parentId:""},headersObj:{"LinkAdmin-Token":u},activeName:"first",dialogVisibleEdit:!1,dialogVisibleAdd:!1,dialogVisibleAdd1:!1,dialogVisibleAdd2:!1,dialogVisible:!1,input1:"",input2:"",editObj:{id:"",locationName:"",parent_id:""},editObj1:{},dialogType:"new",entityVO:Object.assign({},d),entityVO1:Object.assign({},h),entityVO2:Object.assign({},m),radio:"",radio1:"",uid:localStorage.getItem("uid"),flag:!1,flag1:!1,defaultProps:{children:"childrens",label:"locationName"},defaultProps1:{children:"childrens",label:"locationName"},data1:[],state1:"",state2:"",state3:"",restaurants:[],restaurants1:[],restaurants2:[],parentId:"",jinXuan:!1,jinXuan1:!1,jinXuan2:!1,jianZhu:localStorage.getItem("deptName")}},watch:{searchDeptName:function(t){this.$refs.serchDeptTree.filter(t)},filterText:function(t){this.$refs.tree.filter(t)}},created:function(){this.getList()},mounted:function(){this.getCompanyDeptList()},methods:{getList:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.listLoading=!0,t.prev=1,t.next=4,Object(r["g"])(this.listQuery);case 4:e=t.sent,this.listLoading=!1,this.list=e.result.rows,this.total=e.result.records,console.log(this.list),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](1),this.listLoading=!1;case 14:case"end":return t.stop()}}),t,this,[[1,11]])})));function e(){return t.apply(this,arguments)}return e}(),getCompanyDeptList:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(r["c"])(this.uid);case 3:e=t.sent,this.data=e.result,this.data1=e.result,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(){return t.apply(this,arguments)}return e}(),filterNode:function(t,e){return!t||-1!==e.locationName.indexOf(t)},xuan:function(t){console.log(t),this.filterText=t.locationName,this.flag1=!1,this.entityVO.vos[0].parentId=t.id},handleNodeClick:function(t){console.log(t)},handleSearch:function(){this.getList()},handleEdit:function(t){this.dialogVisibleEdit=!0,this.entityVO.vos[0]=Object(c["c"])(t.row)},handleAdd:function(t){this.dialogVisibleAdd=!0,this.state1="",this.state2="",this.state3="",this.entityVO.vos=[]},handleAdd1:function(t){this.dialogVisibleAdd1=!0,this.state1="",this.state2="",this.state3="",this.entityVO1.vos=[]},end:function(){this.state2="",this.state3=""},end1:function(){this.state2="",this.state3="",this.jinXuan=!1},end2:function(){this.state2="",this.state3="",this.jinXuan1=!1,this.jinXuan2=!1},handleAdd2:function(t){this.dialogVisibleAdd2=!0,this.state1="",this.state2="",this.state3="",this.entityVO2.vos=[]},confirmTbbuildinglocationEdit:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["f"])(this.entityVO);case 2:e=t.sent,n=e.code,2e4==n&&(this.$message({showClose:!0,message:"编辑成功",type:"success"}),this.dialogVisibleEdit=!1,this.getList());case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),confirmTbbuildinglocationAdd:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.entityVO.vos[0].uid=localStorage.getItem("uid"),t.next=3,Object(r["d"])(e);case 3:n=t.sent,i=n.code,2e4==i&&(this.$message({showClose:!0,message:"新增成功",type:"success"}),this.dialogVisibleAdd=!1,this.getCompanyDeptList());case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),handleDelete:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var n,i,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=this.$createElement,i={id:e},this.$msgbox({title:"删除消息",message:n("p",null,[n("span",null,"确定要删除 "),n("i",{style:"color: teal"},"这条记录吗?"),n("i",{style:"color:#fc4c4c"},"它下面可能会有其他数据")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,n,o){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log(e,n),"confirm"!==e){t.next=8;break}return t.next=4,Object(r["e"])(i);case 4:s=t.sent,2e4==s.code&&o(),t.next=10;break;case 8:o(),a.getCompanyDeptList();case 10:case"end":return t.stop()}}),t)})));function e(e,n,i){return t.apply(this,arguments)}return e}()}).then((function(t){a.$message({showClose:!0,type:"success",message:"删除成功"}),a.getCompanyDeptList()}));case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),submitForm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;e.confirmTbbuildinglocationAdd(e.entityVO),e.entityVO.vos.locationName="",console.log(e.entityVO)}))},removeDomain:function(t){var e=this.entityVO.vos.indexOf(t);-1!==e&&this.entityVO.vos.splice(e,1)},addDomain:function(){this.entityVO.vos.push({uid:localStorage.getItem("uid"),locationName:"",parentId:""}),console.log(this.entityVO)},querySearch:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,n){var i,a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(r["c"])(this.uid);case 3:for(i=t.sent,this.restaurants=i.result,a=0;a<i.result.length;a++)this.$set(this.restaurants[a],"value",this.restaurants[a].locationName);o=e?this.restaurants.filter(this.createFilter(e)):this.restaurants,console.log(i),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:n(o);case 14:case"end":return t.stop()}}),t,this,[[0,10]])})));function e(e,n){return t.apply(this,arguments)}return e}(),createFilter:function(t){return function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){console.log(t),localStorage.setItem("id",t.id),this.parentId=t.id,this.jinXuan=!0},submitForm1:function(t){var e=this;""==this.state1?this.$message({message:"请选择建筑"}):this.$refs[t].validate((function(t){if(console.log("valid",t),!t)return console.log("error submit!!"),!1;e.confirmTbbuildinglocationAdd(e.entityVO1),console.log(e.entityVO1),e.dialogVisibleAdd1=!1,e.jinXuan=!1}))},removeDomain1:function(t){console.log(t);var e=this.entityVO1.vos.indexOf(t);-1!==e&&this.entityVO1.vos.splice(e,1)},addDomain1:function(){""==this.state1?this.$message({message:"请选择要添加的建筑"}):this.entityVO1.vos.push({uid:localStorage.getItem("uid"),locationName:"",parentId:this.parentId})},querySearch1:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,n){var i,a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(r["c"])(this.uid);case 3:for(i=t.sent,this.restaurants1=i.result,a=0;a<i.result.length;a++)this.$set(this.restaurants1[a],"value",this.restaurants1[a].locationName);o=e?this.restaurants1.filter(this.createFilter1(e)):this.restaurants1,console.log(i),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:n(o);case 14:case"end":return t.stop()}}),t,this,[[0,10]])})));function e(e,n){return t.apply(this,arguments)}return e}(),createFilter1:function(t){return function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}},handleSelect1:function(t){console.log(t),this.restaurants2=t.childrens,this.jinXuan1=!0},querySearch2:function(t,e){console.log(this.restaurants2);for(var n=0;n<this.restaurants2.length;n++)this.$set(this.restaurants2[n],"value",this.restaurants2[n].locationName);var i=t?this.restaurants2.filter(this.createFilter2(t)):this.restaurants2;e(i)},createFilter2:function(t){return function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}},handleSelect2:function(t){console.log(t),localStorage.setItem("floorId",t.id),this.jinXuan2=!0},submitForm2:function(t){var e=this;""==this.state2||""==this.state3?this.$message({message:"请选择建筑和楼层"}):this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;console.log("valid",t),e.confirmTbbuildinglocationAdd(e.entityVO2),console.log(e.entityVO2),e.dialogVisibleAdd2=!1,e.jinXuan=!1,e.jinXuan1=!1,e.jinXuan2=!1}))},removeDomain2:function(t){console.log(t);var e=this.entityVO2.vos.indexOf(t);-1!==e&&this.entityVO2.vos.splice(e,1)},addDomain2:function(){""==this.state2||""==this.state3?this.$message({message:"请选择建筑和楼层"}):this.entityVO2.vos.push({uid:localStorage.getItem("uid"),locationName:"",parentId:localStorage.getItem("floorId")}),console.log(this.entityVO2)},remove:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,n){var i,a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log(e,n),this.handleDelete(n.id),i=e.parent,a=i.data.childrens||i.data,o=a.findIndex((function(t){return t.id===n.id})),a.splice(o,1);case 6:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}(),edit:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.dialogVisible=!0,console.log("node",e),this.input1=n.locationName,console.log("data",n),this.editObj1=n;case 5:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}(),endEdit:function(){this.input2="",this.dialogVisible=!1},isEdit:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(this.editObj1),this.editObj.id=this.editObj1.id,this.editObj.parent_id=this.editObj1.parentId,this.editObj.locationName=this.input2,t.next=6,Object(r["f"])(this.editObj);case 6:e=t.sent,n=e.code,2e4==n&&(this.$message({showClose:!0,message:"编辑成功",type:"success"}),this.dialogVisible=!1,this.input2="",this.getCompanyDeptList());case 9:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),handleClose:function(t){this.$confirm("确认关闭？").then((function(e){t()})).catch((function(t){}))}}},f=p,g=(n("a7f5"),n("2877")),b=Object(g["a"])(f,i,a,!1,null,"dbc2d0ae",null);e["default"]=b.exports},"814f":function(t,e,n){"use strict";n.d(e,"g",(function(){return o})),n.d(e,"f",(function(){return s})),n.d(e,"d",(function(){return r})),n.d(e,"e",(function(){return l})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return u})),n.d(e,"a",(function(){return d}));var i=n("b775"),a=n("7605");function o(t){return Object(a["a"])({url:"/rest/buildingLocation/list",method:"post",data:t})}function s(t){return Object(i["a"])({url:"/rest/tbBuildingLocation/update",method:"post",data:t})}function r(t){return Object(a["a"])({url:"/rest/buildingLocation/add",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/rest/buildingLocation/removeBuildingById",method:"post",data:t})}function c(t){return Object(a["a"])({url:"/rest/buildingLocation/getCompanyDept",method:"get",params:{uid:t}})}function u(){return Object(i["a"])({url:"/rest/tbBuildingLocation/getCompanyBuildingLocation",method:"get"})}function d(t){return Object(a["a"])({url:"/rest/buildingLocation/getBuildingLocationFloor",method:"get",params:{parentId:t}})}},a7f5:function(t,e,n){"use strict";var i=n("276f"),a=n.n(i);a.a}}]);
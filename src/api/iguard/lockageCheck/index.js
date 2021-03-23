import request5 from '../../../../utils/request5' //巡更接口域名
// 新增商户
export function newAdd(data) {
    return request5({
        url: "/rest/shop/add",
        method: "post",
        data
    })
}
// 编辑商户
export function update(data) {
    return request5({
        url: "/rest/shop/edit",
        method: "post",
        data
    })
}
// 获取商户列表
export function getList(data) {
    return request5({
        url: "/rest/shop/list",
        method: "post",
        data
    })
}
// 删除商户
export function remove(data) {
    return request5({
        url: "/rest/shop/remove",
        method: "post",
        data
    })
}
// 新增业态
export function newAddFormat(data) {
    return request5({
        url: "/rest/retailFormat/add",
        method: "post",
        data
    })
}
// 编辑业态
export function updateFormat(data) {
    return request5({
        url: "/rest/retailFormat/edit",
        method: "post",
        data
    })
}
// 业态list
export function getListFormat(data) {
    return request5({
        url: "/rest/retailFormat/list",
        method: "post",
        data
    })
}
// 删除业态
export function removeFormat(data) {
    return request5({
        url: "/rest/retailFormat/remove",
        method: "post",
        data
    })
}
// 新增商户账号
export function newAddManage(data) {
    return request5({
        url: "/rest/ShopManageManage/add",
        method: "post",
        data
    })
}
// 编辑商户账号
export function updateManage(data) {
    return request5({
        url: "/rest/ShopManageManage/edit",
        method: "post",
        data
    })
}
// 获取商户账号list
export function getListManage(data) {
    return request5({
        url: "/rest/ShopManageManage/list",
        method: "post",
        data
    })
}
// 删除商户账号
export function removeManage(data) {
    return request5({
        url: "/rest/ShopManageManage/remove",
        method: "post",
        data
    })
}
// 商户账号启用/禁用
export function passIfManage(data) {
    return request5({
        url: "/rest/ShopManageManage/passIf",
        method: "post",
        data
    })
}
// 新增自检任务
export function addCheckTask(data) {
    return request5({
        url: "/rest/checkTask/add",
        method: "post",
        data
    })
}
// 编辑自检任务
export function updateCheckTask(data) {
    return request5({
        url: "/rest/checkTask/edit",
        method: "post",
        data
    })
}
// 获取自检任务list
export function listCheckTask(data) {
    return request5({
        url: "/rest/checkTask/list",
        method: "post",
        data
    })
}
// 删除自检任务
export function removeCheckTask(data) {
    return request5({
        url: "/rest/checkTask/remove",
        method: "post",
        data
    })
}
// 新增检查项
export function addCheckItem(data) {
    return request5({
        url: "/rest/checkItem/add",
        method: "post",
        data
    })
}
// 编辑检查项
export function updateCheckItem(data) {
    return request5({
        url: "/rest/checkItem/edit",
        method: "post",
        data
    })
}
// 检查项list
export function listCheckItem(data) {
    return request5({
        url: "/rest/checkItem/list",
        method: "post",
        data
    })
}
// 删除检查项
export function removeCheckItem(data) {
    return request5({
        url: "/rest/checkItem/remove",
        method: "post",
        data
    })
}
// 查询所有工作组
export function getGroups(data) {
    return request5({
        url: "/rest/checkTask/getGroups",
        method: "post",
        data
    })
}
// 自检明细报表
export function checkDetailReport(data) {
    return request5({
        url: "/rest/reportCheck/checkDetailReport",
        method: "post",
        data
    })
}
// 自检统计报表
export function checkStatisticsReport(data) {
    return request5({
        url: "/rest/reportCheck/checkStatisticsReport",
        method: "post",
        data
    })
}
// 自检统计报表
export function getDetailsByParamById(detail_id) {
    return request5({
        url: "/rest/checkTask/getDetailsByParamById",
        method: "get",
        params: {
            detail_id
        }
    })
}
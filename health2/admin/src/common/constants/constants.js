/*
 * @Author: FangXiaoHui
 * @Date:   2018-12-10 11:00:07
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-01-18 15:48:14
 */

// 组织管理列表筛选项
export const ORGANIZESELECT = [
  {
    value: 3,
    label: '全部'
  },{
    value: 1,
    label: '启用'
  },{
    value: 0,
    label: '禁用'
  },{
    value: 2,
    label: '草稿'
  }
]

// 组织管理列表table
export const ORGANIZETABLECOLUMN = [{
  prop: 'organizationName',
  label: '组织全名'
}, {
  prop: 'managerName',
  label: '组织管理员'
}, {
  prop: 'industryType',
  label: '所属行业'
}, {
  prop: 'peopleNum',
  label: '人员规模'
}, {
  prop: 'startDate',
  label: '有效时长'
}, {
  prop: 'createTime',
  label: '创建日期'
}, {
  prop: 'status',
  label: '状态'
}, {
  prop: 'opt',
  label: '操作'
}]

// 组织管理创建组织步骤条
export const ORGANIZESTEPS = ['填写组织信息', '填写管理员信息', '应用授权', '完成']
// 应用管理创建应用步骤条
export const APPLICATIONSTEPS = ['填写应用信息', '应用授权', '完成']

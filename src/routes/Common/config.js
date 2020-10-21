/*
 * @Descripttion : 公用模块路由
 * @Author       : wuhaidong
 * @Date         : 2020-01-07 11:46:40
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-21 17:24:16
 */

const ROUTE_PREFIX = '/account'
const ROUTES = {
  login: { path: '/sign/login', title: '登录' },
  systems: { path: '/sign/systems', title: '系统列表' },
  page403: { path: '/403', title: '无访问权限' },
  page500: { path: '/500', title: '网络错误' },
  myApply: { path: `${ROUTE_PREFIX}/myApply`, title: '我发出的审批' },
  myCheck: { path: `${ROUTE_PREFIX}/myCheck`, title: '我收到的审批' },
  willCheck: { path: `${ROUTE_PREFIX}/willCheck`, title: '待我审批' },
  setting: { path: `${ROUTE_PREFIX}/setting`, title: '用户设置' },
}

const ACCOUNT_MENU = {
  personalAffairsTopMenu: {
    title: '个人中心',
    icon: 'account-center',
    path: '/personalAffairs',
    parent: '0',
    key: 'personalAffairs_0',
    id: 'personalAffairs_0',
  },
  personalAffairsSubMenu: [
    {
      title: '我发出的审批',
      name: '我发出的审批',
      icon: 'sendapproval',
      key: 'personalAffairs_sendapproval',
      id: 'personalAffairs_sendapproval',
      parent: 'personalAffairs_0',
      path: '/account/myApply',
    },
    {
      title: '我收到的审批',
      name: '我收到的审批',
      icon: 'acceptapproval',
      key: 'personalAffairs_acceptapproval',
      id: 'personalAffairs_acceptapproval',
      parent: 'personalAffairs_0',
      path: '/account/myCheck',
    },
    {
      title: '待我审批',
      name: '待我审批',
      icon: 'willapproval',
      key: 'personalAffairs_willapproval',
      id: 'personalAffairs_willapproval',
      parent: 'personalAffairs_0',
      path: '/account/willCheck',
    },
    {
      title: '用户设置',
      name: '用户设置',
      icon: 'userSetting',
      key: 'personalAffairs_setting',
      id: 'personalAffairs_setting',
      parent: 'personalAffairs_0',
      path: '/account/setting',
    },
  ],
}

export { ROUTE_PREFIX as routePrefix, ROUTES as routes, ACCOUNT_MENU as accountMenu }

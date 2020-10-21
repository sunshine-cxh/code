/*
 * @Descripttion : 租户后台子系统配置文件
 * @Author       : wuhaidong
 * @Date         : 2020-04-08 09:13:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-07 14:13:38
 */

const API_PREFIX = '/iams'
const ROUTE_PREFIX = '/ieams'
const ROUTES = {
  user: {
    path: `${ROUTE_PREFIX}/user`,
    title: '用户管理',
  },
  role: {
    path: `${ROUTE_PREFIX}/role`,
    title: '系统角色管理',
  },
  organization: {
    path: `${ROUTE_PREFIX}/organization`,
    title: '组织机构管理',
  },
}

export { API_PREFIX as apiPrefix, ROUTE_PREFIX as routesPrefix, ROUTES as routes }

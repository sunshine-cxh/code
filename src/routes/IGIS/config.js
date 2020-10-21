/*
 * @Descripttion : 子系统配置文件
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:13:17
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-28 08:59:48
 */

const API_PREFIX = '/igis/layer'
const ROUTE_PREFIX = '/igis'
const ROUTES = {
  home: {
    path: `${ROUTE_PREFIX}/home`,
    title: '首页',
  },
  backstage: {
    path: `${ROUTE_PREFIX}/backstage`,
    title: 'GIS后台管理系统',
  },
}

export {
  API_PREFIX as apiPrefix,
  ROUTE_PREFIX as routePrefix,
  ROUTES as routes,
}

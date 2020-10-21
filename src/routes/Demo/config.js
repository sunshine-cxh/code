/*
 * @Descripttion : 子系统配置文件
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:13:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-28 09:04:47
 */

const API_PREFIX = ''
const ROUTE_PREFIX = '/operation'
const ROUTES = {
  home: {
    path: `${ROUTE_PREFIX}/home`,
    title: '首页',
  },
}

export {
  API_PREFIX as apiPrefix,
  ROUTE_PREFIX as routePrefix,
  ROUTES as routes,
}

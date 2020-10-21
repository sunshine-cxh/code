/*
 * @Descripttion : 智能输配管理系统
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-10 11:05:25
 */

const API_PREFIX = ''
const ROUTE_PREFIX = '/gisDemo'
const ROUTES = {
  openlayer: {
    title: `openlayer`,
    path: `${ROUTE_PREFIX}/openlayer`,
  },
  OpenlayerWithEchart:{
    title: `OpenlayerWithEchart`,
    path: `${ROUTE_PREFIX}/OpenlayerWithEchart`,
  }
}

export { API_PREFIX as apiPrefix, ROUTE_PREFIX as routePrefix, ROUTES as routes }

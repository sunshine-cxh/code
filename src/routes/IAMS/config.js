/*
 * @Descripttion : 子系统配置文件
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:13:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-30 15:00:31
 */

const API_PREFIX = '/iams'
const ROUTE_PREFIX = '/iams'
const ROUTES = {
  home: {
    path: `${ROUTE_PREFIX}/home`,
    title: '系统主页',
  },
  user: {
    path: `${ROUTE_PREFIX}/user`,
    title: '用户管理',
  },
  client: {
    path: `${ROUTE_PREFIX}/client`,
    title: '客户端管理',
  },
  role: {
    path: `${ROUTE_PREFIX}/role`,
    title: '系统角色管理',
  },
  masterDataItem: {
    path: `${ROUTE_PREFIX}/masterDataItem`,
    title: '数据字典',
  },
  masterData: {
    path: `${ROUTE_PREFIX}/masterData`,
    title: '数据字典类别',
  },
  enterprise: {
    path: `${ROUTE_PREFIX}/enterprise`,
    title: '企业管理',
  },
  apiResource: {
    path: `${ROUTE_PREFIX}/apiResource`,
    title: 'ApiResource管理',
  },
  organization: {
    path: `${ROUTE_PREFIX}/organization`,
    title: '组织机构管理',
  },
  module: {
    path: `${ROUTE_PREFIX}/module`,
    title: '系统模块管理',
  },
  codeRule: {
    path: `${ROUTE_PREFIX}/codeRule`,
    title: '编码规则管理',
  },
  codeRuleAdd: {
    title: '新增编码规则',
    path: `${ROUTE_PREFIX}/codeRule/subAdd`,
  },
}

export {
  API_PREFIX as apiPrefix,
  ROUTE_PREFIX as routePrefix,
  ROUTES as routes,
};

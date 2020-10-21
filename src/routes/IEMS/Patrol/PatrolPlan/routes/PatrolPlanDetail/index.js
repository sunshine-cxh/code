/*
 * @Descripttion : 巡检计划详情页
 * @Author       : caojiarong
 * @Date         : 2020-06-08 14:23:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-09 17:31:05
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.patrolPlanDetail.path,
  title: routes.patrolPlanDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)
/*
 * @Descripttion : 巡检计划添加入口
 * @Author       : caojiarong
 * @Date         : 2020-06-08 14:23:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-09 09:52:02
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.patrolPlanAdd.path,
  title: routes.patrolPlanAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

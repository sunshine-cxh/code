/*
 * @Descripttion : 巡检计划路由引进
 * @Author       : caojiarong
 * @Date         : 2020-06-08 17:01:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-09 08:54:40
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import PatrolPlanAdd from './routes/PatrolPlanAdd'
import PatrolPlanDetail from './routes/PatrolPlanDetail'

const routesConfig = app => ({
  path: routes.patrolPlan.path,
  title: routes.patrolPlan.title,
  component: dynamicWrapper(app, [import('./model'), import('./routes/PatrolPlanDetail/model'), import('./routes/PatrolPlanAdd/model')], () => import('./components')),
  childRoutes: [
    PatrolPlanAdd(app),
    PatrolPlanDetail(app)
  ]
})

export default app => createRoute(app, routesConfig)

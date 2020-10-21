/*
 * @Descripttion : 巡检管理路由引进
 * @Author       : caojiarong
 * @Date         : 2020-06-02 11:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 10:03:04
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import PatrolStandardAdd from './routes/PatrolStandardAdd'

const routesConfig = (app) => ({
  path: routes.patrolStandard.path,
  title: routes.patrolStandard.title,
  component: dynamicWrapper(
    app,
    [import('./model'), import('./routes/PatrolStandardAdd/model')],
    () => import('./components')
  ),
  childRoutes: [PatrolStandardAdd(app)],
})

export default (app) => createRoute(app, routesConfig)

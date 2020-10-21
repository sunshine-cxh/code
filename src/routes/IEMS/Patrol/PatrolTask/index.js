/*
 * @Descripttion : 巡检任务
 * @Author       : caojiarong
 * @Date         : 2020-06-08 11:13:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-08 16:08:40
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import PatrolTaskDetail from './routes/PatrolTaskDetail'
import PatrolTaskOperate from './routes/PatrolTaskOperate'
import PatrolTaskSubmit from './routes/PatrolTaskSubmit'
const routesConfig = app => ({
  path: routes.patrolTask.path,
  title: routes.patrolTask.title,
  component: dynamicWrapper(app, [import('./model'), import('./routes/PatrolTaskDetail/model'), import('./routes/PatrolTaskOperate/model'), import('./routes/PatrolTaskSubmit/model')], () => import('./components')),
  childRoutes: [PatrolTaskDetail(app), PatrolTaskOperate(app), PatrolTaskSubmit(app)]
})

export default app => createRoute(app, routesConfig)
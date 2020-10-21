/*
 * @Descripttion : 报修工单路由引进
 * @Author       : caojiarong
 * @Date         : 2020-06-17 10:01:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-17 09:42:58
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import RepairOrderAdd from './routes/RepairOrderAdd'
import RepairOrderDetail from './routes/RepairOrderDetail'

const routesConfig = app => ({
  path: routes.repairOrder.path,
  title: routes.repairOrder.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    RepairOrderAdd(app),
    RepairOrderDetail(app)
  ]
})

export default app => createRoute(app, routesConfig)

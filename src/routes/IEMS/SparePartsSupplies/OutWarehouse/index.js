/*
 * @Descripttion : 出库管理路由引进
 * @Author       : caojiarong
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-18 11:54:10
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import OutWarehoseAdd from './routes/SubOutWarehouseAdd'
import OutWarehouseDetail from './routes/SubOutWarehouseDetail'

const routesConfig = app => ({
  path: routes.outWarehouse.path,
  title: routes.outWarehouse.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    OutWarehoseAdd(app),
    OutWarehouseDetail(app)
  ]
})


export default app => createRoute(app, routesConfig)

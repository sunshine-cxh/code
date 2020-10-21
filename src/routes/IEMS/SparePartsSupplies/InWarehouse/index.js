/*
 * @Descripttion : 入库管理路由引进
 * @Author       : caojiarong
 * @Date         : 2020-05-14 13:01:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-18 11:49:29
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import WarehoseAdd from './routes/SubWarehouseAdd'
import WarehouseDetail from './routes/SubWarehouseDetail'

const routesConfig = app => ({
  path: routes.inWarehouse.path,
  title: routes.inWarehouse.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    WarehoseAdd(app),
    WarehouseDetail(app)
  ]
})


export default app => createRoute(app, routesConfig)

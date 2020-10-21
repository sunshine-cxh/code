/*
 * @Descripttion : 仓库盘点路由引进
 * @Author       : caojiarong
 * @Date         : 2020-05-25 13:01:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-25 14:57:53
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import WarehouseInventoryAdd from './routes/SubWarehouseInventoryAdd'
import WarehouseInventoryDetail from './routes/SubWarehouseInventoryDetail'

const routesConfig = app => ({
  path: routes.warehouseInventory.path,
  title: routes.warehouseInventory.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    WarehouseInventoryAdd(app),
    WarehouseInventoryDetail(app)
  ]
})


export default app => createRoute(app, routesConfig)

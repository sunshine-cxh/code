/*
 * @Descripttion : 库存台账入口
 * @Author       : caojiarong
 * @Date         : 2020-05-22 11:13:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-29 10:45:24
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import inventoryLedgerDetail from './routes/SubInventoryLedgerDetail'
const routesConfig = app => ({
  path: routes.inventoryLedger.path,
  title: routes.inventoryLedger.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    inventoryLedgerDetail(app)
  ]
})

export default app => createRoute(app, routesConfig)
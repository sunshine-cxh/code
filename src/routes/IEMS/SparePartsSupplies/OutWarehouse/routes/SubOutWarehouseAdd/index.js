/*
 * @Descripttion : 出库管理入库文件
 * @Author       : caojiarong
 * @Date         : 2020-05-08 14:23:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-25 11:33:04
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.outWarehouseAdd.path,
  title: routes.outWarehouseAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

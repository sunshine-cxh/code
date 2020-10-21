/*
 * @Descripttion : 仓库盘点详情页
 * @Author       : caojiarong
 * @Date         : 2020-05-25 11:23:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-25 14:44:00
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.warehouseInventoryDetail.path,
  title: routes.warehouseInventoryDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

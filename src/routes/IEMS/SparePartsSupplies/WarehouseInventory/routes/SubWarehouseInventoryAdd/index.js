/*
 * @Descripttion : Do not edit
 * @Author       : caojiarong
 * @Date         : 2020-05-08 14:23:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-25 14:36:22
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.warehouseInventoryAdd.path,
  title: routes.warehouseInventoryAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

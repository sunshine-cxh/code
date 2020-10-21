/*
 * @Descripttion : Do not edit
 * @Author       : caojiarong
 * @Date         : 2020-05-08 14:23:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-25 11:33:27
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.outWarehouseDetail.path,
  title: routes.outWarehouseDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

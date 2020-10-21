/*
 * @Descripttion : 报修工单详情页
 * @Author       : caojiarong
 * @Date         : 2020-06-17 14:23:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-17 14:16:51
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.repairOrderDetail.path,
  title: routes.repairOrderDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)
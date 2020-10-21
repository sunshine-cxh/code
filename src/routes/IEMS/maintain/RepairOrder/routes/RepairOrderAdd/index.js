/*
 * @Descripttion : 报修工单添加入口
 * @Author       : caojiarong
 * @Date         : 2020-06-17 14:23:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-17 10:58:26
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.repairOrderAdd.path,
  title: routes.repairOrderAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

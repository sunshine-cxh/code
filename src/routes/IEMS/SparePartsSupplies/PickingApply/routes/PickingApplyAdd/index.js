/*
 * @Descripttion : 领料申请添加入口
 * @Author       : caojiarong
 * @Date         : 2020-05-19 14:23:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-25 11:34:15
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.pickingApplyAdd.path,
  title: routes.pickingApplyAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

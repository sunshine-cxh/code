/*
 * @Descripttion : 领料申请详情页
 * @Author       : caojiarong
 * @Date         : 2020-05-19 14:23:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-25 11:33:51
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.pickingApplyDetail.path,
  title: routes.pickingApplyDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

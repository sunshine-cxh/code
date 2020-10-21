/*
 * @Descripttion : 重点用户审批详情页
 * @Author       : caojiarong
 * @Date         : 2020-08-31 14:12:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-25 13:59:27
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../../config'

const routesConfig = (app) => ({
  path: routes.subApprovalDetail.path,
  title: routes.subApprovalDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

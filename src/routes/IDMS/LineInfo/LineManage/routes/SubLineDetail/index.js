/*
 * @Descripttion : 路线详情页
 * @Author       : caojiarong
 * @Date         : 2020-08-18 14:12:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-17 15:49:28
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.subLineDetail.path,
  title: routes.subLineDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

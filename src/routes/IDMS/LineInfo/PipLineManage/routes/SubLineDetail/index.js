/*
 * @Descripttion : 管段详情页
 * @Author       : caojiarong
 * @Date         : 2020-08-18 14:12:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-20 16:17:48
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.subPipLineDetail.path,
  title: routes.subPipLineDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

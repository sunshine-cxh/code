/*
 * @Descripttion : 路线新增页
 * @Author       : caojiarong
 * @Date         : 2020-08-17 14:12:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-20 16:17:31
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.subPipLineAdd.path,
  title: routes.subPipLineAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

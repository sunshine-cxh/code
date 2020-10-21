/*
 * @Descripttion : 路线新增页
 * @Author       : caojiarong
 * @Date         : 2020-08-17 14:12:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-17 15:49:28
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.subLineAdd.path,
  title: routes.subLineAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

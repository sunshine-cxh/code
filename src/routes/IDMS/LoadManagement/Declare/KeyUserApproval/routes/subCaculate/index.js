/*
 * @Descripttion : 模型新增页
 * @Author       : caojiarong
 * @Date         : 2020-08--25 14:12:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-28 15:48:18
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../../config'

const routesConfig = (app) => ({
  path: routes.subCaculate.path,
  title: routes.subCaculate.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

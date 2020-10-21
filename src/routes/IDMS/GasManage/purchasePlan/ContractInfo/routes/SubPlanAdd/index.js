/*
 * @Descripttion : 合同新增页
 * @Author       : caojiarong
 * @Date         : 2020-09-01 14:12:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-01 15:59:26
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../../config'

const routesConfig = (app) => ({
  path: routes.subContractAdd.path,
  title: routes.subContractAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

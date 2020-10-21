/*
 * @Descripttion : 编码规则 - 新增 - model
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 16:44:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-08 10:42:49
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.codeRuleAdd.path,
  title: routes.codeRuleAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

/*
 * @Descripttion : 编码规则
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 15:35:15
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-07 15:30:42
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import SubAdd from './routes/SubAdd'

const routesConfig = (app) => ({
  path: routes.codeRule.path,
  title: routes.codeRule.title,
  component: dynamicWrapper(app, [import('./model')], () =>
    import('./components')
  ),
  childRoutes: [SubAdd(app)],
})

export default (app) => createRoute(app, routesConfig)

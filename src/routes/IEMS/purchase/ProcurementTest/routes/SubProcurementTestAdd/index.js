/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-16 14:56:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-08 16:45:15
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.procurementTestAdd.path,
  title: routes.procurementTestAdd.title,
  component: dynamicWrapper(
    app,
    [import('./model/index')],
    () => import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

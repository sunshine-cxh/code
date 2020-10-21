/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-08 17:03:23
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.procurementApplyConsumables.path,
  title: routes.procurementApplyConsumables.title,
  component: dynamicWrapper(
    app,
    [import('./model')],
    () => import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

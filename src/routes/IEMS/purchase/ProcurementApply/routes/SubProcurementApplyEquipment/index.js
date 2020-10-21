/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:12:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-08 17:05:43
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.procurementApplyEquipment.path,
  title: routes.procurementApplyEquipment.title,
  component: dynamicWrapper(
    app,
    [import('./model/index.js')],
    () => import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:47:31
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-08 17:05:06
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.procurementApplyDetail.path,
  title: routes.procurementApplyDetail.title,
  component: dynamicWrapper(
    app,
    [import('./model/index.js')],
    () => import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

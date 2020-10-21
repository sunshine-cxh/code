/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:47:31
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-05 08:41:29
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.procurementTestDetail.path,
  title: routes.procurementTestDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () =>
    import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

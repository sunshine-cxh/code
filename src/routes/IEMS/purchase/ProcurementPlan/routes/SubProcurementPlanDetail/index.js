/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:47:31
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-10 08:40:29
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.procurementPlanDetail.path,
  title: routes.procurementPlanDetail.title,
  component: dynamicWrapper(
    app,
    [
      import('./model/index.js'),
      import('../SubProcurementPlanAdd/model/index.js'),
      // import('../../../../../SubAdmin/PersonalAffairs/MyApply/model/index.js'),
      // import('../../../../../SubAdmin/PersonalAffairs/myCheck/model/index.js'),
    ],
    () => import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

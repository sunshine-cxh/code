/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-14 13:33:52
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-04 19:42:24
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

import SubProcurementApplyConsumables from './routes/SubProcurementApplyConsumables'
import SubProcurementApplyEquipment from './routes/SubProcurementApplyEquipment'
import SubProcurementApplyDetail from './routes/SubProcurementApplyDetail'
const routesConfig = (app) => ({
  path: routes.procurementApply.path,
  title: routes.procurementApply.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/SubProcurementApplyDetail/model'),
      import('./routes/SubProcurementApplyConsumables/model'),
      import('./routes/SubProcurementApplyEquipment/model'),
    ],
    () => import('./components')
  ),
  childRoutes: [
    SubProcurementApplyEquipment(app),
    SubProcurementApplyConsumables(app),
    SubProcurementApplyDetail(app),
  ],
})

export default (app) => createRoute(app, routesConfig)

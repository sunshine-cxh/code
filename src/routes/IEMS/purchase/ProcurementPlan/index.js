/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-04 20:03:15
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import SubProcurementPlanAdd from './routes/SubProcurementPlanAdd'
import SubProcurementPlanDetail from './routes/SubProcurementPlanDetail'

const routesConfig = (app) => ({
  path: routes.procurementPlan.path,
  title: routes.procurementPlan.title,
  component: dynamicWrapper(
    app,
    [import('./model'), import('./routes/SubProcurementPlanDetail/model/index.js'), import('./routes/SubProcurementPlanAdd/model/index.js')],
    () => import('./components')
  ),
  childRoutes: [SubProcurementPlanAdd(app), SubProcurementPlanDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

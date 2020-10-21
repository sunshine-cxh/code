/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-16 14:09:14
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-08 16:45:06
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import SubProcurementTestAdd from './routes/SubProcurementTestAdd'
import SubProcurementTestDetail from './routes/SubProcurementTestDetail'

const routesConfig = (app) => ({
  path: routes.procurementTest.path,
  title: routes.procurementTest.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/SubProcurementTestDetail/model/index.js')
    ],
    () => import('./components')
  ),
  childRoutes: [SubProcurementTestAdd(app), SubProcurementTestDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

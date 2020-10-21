/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 14:31:32
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import SubSellDetail from './routes/SubSellDetail'
import SubSellAdd from './routes/SubSellAdd'

const routesConfig = (app) => ({
  path: routes.sell.path,
  title: routes.sell.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/SubSellDetail/model/index.js'),
      import('./routes/SubSellAdd/model/index.js'),
    ],
    () => import('./components')
  ),
  childRoutes: [SubSellAdd(app), SubSellDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

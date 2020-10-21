/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 11:13:17
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-28 15:36:46
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import substandingBookAdd from './routes/SubStandingBookAdd'
import substandingBookDetail from './routes/SubStandingBookDetail'
const routesConfig = (app) => ({
  path: routes.standingBook.path,
  title: routes.standingBook.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/SubStandingBookAdd/model/index.js'),
      import('./routes/SubStandingBookDetail/model/index.js'),
    ],
    () => import('./components')
  ),
  childRoutes: [substandingBookAdd(app), substandingBookDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-01 14:14:59
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import SubExternalDetail from './routes/SubExternalDetail'
import SubExternalAdd from './routes/SubExternalAdd'

const routesConfig = (app) => ({
  path: routes.external.path,
  title: routes.external.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/SubExternalDetail/model/index.js'),
      import('./routes/SubExternalAdd/model/index.js'),
    ],
    () => import('./components')
  ),
  childRoutes: [SubExternalAdd(app), SubExternalDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

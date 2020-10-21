/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 11:17:18
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-10 09:39:23
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import SubMoveAdd from './routes/SubMoveAdd'
import SubMoveDetail from './routes/SubMoveDetail'
const routesConfig = (app) => ({
  path: routes.move.path,
  title: routes.move.title,
  component: dynamicWrapper(app, [import('./model'), import('./routes/SubMoveAdd/model'), import('./routes/SubMoveDetail/model')], () =>
    import('./components')
  ),
  childRoutes: [SubMoveAdd(app), SubMoveDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

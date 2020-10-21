/*
 * @Descripttion : 养护任务
 * @Author       : hezihua
 * @Date         : 2020-06-08 11:13:17
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-01 18:38:20
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import CuringsTaskDetail from './routes/CuringsTaskDetail'
import CuringsTaskOperate from './routes/CuringsTaskOperate'
const routesConfig = (app) => ({
  path: routes.curingsTask.path,
  title: routes.curingsTask.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/CuringsTaskDetail/model'),
      import('./routes/CuringsTaskOperate/model'),
    ],
    () => import('./components')
  ),
  childRoutes: [CuringsTaskDetail(app), CuringsTaskOperate(app)],
})

export default (app) => createRoute(app, routesConfig)

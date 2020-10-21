/*
 * @Descripttion :养护管理路由引进
 * @Author       : hezihua
 * @Date         : 2020-06-02 11:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 11:04:25
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import CuringsStandardAdd from './routes/CuringsStandardAdd'

const routesConfig = (app) => ({
  path: routes.curingsStandard.path,
  title: routes.curingsStandard.title,
  component: dynamicWrapper(
    app,
    [import('./model'), import('./routes/CuringsStandardAdd/model')],
    () => import('./components')
  ),
  childRoutes: [CuringsStandardAdd(app)],
})

export default (app) => createRoute(app, routesConfig)

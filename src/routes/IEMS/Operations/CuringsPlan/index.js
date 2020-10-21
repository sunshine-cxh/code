/*
 * @Descripttion : 养护计划路由引进
 * @Author       : hezihua
 * @Date         : 2020-06-08 17:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 10:51:56
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import CuringsPlanAdd from './routes/CuringsPlanAdd'
import CuringsPlanDetail from './routes/CuringsPlanDetail'

const routesConfig = (app) => ({
  path: routes.curingsPlan.path,
  title: routes.curingsPlan.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/CuringsPlanDetail/model'),
      import('./routes/CuringsPlanAdd/model'),
    ],
    () => import('./components')
  ),
  childRoutes: [CuringsPlanAdd(app), CuringsPlanDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-27 18:46:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-29 16:15:30
 */ 
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import GasUserAdd from './routes/GasUserAdd'
const routesConfig = app => ({
  path: routes.gasuser.path,
  title: routes.gasuser.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [GasUserAdd(app)],
});

export default app => createRoute(app, routesConfig)
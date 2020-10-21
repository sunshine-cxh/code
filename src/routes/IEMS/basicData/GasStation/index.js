/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-27 18:46:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-29 10:10:28
 */ 
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import GasstationAdd from './routes/GasStationAdd'

const routesConfig = app => ({
  path: routes.gasStation.path,
  title: routes.gasStation.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [GasstationAdd(app)],
});

export default app => createRoute(app, routesConfig)
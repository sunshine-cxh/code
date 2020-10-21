/*
 * @Descripttion : 
 * @Author       : caojiarong
 * @Date         : 2020-08-13 16:17:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-13 16:20:32
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.realtimeRtmp.path,
  title: routes.realtimeRtmp.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [],
})

export default (app) => createRoute(app, routesConfig)

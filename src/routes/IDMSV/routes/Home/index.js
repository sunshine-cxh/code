/*
 * @Descripttion : 
 * @Author       : caojiarong
 * @Date         : 2020-07-22 16:23:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-30 08:53:51
 */ 
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.home.path,
  title: routes.home.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [],
})

export default (app) => createRoute(app, routesConfig)

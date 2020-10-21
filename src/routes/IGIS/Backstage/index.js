/*
 * @Descripttion : 
 * @Author       : xuqiufeng
 * @Date         : 2020-07-27 10:24:36
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-27 10:55:27
 */ 
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../config'

const routesConfig = (app) => ({
  path: routes.backstage.path,
  title: routes.backstage.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [],
})

export default (app) => createRoute(app, routesConfig)

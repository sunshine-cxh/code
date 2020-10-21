/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-29 09:53:58
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-29 09:59:54
 */ 
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.gasStationAdd.path,
  title: routes.gasStationAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)
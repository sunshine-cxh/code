/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-28 15:28:15
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-01 15:29:24
 */ 
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.curingsTaskOperate.path,
  title: routes.curingsTaskOperate.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)
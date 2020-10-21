/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-25 10:53:12
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-25 11:16:28
 */ 
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.warehouse.path,
  title: routes.warehouse.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)




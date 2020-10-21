/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:35:03
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-25 11:14:57
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.location.path,
  title: routes.location.title,
  component: dynamicWrapper(app, [import("./model")], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

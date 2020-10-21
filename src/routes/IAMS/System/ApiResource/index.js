/*
 * @Descripttion : ApiResource
 * @Author       : wuhaidong
 * @Date         : 2020-01-12 14:48:30
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-26 10:37:04
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.apiResource.path,
  title: routes.apiResource.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

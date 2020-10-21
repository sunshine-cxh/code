/*
 * @Descripttion : 客户端管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-26 10:37:11
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.client.path,
  title: routes.client.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

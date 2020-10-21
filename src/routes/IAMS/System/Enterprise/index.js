/*
 * @Descripttion : 企业管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 11:20:33
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-25 16:05:18
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.enterprise.path,
  title: routes.enterprise.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

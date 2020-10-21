/*
 * @Descripttion : 角色管理-创建路由
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-25 15:29:35
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.role.path,
  title: routes.role.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

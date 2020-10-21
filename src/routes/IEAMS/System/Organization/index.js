/*
 * @Descripttion : 组织管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-25 15:54:38
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.organization.path,
  title: routes.organization.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')
  )
})

export default app => createRoute(app, routesConfig)


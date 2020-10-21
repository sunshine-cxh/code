/*
 * @Descripttion : 系统模块管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-13 10:08:43
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-25 15:56:52
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.module.path,
  title: routes.module.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')
  )
})

export default app => createRoute(app, routesConfig)


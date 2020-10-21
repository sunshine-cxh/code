/*
 * @Descripttion : 调压站信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 11:35:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 09:37:04
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.pressureStation.path,
  title: routes.pressureStation.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

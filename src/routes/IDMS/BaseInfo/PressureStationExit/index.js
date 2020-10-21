/*
 * @Descripttion : 调压站出口信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 11:55:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 10:15:43
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.pressureStationExit.path,
  title: routes.pressureStationExit.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

/*
 * @Descripttion : 门站出口信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 14:05:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 11:10:28
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.gateStationExit.path,
  title: routes.gateStationExit.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

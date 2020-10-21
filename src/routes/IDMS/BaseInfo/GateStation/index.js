/*
 * @Descripttion : 门站信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 10:35:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 09:40:09
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.gateStation.path,
  title: routes.gateStation.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

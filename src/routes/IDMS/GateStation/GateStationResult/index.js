/*
 * @Descripttion : 门站运算输出
 * @Author       : caojiarong
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 15:54:11
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.gateStationResult.path,
  title: routes.gateStationResult.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

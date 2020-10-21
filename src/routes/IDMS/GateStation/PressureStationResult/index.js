/*
 * @Descripttion : 调压站运算输出
 * @Author       : caojiarong
 * @Date         : 2020-07-16 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-16 18:03:41
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.pressureStationResult.path,
  title: routes.pressureStationResult.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

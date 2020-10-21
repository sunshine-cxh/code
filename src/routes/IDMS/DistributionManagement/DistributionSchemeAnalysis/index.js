/*
 * @Descripttion : 分配优化分析
 * @Author       : gujitao
 * @Date         : 2020-09-08 15:44:44
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-08 16:19:32
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.ProjecAnalysis.path,
  title: routes.ProjecAnalysis.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

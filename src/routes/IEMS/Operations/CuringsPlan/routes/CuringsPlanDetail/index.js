/*
 * @Descripttion : 养护计划详情页
 * @Author       : hezihua
 * @Date         : 2020-06-08 14:23:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 11:03:50
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.curingsPlanDetail.path,
  title: routes.curingsPlanDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)
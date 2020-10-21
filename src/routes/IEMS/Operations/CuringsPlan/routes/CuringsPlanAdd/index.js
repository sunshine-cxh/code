/*
 * @Descripttion :养护计划添加入口
 * @Author       : hezihua
 * @Date         : 2020-06-08 14:23:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 10:52:55
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.curingsPlanAdd.path,
  title: routes.curingsPlanAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

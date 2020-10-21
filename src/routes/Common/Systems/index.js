/*
 * @Descripttion : 登录
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:27:12
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-26 11:50:55
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../config'

const routesConfig = (app) => ({
  path: routes.systems.path,
  title: routes.systems.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig)
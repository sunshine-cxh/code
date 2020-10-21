/*
 * @Descripttion : 登录
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:27:12
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-26 10:43:59
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../config'

const routesConfig = (app) => ({
  path: routes.login.path,
  title: routes.login.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig)
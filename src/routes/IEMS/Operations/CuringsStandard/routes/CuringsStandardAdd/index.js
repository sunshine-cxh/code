/*
 * @Descripttion : 养护标准添加入口
 * @Author       : hezihua
 * @Date         : 2020-06-02 14:23:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 11:04:44
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.curingsStandardAdd.path,
  title: routes.curingsStandardAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

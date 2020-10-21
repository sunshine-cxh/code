/*
 * @Descripttion : 巡检标准添加入口
 * @Author       : caojiarong
 * @Date         : 2020-06-02 14:23:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-03 10:11:41
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.patrolStandardAdd.path,
  title: routes.patrolStandardAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

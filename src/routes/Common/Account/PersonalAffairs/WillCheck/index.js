/*
 * @Descripttion : 我发起的审批申请
 * @Author       : hezihua
 * @Date         : 2020-05-29 08:49:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-22 15:42:17
 */ 
import { dynamicWrapper, createRoute } from 'utils/core';
import { routes } from '../../../config'

const routesConfig = app => ({
  path: routes.willCheck.path,
  title: routes.willCheck.title,
  component: dynamicWrapper(app, [
    import('./model'),
    import('../model.js')
  ], 
  () => import('./components')),

});

export default app => createRoute(app, routesConfig);
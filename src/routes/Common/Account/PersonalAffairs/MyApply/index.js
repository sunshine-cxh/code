/*
 * @Descripttion : 我发起的审批申请
 * @Author       : hezihua
 * @Date         : 2020-05-29 08:49:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-22 15:29:38
 */ 
import { dynamicWrapper, createRoute } from 'utils/core';
import { routes } from '../../../config'

const routesConfig = app => ({
  path: routes.myApply.path,
  title: routes.myApply.title,
  component: dynamicWrapper(app, [
    import('./model'), //ProcurementPlan
    import('../model.js')
  ], 
  () => import('./components')
  )
});

export default app => createRoute(app, routesConfig);
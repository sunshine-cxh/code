/*
 * @Descripttion : 重点用户申报
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-08-31 11:22:59
 */
import { dynamicWrapper, createRoute } from 'utils/core';
import { routes } from '../../../config'
import { Children } from 'react';
import SubDeclareAdd from './routes/SubDeclareAdd'
import SubDeclareDetail from './routes/SubDeclareDetail'
const routesConfig = app => ({
  path: routes.Gasdelcare.path,
  title: routes.Gasdelcare.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRouter:[
    SubDeclareAdd(app),
    SubDeclareDetail(app)
  ]
});

export default app => createRoute(app, routesConfig);


/*
 * @Descripttion : 数据字典
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-25 15:58:25
 */
import { dynamicWrapper, createRoute } from 'utils/core';
import { routes } from '../../config';

const routesConfig = app => ({
  path: routes.masterDataItem.path,
  title: routes.masterDataItem.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);

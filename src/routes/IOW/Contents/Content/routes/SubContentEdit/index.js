/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-02 11:32:10
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.contentEdit.path,
  title: routes.contentEdit.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)

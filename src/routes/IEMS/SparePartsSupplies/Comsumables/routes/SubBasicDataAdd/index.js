/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:25:41
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-08 17:27:06
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = app => ({
  path: routes.basicDataAdd.path,
  title: routes.basicDataAdd.title,
  component: dynamicWrapper(app, [
    import('./model/index.js')], () => import('./components'))
});

export default app => createRoute(app, routesConfig)
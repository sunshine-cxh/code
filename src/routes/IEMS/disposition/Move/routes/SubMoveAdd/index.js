/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:39
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 14:52:00
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.moveAdd.path,
  title: routes.moveAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js')], () => import('./components')),
  
})

export default (app) => createRoute(app, routesConfig)

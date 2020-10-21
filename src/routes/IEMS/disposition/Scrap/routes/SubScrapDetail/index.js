/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:47:31
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 11:31:29
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../config'

const routesConfig = (app) => ({
  path: routes.scrapDetail.path,
  title: routes.scrapDetail.title,
  component: dynamicWrapper(
    app,
    [import('./model/index.js'), import('../SubScrapAdd/model/index.js')],
    () => import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

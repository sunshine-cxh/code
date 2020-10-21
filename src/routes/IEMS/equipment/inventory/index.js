/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 08:54:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-29 11:32:10
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import inventoryAdd from './routes/inventoryAdd'
import inventoryOperat from './routes/inventoryOperat'
import inventoryDetail from './routes/inventoryDetail'
const routesConfig = (app) => ({
  path: routes.inventory.path,
  title: routes.inventory.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/inventoryAdd/model'),
      import('./routes/inventoryOperat/model'),
      import('./routes/inventoryDetail/model'),
    ],
    () => import('./components')
  ),
  childRoutes: [inventoryAdd(app), inventoryOperat(app), inventoryDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

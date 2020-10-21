/*
 * @Descripttion : 管段管理
 * @Author       : caojiarong
 * @Date         : 2020-08-25 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-25 09:59:36
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

import SubModelAdd from './routes/SubModelAdd'
import SubModelDetail from './routes/SubModelDetail'

const routesConfig = (app) => ({
  path: routes.modelHouse.path,
  title: routes.modelHouse.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRouter:[
    SubModelAdd(app),
    SubModelDetail(app)
  ]
})

export default (app) => createRoute(app, routesConfig)
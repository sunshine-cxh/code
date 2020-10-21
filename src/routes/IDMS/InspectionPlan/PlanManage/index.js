/*
 * @Descripttion : 路线管理
 * @Author       : caojiarong
 * @Date         : 2020-08-17 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-20 14:05:40
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

import SubLineAdd from './routes/SubLineAdd'
import SubLineDetail from './routes/SubLineDetail'


const routesConfig = (app) => ({
  path: routes.PlanManage.path,
  title: routes.PlanManage.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRouter:[
    SubLineAdd(app),
    SubLineDetail(app)
  ]
})

export default (app) => createRoute(app, routesConfig)
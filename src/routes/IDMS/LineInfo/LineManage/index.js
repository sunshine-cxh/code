/*
 * @Descripttion : 路线管理
 * @Author       : caojiarong
 * @Date         : 2020-08-17 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-18 11:47:58
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

import SubLineAdd from './routes/SubLineAdd'
import SubLineDetail from './routes/SubLineDetail'


const routesConfig = (app) => ({
  path: routes.lineManage.path,
  title: routes.lineManage.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRouter:[
    SubLineAdd(app),
    SubLineDetail(app)
  ]
})

export default (app) => createRoute(app, routesConfig)
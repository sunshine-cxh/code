/*
 * @Descripttion : 合同管理
 * @Author       : caojiarong
 * @Date         : 2020-09-01 14:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-02 08:47:08
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../config'

import SubPlanAdd from './routes/SubPlanAdd'
// import SubModelDetail from './routes/SubModelDetail'

const routesConfig = (app) => ({
  path: routes.contractInfo.path,
  title: routes.contractInfo.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRouter:[
    SubPlanAdd(app),
    // SubModelDetail(app)
  ]
})

export default (app) => createRoute(app, routesConfig)
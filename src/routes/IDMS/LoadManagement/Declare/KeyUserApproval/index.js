/*
 * @Descripttion : 重点用户申报
 * @Author       : caojiarong
 * @Date         : 2020-08-25 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-04 11:29:56
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../config'

// import SubCaculate from './routes/subCaculate'
import SubApprovalDetail from './routes/SubApprovalDetail'

const routesConfig = (app) => ({
  path: routes.keyUserApproval.path,
  title: routes.keyUserApproval.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRouter:[
    // SubCaculate(app),
    SubApprovalDetail(app)
  ]
})

export default (app) => createRoute(app, routesConfig)
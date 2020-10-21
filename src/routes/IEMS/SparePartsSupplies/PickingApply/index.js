/*
 * @Descripttion : 领料申请路由引进
 * @Author       : caojiarong
 * @Date         : 2020-05-19 10:01:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-19 14:34:28
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import PickingApplyAdd from './routes/PickingApplyAdd'
import PickingApplyDetail from './routes/PickingApplyDetail'

const routesConfig = app => ({
  path: routes.pickingApply.path,
  title: routes.pickingApply.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    PickingApplyAdd(app),
    PickingApplyDetail(app)
  ]
})


export default app => createRoute(app, routesConfig)

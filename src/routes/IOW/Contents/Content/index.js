/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-02 11:31:12
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import subContentEdit from './routes/SubContentEdit'
import subContentDetail from './routes/SubContentDetail'

const routesConfig = app => ({
  path: routes.content.path,
  title: routes.content.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    subContentEdit(app),
    subContentDetail(app),
  ]
})

export default app => createRoute(app, routesConfig)

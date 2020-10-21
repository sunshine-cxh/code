/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-02 11:32:39
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import subMessageEdit from './routes/SubMessageEdit'

const routesConfig = app => ({
  path: routes.message.path,
  title: routes.message.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    subMessageEdit(app)
  ]
})

export default app => createRoute(app, routesConfig)

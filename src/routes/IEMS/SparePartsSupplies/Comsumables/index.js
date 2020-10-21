/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 11:13:17
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-05 16:27:44
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import subBasicDataAdd from './routes/SubBasicDataAdd'

const routesConfig = (app) => ({
  path: routes.basicData.path,
  title: routes.basicData.title,
  component: dynamicWrapper(app, [import('./model'), import('./routes/SubBasicDataAdd/model/index.js')], () => import('./components')),
  childRoutes: [subBasicDataAdd(app)],
})

export default (app) => createRoute(app, routesConfig)

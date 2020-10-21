/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 11:35:00
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import SubScrapDetail from './routes/SubScrapDetail'
import SubScrapAdd from './routes/SubScrapAdd'

const routesConfig = (app) => ({
  path: routes.scrap.path,
  title: routes.scrap.title,
  component: dynamicWrapper(
    app,
    [import('./model'), import('./routes/SubScrapDetail/model/index.js'), import('./routes/SubScrapAdd/model/index.js')],
    () => import('./components')
  ),
  childRoutes: [SubScrapAdd(app), SubScrapDetail(app)],
})

export default (app) => createRoute(app, routesConfig)

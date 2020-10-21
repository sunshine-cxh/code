import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.realtime.path,
  title: routes.realtime.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [],
})

export default (app) => createRoute(app, routesConfig)

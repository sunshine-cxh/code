import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.simulation.path,
  title: routes.simulation.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [],
})

export default (app) => createRoute(app, routesConfig)

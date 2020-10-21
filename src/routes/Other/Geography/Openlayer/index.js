import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../config'

const routesConfig = (app) => ({
  path: routes.openlayer.path,
  title: routes.openlayer.title,
  component: dynamicWrapper(app, [], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

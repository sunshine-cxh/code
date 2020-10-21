import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.NEOsteadyStateCalculation.path,
  title: routes.NEOsteadyStateCalculation.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

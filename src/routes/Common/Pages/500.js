import { createRoute } from 'utils/core'
import { routes } from '../config'
import { P500 } from 'components/Pages'

const routesConfig = app => ({
  path: routes.page500.path,
  title: routes.page500.title,
  component: P500
})

export default app => createRoute(app, routesConfig)

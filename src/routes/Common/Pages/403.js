import { createRoute } from 'utils/core'
import { routes } from '../config'
import { P403 } from 'components/Pages'


const routesConfig = app => ({
  path: routes.page403.path,
  title: routes.page403.title,
  component: P403
})

export default app => createRoute(app, routesConfig)

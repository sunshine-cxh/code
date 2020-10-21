import React from 'react'
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.monitor.path,
  title: routes.monitor.title,
  component: dynamicWrapper(app, [], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

import React from 'react'
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.workingManage.path,
  title: routes.workingManage.title,
  component: dynamicWrapper(app, [], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

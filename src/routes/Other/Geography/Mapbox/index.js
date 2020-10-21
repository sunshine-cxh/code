import { dynamicWrapper, createRoute } from 'utils/core'
// import { routes } from '../config'

const routesConfig = app => ({
  path: '/gisDemo/Mapbox',
  title: 'mapbox',
  component: dynamicWrapper(app, [], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

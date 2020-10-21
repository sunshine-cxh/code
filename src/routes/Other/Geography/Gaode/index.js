import { dynamicWrapper, createRoute } from 'utils/core'
// import { routes } from '../config'

const routesConfig = app => ({
  path: '/gisDemo/Gaode',
  title: '高德',
  component: dynamicWrapper(app, [], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

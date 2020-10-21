import { dynamicWrapper, createRoute } from 'utils/core'

const routesConfig = (app) => ({
  path: '/geography/home/subRoute',
  title: '内页路由',
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)
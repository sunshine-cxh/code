import { dynamicWrapper, createRoute } from 'utils/core'
// import { routes } from '../config'

const routesConfig = app => ({
  path: '/transportation/home',
  title: '负荷预测',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
})

export default app => createRoute(app, routesConfig)

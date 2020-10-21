import { dynamicWrapper, createRoute } from 'utils/core'
// import { routes } from '../config'

const routesConfig = (app) => ({
  path: '/transportation/heatCalculation',
  title: '热值计算',
  component: dynamicWrapper(app, [import('./model')], () =>
    import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

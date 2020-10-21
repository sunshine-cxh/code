import { dynamicWrapper, createRoute } from 'utils/core'
// import { routes } from '../config'

const routesConfig = (app) => ({
  path: '/transportation/steadyStateCalculation',
  title: '稳态工况分析',
  component: dynamicWrapper(app, [import('./model')], () =>
    import('./components')
  ),
})

export default (app) => createRoute(app, routesConfig)

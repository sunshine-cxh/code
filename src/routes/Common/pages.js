/*
 * @Descripttion : page: 500 、403、 404
 * @Author       : wuhaidong
 * @Date         : 2019-12-24 10:38:10
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-15 15:27:45
 */
import BasicLayout from '@/layouts/BasicLayout'
import Page500 from './Pages/500'
import Page403 from './Pages/403'
import NotFound from './Pages/404'

const routesConfig = (app) => [
  {
    path: '/',
    title: '',
    indexRoute: '/',
    component: BasicLayout,
    childRoutes: [Page500, Page403, NotFound],
  },
]

export default routesConfig


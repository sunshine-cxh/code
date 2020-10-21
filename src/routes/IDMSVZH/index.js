/*
 * @Descripttion : 子系统路由入口
 * @Author       : caojiarong
 * @Date         : 2020-08-12 09:44:54
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-12 11:01:35
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import BasicLayout from './layouts/BasicLayout'
import { routePrefix } from './config'
import model from './model'

import Home from './routes/Home'

const childRoutes = (app) => [Home(app)]

/*
 * @path        : 路由地址
 * @component   : 组件
 * @indexRoute  : 默认显示路由
 * @childRoutes : 所有子路由
 * @NotFound    : 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = (app) => [
  {
    path: routePrefix,
    title: '珠海大屏',
    component: dynamicWrapper(app, [model], () => BasicLayout),
    indexRoute: `${routePrefix}/home`,
    childRoutes: childRoutes(app),
  },
]

export default routesConfig

/*
 * @Descripttion : 子系统路由入口
 * @Author       : wuhaidong
 * @Date         : 2020-07-13 17:44:15
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-13 16:21:58
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import BasicLayout from './layouts/BasicLayout'
import { routePrefix } from './config'
import model from './model'

import Home from './routes/Home'
import Linepatrol from './routes/Linepatrol'
import Realtime from './routes/Realtime'
import RealtimeRtmp from './routes/RealtimeRtmp'
import Simulation from './routes/Simulation'

const childRoutes = (app) => [Home(app), Linepatrol(app), Realtime(app), Simulation(app),RealtimeRtmp(app)]

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
    title: '智能运营管理系统',
    component: dynamicWrapper(app, [model], () => BasicLayout),
    indexRoute: `${routePrefix}/home`,
    childRoutes: childRoutes(app),
  },
]

export default routesConfig

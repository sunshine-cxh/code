/*
 * @Descripttion : 地理信息系统路由入口
 * @Author       : wuhaidong
 * @Date         : 2020-06-22 16:51:21
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-27 10:54:53
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import UserLayout from '@/layouts/UserLayout'
import { routePrefix } from './config'
import model from './model'

import Home from './Home'
import Backstage from './Backstage'

const childRoutes = (app) => [Home(app), Backstage(app)]

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
    title: '地理信息系统',
    component: dynamicWrapper(app, [model], () => UserLayout),
    indexRoute: `${routePrefix}/home`,
    childRoutes: childRoutes(app),
  },
]

export default routesConfig

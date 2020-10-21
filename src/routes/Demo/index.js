/*
 * @Descripttion : 子系统路由入口
 * @Author       : wuhaidong
 * @Date         : 2020-06-22 16:51:21
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-28 11:51:19
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import BasicLayout from '@/layouts/BasicLayout'
import { routePrefix } from './config'
import model from './model'

import Home from './Home'

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
    path: '/operation',
    title: '智能运营管理系统',
    component: dynamicWrapper(app, [model], () => BasicLayout),
    indexRoute: `${routePrefix}/home`,
    childRoutes: childRoutes(app),
  },
]

export default routesConfig

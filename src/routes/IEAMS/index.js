/*
 * @Descripttion : 租户后台管理子系统路由入口
 * @Author       : wuhaidong
 * @Date         : 2020-04-08 09:08:38
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-01 16:56:40
 */

import BasicLayout from '@/layouts/BasicLayout'
import { routesPrefix } from './config'
//系统管理
import SystemUser from './System/User'
import SystemRole from './System/Role'
import SystemOrganization from './System/Organization'

/*
 * @path        : 路由地址
 * @component   : 组件
 * @indexRoute  : 默认显示路由
 * @childRoutes : 所有子路由
 * @NotFound    : 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = (app) => [
  {
    path: routesPrefix,
    title: '后台管理系统',
    component: BasicLayout,
    indexRoute: `${routesPrefix}/user`,
    childRoutes: [SystemUser(app), SystemRole(app), SystemOrganization(app)],
  },
]

export default routesConfig

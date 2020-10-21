/*
 * @Descripttion : gisDemo
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-14 10:03:06
 */

import BasicLayout from '@/layouts/BasicLayout'
import { routePrefix } from './Geography/config'
console.log('routePrefix', routePrefix)

//一级导航 设备管理
import Home from './Geography/Home'
import Gaode from './Geography/Gaode'
import Mapbox from './Geography/Mapbox'
import Openlayer from './Geography/Openlayer'
import OpenlayerWithEchart from './Geography/OpenlayerWithEchart'

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
    component: BasicLayout,
    indexRoute: `${routePrefix}/Mapbox`,
    childRoutes: [Home(app), Gaode(app), Mapbox(app), Openlayer(app), OpenlayerWithEchart(app)],
  },
]

export default routesConfig

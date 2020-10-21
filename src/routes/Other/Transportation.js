/*
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @Descripttion : 燃气输配管理系统
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-20 11:02:25
 */

import BasicLayout from '@/layouts/BasicLayout'

//一级导航 设备管理
import Home from './Transportation/Home'
import HeatCalculation from './Transportation/HeatCalculation'
import SteadyStateCalculation from './Transportation/SteadyStateCalculation'
import TransientCalculation from './Transportation/TransientCalculation'

/*
 * @path        : 路由地址
 * @component   : 组件
 * @indexRoute  : 默认显示路由
 * @childRoutes : 所有子路由
 * @NotFound    : 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = (app) => [
  {
    path: '/transportation',
    title: '燃气输配管理系统',
    component: BasicLayout,
    indexRoute: '/transportation/home',
    childRoutes: [
      Home(app),
      HeatCalculation(app),
      SteadyStateCalculation(app),
      TransientCalculation(app),
    ],
  },
]

export default routesConfig

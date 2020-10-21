/*
 * @Descripttion  : 所有子系统公共路由
 * @Author       : wuhaidong
 * @Date         : 2019-12-24 10:38:10
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-13 19:45:07
 */
import { routePrefix } from './config'
import UserLayout from '@/layouts/UserLayout'
import BasicLayout from '@/layouts/BasicLayout'
import Login from './Login'
import Systems from './Systems'
import MyApply from './Account/PersonalAffairs/MyApply'
import MyCheck from './Account/PersonalAffairs/MyCheck'
import WillCheck from './Account/PersonalAffairs/WillCheck'
import AccountSetting from './Account/Setting'

const routesConfig = (app) => [
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    childRoutes: [Login(app), Systems(app)],
  },
  {
    path: routePrefix,
    title: '个人中心',
    indexRoute: `${routePrefix}/setting`,
    component: BasicLayout,
    childRoutes: [AccountSetting(app), MyApply(app), MyCheck(app), WillCheck(app)],
  },
]

export default routesConfig

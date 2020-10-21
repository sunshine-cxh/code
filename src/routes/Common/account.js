/*
 * @Descripttion : 个人中心
 * @Author       : wuhaidong
 * @Date         : 2019-12-24 10:38:10
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-12 16:22:45
 */
import BasicLayout from '@/layouts/BasicLayout'
import AccountSetting from './Account/Setting'

const routesConfig = (app) => [
  {
    path: '/account',
    title: '个人中心',
    indexRoute: '/account/sendapproval',
    component: BasicLayout,
    childRoutes: [AccountSetting(app)],
  },
]

export default routesConfig

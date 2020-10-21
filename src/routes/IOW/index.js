/*
 * @Descripttion : 官网后台管理系统路由入口
 * @Author       : wuhaidong
 * @Date         : 2020-05-14 10:45:26
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-02 14:07:57
 */

import BasicLayout from '@/layouts/BasicLayout'
import { routePrefix } from './config'

//一级导航
import contentsDemo from './Contents/Demo'
import content from './Contents/Content'
import resume from './Contents/Resume'
import message from './Contents/Message'

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
    title: '官网后台管理系统',
    component: BasicLayout,
    indexRoute: `${routePrefix}/content`,
    childRoutes: [content(app), resume(app), message(app), contentsDemo(app)],
  },
]

export default routesConfig

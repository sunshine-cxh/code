/*
 * @Author       : xuqiufeng
 * @Date         : 2020-06-12 09:40:30
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-16 11:57:41
 * @FilePath     : \ilng-shuaizhen-admin\src\routes\Common\Account\Setting\index.js
 */ 
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = (app) => ({
  path: routes.setting.path,
  title: routes.setting.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

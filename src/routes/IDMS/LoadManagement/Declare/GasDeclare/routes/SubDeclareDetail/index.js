/*
 * @Descripttion : 申报详情页
 * @Author       : gujitao
 * @Date         : 2020-08-25 14:12:37
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-03 16:43:18
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../../config'

const routesConfig = (app) => ({
  path: routes.subDeclareDetail.path,
  title: routes.subDeclareDetail.title,
  component: dynamicWrapper(app, [import('./model/index.js'),import('../../model/index.js'),import('../SubDeclareAdd/model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)


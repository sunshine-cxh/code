/*
 * @Descripttion : 申报新增页
 * @Author       : gujitao
 * @Date         : 2020-08--25 14:12:37
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-01 11:05:00
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../../../../config'

const routesConfig = (app) => ({
  path: routes.subDeclareAdd.path,
  title: routes.subDeclareAdd.title,
  component: dynamicWrapper(app, [import('./model/index.js'),import('../../model/index.js')], () => import('./components')),
})

export default (app) => createRoute(app, routesConfig)

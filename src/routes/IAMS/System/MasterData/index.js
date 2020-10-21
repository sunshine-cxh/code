/*
 * @Descripttion : 数据字典类别
 * @Author       : wuhaidong
 * @Date         : 2020-01-03 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-25 16:05:04
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.masterData.path,
  title: routes.masterData.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')
  )
})

export default app => createRoute(app, routesConfig)


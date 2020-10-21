/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-02 11:33:07
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'

const routesConfig = app => ({
  path: routes.resume.path,
  title: routes.resume.title,
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
})

export default app => createRoute(app, routesConfig)

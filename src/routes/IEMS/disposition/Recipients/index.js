/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-01 10:06:21
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import { routes } from '../../config'
import SubRecipientsDetail from './routes/SubRecipientsDetail'
import SubRecipientsAdd from './routes/SubRecipientsAdd'
import SubRecipientsReturn from './routes/SubRecipientsReturn'
const routesConfig = (app) => ({
  path: routes.recipients.path,
  title: routes.recipients.title,
  component: dynamicWrapper(
    app,
    [
      import('./model'),
      import('./routes/SubRecipientsDetail/model/index.js'),
      import('./routes/SubRecipientsAdd/model/index.js'),
      import('./routes/SubRecipientsReturn/model/index.js'),
    ],
    () => import('./components')
  ),
  childRoutes: [SubRecipientsAdd(app), SubRecipientsDetail(app), SubRecipientsReturn(app)],
})

export default (app) => createRoute(app, routesConfig)

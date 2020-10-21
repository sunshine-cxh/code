/*
 * @Descripttion : 子系统路由入口
 * @Author       : wuhaidong
 * @Date         : 2019-12-24 18:32:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-07 11:48:09
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import BasicLayout from '@/layouts/BasicLayout'
import { routePrefix } from './config'
import model from './model'
import Page403 from '../Common/Pages/403'
import Home from './Home'
import SystemUser from './System/User'
import SystemClient from './System/Client'
import SystemRole from './System/Role'
import SystemMasterData from './System/MasterData'
import SystemMasterDataItem from './System/MasterDataItem'
import SystemEnterprise from './System/Enterprise'
import SystemApiResource from './System/ApiResource'
import SystemOrganization from './System/Organization'
import SystemModule from './System/Module'
import SystemCodeRule from './System/CodeRule'

const childRoutes = (app) => [
  Home(app),
  SystemUser(app),
  SystemClient(app),
  SystemRole(app),
  SystemMasterData(app),
  SystemMasterDataItem(app),
  SystemEnterprise(app),
  SystemApiResource(app),
  SystemOrganization(app),
  SystemModule(app),
  SystemCodeRule(app),
  Page403(app),
]

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
    title: '后台管理系统',
    component: dynamicWrapper(app, [model], () => BasicLayout),
    indexRoute: `${routePrefix}/user`,
    childRoutes: childRoutes(app),
  },
  {
    path: '/',
    title: '后台管理系统',
    component: dynamicWrapper(app, [model], () => BasicLayout),
    indexRoute: `${routePrefix}/user`,
    childRoutes: childRoutes(app).concat([Page403]),
  },
]

export default routesConfig

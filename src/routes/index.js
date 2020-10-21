/*
 * @Descripttion : 主框架路由入口,如果子系统目录没有文件，请注释没有文件的子目录引入，子系统路由统一以Sub开头命名
 * @Author       : wuhaidong
 * @Date         : 2019-12-18 17:04:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-30 18:35:24
 */
import { createRoutes } from 'utils/core'
import Common from './Common'
import Pages from './Common/pages.js'
import SupplyDemo from './Other/Supply.js' //供应链系统demo
import IdmsHtmlDemo from './Other/IdmsHtml.js' //gis管理demo
import LogDemo from './Other/Log.js' //日志管理系统demo
import GisDemo from './Other/Geography.js' //gis管理demo

import IAMS from './IAMS' //ILNG平台后台管理系统（IAMS）
import IEMS from './IEMS' //ILNG设备管理系统（IEMS）
import IOW from './IOW' //ILNG企业官网后台（IOW）
import IGIS from './IGIS' //ILNG燃气管网地理信息系统（IGIS）
import IDMS from './IDMS' //ILNG智能输配运营管理系统（IDMS）
import IEAMS from './IEAMS' //ILNG租户管理系统（IEAMS）
import IDMSV from './IDMSV' //苏州输配管理系统大屏展示
import IDMSVZH from './IDMSVZH' //珠海大屏展示

const routesConfig = (app) => {
  return Common(app).concat(
    IEMS(app),
    IOW(app),
    IGIS(app),
    IDMS(app),
    IDMSV(app),
    IEAMS(app),
    IDMSVZH(app),
    SupplyDemo(app),
    IdmsHtmlDemo(app),
    LogDemo(app),
    GisDemo(app),
    IAMS(app),
    Pages(app)
  )
}

export default (app) => createRoutes(app, routesConfig)

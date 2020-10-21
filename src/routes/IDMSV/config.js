/*
 * @Descripttion : 子系统配置文件
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:13:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-20 18:32:22
 */

const API_PREFIX = '/idms'
const ROUTE_PREFIX = '/idmsv'
const ROUTES = {
  home: {
    path: `${ROUTE_PREFIX}/home`,
    title: '智慧管网',
  },
  linepatrol: {
    path: `${ROUTE_PREFIX}/linepatrol`,
    title: '安检巡线',
  },
  realtime: {
    path: `${ROUTE_PREFIX}/realtime`,
    title: '实时监控',
  },
  realtimeRtmp: {
    path: `${ROUTE_PREFIX}/realtimeRtmp`,
    title: '实时监控',
  },
  simulation: {
    path: `${ROUTE_PREFIX}/simulation`,
    title: '工况仿真',
  },
}

// gis底图链接配置
const MAP_BOX_URL = () => {
  let prefix = '' //dev
  if (window.location.host.indexOf('test') != -1) {
    prefix = 'http://iomp.test.ilng.cn:5001' //test
  }else if(window.location.host.indexOf('dev') != -1){ //dev环境
    prefix = 'http://192.168.0.71:5000' 
  }else{
    prefix='changehere'  //TODO   正式环境底图链接，需修改未正式的链接
  }
  return prefix
}

export { API_PREFIX as apiPrefix, ROUTE_PREFIX as routePrefix, ROUTES as routes, MAP_BOX_URL as mapboxUrl }

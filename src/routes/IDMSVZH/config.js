/*
 * @Descripttion : 子系统配置文件
 * @Author       : caojiarong
 * @Date         : 2020-08-12 09:44:54
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-12 10:37:24
 */

const API_PREFIX = '/idms'
const ROUTE_PREFIX = '/idmsvzh'
const ROUTES = {
  home: {
    path: `${ROUTE_PREFIX}/home`,
    title: '智慧管网',
  },

}

// gis底图链接配置
const MAP_BOX_URL = () => {
  let prefix = '' //dev
  if (window.location.host.indexOf('test') != -1) {
    prefix = 'http://iomp.test.ilng.cn:5001' //test
  }else if(window.location.host.indexOf('dev') != -1){ //dev
    prefix = 'http://192.168.0.71:5000' 
  }else{
    prefix='http://iomp.test.ilng.cn:5001'  //TODO   正式环境底图链接，需修改未正式的链接
  }
  return prefix
}

export { API_PREFIX as apiPrefix, ROUTE_PREFIX as routePrefix, ROUTES as routes, MAP_BOX_URL as mapboxUrl }

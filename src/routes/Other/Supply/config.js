/*
 * @Descripttion : 智能输配管理系统
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-22 17:32:17
 */

const API_PREFIX = ''
const ROUTE_PREFIX = '/iscm'
const ROUTES = {
  home: {
    title: `home`,
    path: `${ROUTE_PREFIX}/home`,
  },
  index: {
    title: `主页面`,
    path: `${ROUTE_PREFIX}/index`,
  },
  xuqiuyuce: {
    title: `需求预测`,
    path: `${ROUTE_PREFIX}/xuqiuyuce`,
  },
  waiwangxiaoshou: {
    title: `外网销售/代输`,
    path: `${ROUTE_PREFIX}/waiwangxiaoshou`,
  },
  dayonghu: {
    title: `大用户`,
    path: `${ROUTE_PREFIX}/dayonghu`,
  },
  neibuyonghu: {
    title: `内部用户`,
    path: `${ROUTE_PREFIX}/neibuyonghu`,
  },
  jihua: {
    title: `季度/月度计划`,
    path: `${ROUTE_PREFIX}/jihua`,
  },
  jiaofujihua: {
    title: `交付计划`,
    path: `${ROUTE_PREFIX}/jiaofujihua`,
  },
  diaodujihua: {
    title: `调度计划`,
    path: `${ROUTE_PREFIX}/diaodujihua`,
  },
  menzhanjihua: {
    title: `门站计划`,
    path: `${ROUTE_PREFIX}/menzhanjihua`,
  },
  gongkuanyuce: {
    title: `工况预测`,
    path: `${ROUTE_PREFIX}/gongkuanyuce`,
  },
  chengbenlirun: {
    title: `成本利润`,
    path: `${ROUTE_PREFIX}/chengbenlirun`,
  },
  dingdanguanli: {
    title: `订单管理`,
    path: `${ROUTE_PREFIX}/dingdanguanli`,
  },
  jiliangjiesuan: {
    title: `计量和计算`,
    path: `${ROUTE_PREFIX}/jiliangjiesuan`,
  },
  shebeinengli: {
    title: `设备能力设置`,
    path: `${ROUTE_PREFIX}/shebeinengli`,
  },
  lianjiescada: {
    title: `链接SCADA`,
    path: `${ROUTE_PREFIX}/lianjiescada`,
  },
  guancun: {
    title: `管存`,
    path: `${ROUTE_PREFIX}/guancun`,
  },
  lngkurong: {
    title: `LNG库容`,
    path: `${ROUTE_PREFIX}/lngkurong`,
  },
  lngcaoche: {
    title: `LNG槽车`,
    path: `${ROUTE_PREFIX}/lngcaoche`,
  },
  guifanzhengce: {
    title: `规范及政策`,
    path: `${ROUTE_PREFIX}/guifanzhengce`,
  },
  shichangdongtai: {
    title: `市场动态`,
    path: `${ROUTE_PREFIX}/shichangdongtai`,
  },
  wenjian: {
    title: `文件`,
    path: `${ROUTE_PREFIX}/wenjian`,
  },
}

export { API_PREFIX as apiPrefix, ROUTE_PREFIX as routePrefix, ROUTES as routes }

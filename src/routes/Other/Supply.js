/*
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @Descripttion : 燃气输配管理系统
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-18 20:27:03
 */

import BasicLayout from '@/layouts/BasicLayout'
import { routePrefix } from './Supply/config'

import Home from './Supply/Home'
import Index from './Supply/Index'
import xuqiuyuce from './Supply/yuceguanli/xuqiuyuce'
import waiwangxiaoshou from './Supply/fuzaiguanli/waiwangxiaoshou'
import dayonghu from './Supply/fuzaiguanli/dayonghu'
import neibuyonghu from './Supply/fuzaiguanli/neibuyonghu'
import jihua from './Supply/qiyuanguanli/jihua'
import jiaofujihua from './Supply/qiyuanguanli/jiaofujihua'
import diaodujihua from './Supply/fenpeiyouhuaguanli/diaodujihua'
import menzhanjihua from './Supply/fenpeiyouhuaguanli/menzhanjihua'
import gongkuanyuce from './Supply/fenpeiyouhuaguanli/gongkuanyuce'
import chengbenlirun from './Supply/chengbenlirun/chengbenlirun'
import dingdanguanli from './Supply/hetongguanli/dingdanguanli'
import jiliangjiesuan from './Supply/jiliangjiesuan/jiliangjiesuan'
import shebeinengli from './Supply/shebeisheshiguanli/shebeinengli'
import lianjiescada from './Supply/shebeisheshiguanli/lianjiescada'
import guancun from './Supply/kucunguanli/guancun'
import lngkurong from './Supply/kucunguanli/lngkurong'
import lngcaoche from './Supply/yunshuguanli/lngcaoche'
import guifanzhengce from './Supply/gonggao/guifanzhengce'
import shichangdongtai from './Supply/gonggao/shichangdongtai'
import wenjian from './Supply/gonggao/wenjian'

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
    title: '供应链管理系统',
    component: BasicLayout,
    indexRoute: `${routePrefix}/waiwangxiaoshou`,
    childRoutes: [
      Home(app),
      Index(app),
      xuqiuyuce(app),
      waiwangxiaoshou(app),
      dayonghu(app),
      neibuyonghu(app),
      jihua(app),
      jiaofujihua(app),
      diaodujihua(app),
      menzhanjihua(app),
      gongkuanyuce(app),
      chengbenlirun(app),
      dingdanguanli(app),
      jiliangjiesuan(app),
      shebeinengli(app),
      lianjiescada(app),
      guancun(app),
      lngkurong(app),
      lngcaoche(app),
      guifanzhengce(app),
      shichangdongtai(app),
      wenjian(app),
    ],
  },
]

export default routesConfig

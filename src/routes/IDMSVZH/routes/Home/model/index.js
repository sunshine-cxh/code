/*
 * @Descripttion : 珠海大屏智慧管网
 * @Author       : caojiarong
 * @Date         : 2020-07-14 11:13:41
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-12 14:50:35
 */ 
import modelEnhance from 'utils/modelEnhance'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'idmsvzhHome',

  state: {
    zoom:9,
    mapPointerData:[]
  },

  subscriptions: {

  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {

      yield put({
        type:'getmappointerdata'
      })
    },

    

    // 地图门站点数据
    *getmappointerdata({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          method:'get',
          valueField: 'mapPointerData',
          url: ``  //接口地址
        },
      })
    },

  },

  reducers: {},
})
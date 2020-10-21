/*
 * @Descripttion : 智慧管网
 * @Author       : caojiarong
 * @Date         : 2020-07-14 11:13:41
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-30 09:17:51
 */ 
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'idmsvHome',

  state: {
    zoom:9,
    daycountData:[],
    gasTendencyData:[],
    stationPointUseData:[],
    stationUsedGas:[],
    stationPressure:[],
    mapPointerData:[]
  },

  subscriptions: {

  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'getdaycount',
      })

      yield put({
        type:'getusedgastendency'
      })

      yield put({
        type:'getstationusedgas'
      })

      yield put({
        type:'getstationpointerusedgas'
      })

      yield put({
        type:'getstationpressure'
      })

      yield put({
        type:'getmappointerdata'
      })
    },

    // 一天和近期用气量总数
    *getdaycount({ payload }, { call, put, select }) {
      // const { parameters, type } = yield select((state) => state.idmsvHome)
      // let { pageData } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          method:'get',
          valueField: 'daycountData',
          url: `${apiPrefix}/intelligentnetworkreport/getdaycount`
        },
      })

    },

    // 24小时内用气量分布数据
    *getusedgastendency({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          method:'get',
          valueField: 'gasTendencyData',
          url: `${apiPrefix}/intelligentnetworkreport/getusedgastendency`
        },
      })
    },

    // 场站气量统计
    *getstationusedgas({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          method:'get',
          valueField: 'stationUsedGas',
          url: `${apiPrefix}/intelligentnetworkreport/getstationusedgas`
        },
      })
    },

    // 起源点统计
    *getstationpointerusedgas({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          method:'get',
          valueField: 'stationPointUseData',
          url: `${apiPrefix}/intelligentnetworkreport/getstationpointerusedgas`
        },
      })
    },

    // 站点压力值统计
    *getstationpressure({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          method:'get',
          valueField: 'stationPressure',
          url: `${apiPrefix}/intelligentnetworkreport/getstationpressure`
        },
      })
    },

    // 地图门站点数据
    *getmappointerdata({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          method:'get',
          valueField: 'mapPointerData',
          url: `${apiPrefix}/intelligentnetworkreport/getmappointerdata`
        },
      })
    },

  },

  reducers: {},
})
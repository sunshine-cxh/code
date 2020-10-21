/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-14 08:45:03
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-06 17:28:03
 */ 
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'simulation',

  state: {
    zoom: 10,
    flowData: [],
    pressureData: [],
    infosData: [],
    gisPointList:{}
    // currentStatus: 'real'
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        // if(pathname === '/idmsv/simulation') {
        //   currentStatus = 'real'
        // }
        
      })
    },
  },

  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'getFlow',
      })

      yield put({
        type:'getPressure'
      })

      yield put({
        type:'getInfos',
        payload: {}
      })

    },
    // 大屏展示施工/隐患状态统计
    *getFlow({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'flowData',
          url: `${apiPrefix}/simulation/getflowstatistical`
        },
      })
    },
    *getPressure({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pressureData',
          url: `${apiPrefix}/simulation/getpressurestatistical`
        },
      })
    },
    *getInfos({ payload }, { call, put, select }) {
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'infosData',
          url: `${apiPrefix}/simulation/getsimulationdata`,
          success: (res)=> {
            if(success) {
              success(res)
            }
            
          }
        },
      })
    },

    *getGisPoint({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        afterResponse:(res)=>{
          return res
        },
        payload: {
          valueField: 'gisPointList',
          // ${apiPrefix}/simulation/getgisdata
          url: `http://192.168.0.65:8060/api/igis/GIS/szGasMap`,
        },
      })
    },
  },

  reducers: {},
})

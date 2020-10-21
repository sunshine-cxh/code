/*
 * @Descripttion : 门站运算输出model
 * @Author       : caojiarong
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-14 09:34:35
 */
import modelEnhance from 'utils/modelEnhance'
import Format from 'utils/format'
import { apiPrefix, routePrefix } from '../../../config'
export default modelEnhance({
  namespace: 'gateStationResult',

  state: {
    stationExitList:[],
    paramsList:[],
    resultData:{
      flowData:[],
      pressureData:[],
      temperatureData:[]
    }
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: '@change',
          payload: {
            isCurrentRoute: pathname == routePrefix+'/gateStationResult' ? true : false,
          }
        })
      });
    }
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      yield put({
        type:'getStationExitList'
      })
    },

    // 获取门站列表
    *getStationExitList({payload}, {call, put, select}){
      const { type } = yield select((state) => state.gateStationResult)
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name', false)
        },
        payload: {
          method:'get',
          valueField: 'stationExitList',
          url: `${apiPrefix}/stationdata/getgatefilterlist`
        }
      })
    },

    // 获取搜索结果
    *getResult({payload}, {call, put, select}){
      const { type } = yield select((state) => state.gateStationResult)
      let {dataStartTime, dataEndTime, clientPoints} = payload
      console.log(dataStartTime, dataEndTime, clientPoints)
      yield put.resolve({
        type: '@request',
        payload: {
          // method:'post',
          valueField: 'resultData',
          url: `${apiPrefix}/stationdata/getgatestationlist`,
          data:{
            dataStartTimeStr:dataStartTime,
            dataEndTimeStr:dataEndTime,
            stationPointIds:clientPoints
          }
        }
      })
    }
  },

  reducers: {
  }
})

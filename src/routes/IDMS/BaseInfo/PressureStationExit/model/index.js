/*
 * @Descripttion : 调压站出口信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 11:55:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-10 16:14:03
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'pressureStationExit',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    type:1,
    pressureStationList:[]
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select((state) => state.pressureStationExit)
      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData: pageData.startPage(1, 10) },
      })
      yield put({
        type:'getStationList'
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters, type } = yield select((state) => state.pressureStationExit)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values,
        entity:{
          type
        }
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/stationexport/getlistdata`,
          pageInfo: pageData,
          ...data,
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { type } = yield select((state) => state.pressureStationExit)
      values.type=type
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/stationexport/submit`,
          data: values,
          success: () => {
            success && success()
          },
        },
      })
      
    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { pageData } = yield select((state) => state.pressureStationExit)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/stationexport/delete?id=${id}`,
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
      success()
    },

    // 获取门站列表
    *getStationList({payload}, {call, put, select}){
      const { type } = yield select((state) => state.pressureStationExit)
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'pressureStationList',
          url: `${apiPrefix}/stationpoint/getselectlist?type=${type}`,
          data:{
            type
          }
                    
        }
      })
    }
  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload,
      }
    },
  },
})

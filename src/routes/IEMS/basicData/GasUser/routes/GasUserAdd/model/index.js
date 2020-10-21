/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-29 09:49:44
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-30 10:15:00
 */ 
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'gasuserAdd',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    popoverVisible: false,
    details: {},
    supplyList: [],
    addressList: [],
    gasUserTypeList: [],
    gasStationList: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/gasuser/subGasUserAdd`) {
          dispatch({
            type: '@change',
            payload: {
              details: {}
            },
          })
        }
      })
    },
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { id, success } = payload
      if(id){
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              console.log(details)
            }
          },
        })
      }
    },
    // 从数据字典中获取用气用户类型
    *getGasUserType({ payload }, { call, put }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'gasuserAdd',
          valueField: 'gasUserTypeList',
          category: 'gasUserType',
        }
      })
    },
    // 
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/gasuser/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
    *getGasStationList({ payload }, { call, put, select }) {
      let { success } = payload
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'gasStationList',
          url: `${apiPrefix}/gasstation/getlist`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.gasuser)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/gasuser/submit`,
          data: values,
          success: () => {
            success && success()
          },
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
    }
  },

  reducers: {
  },
})

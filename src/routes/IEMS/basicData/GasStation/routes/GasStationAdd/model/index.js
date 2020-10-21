/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-29 09:49:44
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-30 10:16:31
 */ 
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'

export default modelEnhance({
  namespace: 'gasstationAdd',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    popoverVisible: false,
    details: {},
    supplyList: [],
    addressList: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/gasstation/subGasstationAdd`) {
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
    // 
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/gasstation/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.gasstation)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/gasstation/submit`,
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

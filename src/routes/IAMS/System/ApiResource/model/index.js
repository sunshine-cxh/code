/*
 * @Descripttion : ApiResource
 * @Author       : wuhaidong
 * @Date         : 2020-01-12 14:48:30
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-14 16:16:29
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'apiResource',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select(state => state.apiResource)

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select(state => state.apiResource)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/apiResource/getlistdata`,
          pageInfo: pageData,
          ...data
        }
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data
        }
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select, }) {
      let { values, success } = payload
      let { pageData } = yield select(state => state.apiResource)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/apiResource/submit`,
          data: values,
          success: (res) => {
            success && success()
          }
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { pageData } = yield select(state => state.apiResource)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/apiResource/delete?id=${id}`
        }
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      })
      success()
    },

  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload
      }
    }
  }
})

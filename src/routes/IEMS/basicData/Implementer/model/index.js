
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'implementer',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create()
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select(state => state.implementer)
      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select(state => state.implementer)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/implementer/getlistdata`,
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
      let { pageData } = yield select(state => state.implementer)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/implementer/submit`,
          data: values,
          success: () => {
            success && success()
          }
        }
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },


    //删除
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { pageData } = yield select(state => state.implementer)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/implementer/delete?id=${id}`
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
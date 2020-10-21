/*
 * @Descripttion : 企业管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 11:20:33
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-04-16 10:40:50
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'enterprise',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    organizationType: [], //组织类型
    industryType: [], //行业类型
    enterpriseScale: [], //企业规模
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select(state => state.enterprise)

      yield put.resolve({
        type: 'global/getMasterDataItem',
        payload: {
          namespace: 'enterprise',
          valueField: 'organizationType',
          category: 'enterpriseType',
        }
      })

      yield put.resolve({
        type: 'global/getMasterDataItem',
        payload: {
          namespace: 'enterprise',
          valueField: 'industryType',
          category: 'industryType',
        }
      })

      yield put.resolve({
        type: 'global/getMasterDataItem',
        payload: {
          namespace: 'enterprise',
          valueField: 'enterpriseScale',
          category: 'enterpriseScale',
        }
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select(state => state.enterprise)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/enterprise/getlistdata`,
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
      let { pageData } = yield select(state => state.enterprise)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/enterprise/submit`,
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
      let { pageData } = yield select(state => state.enterprise)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/enterprise/delete?id=${id}`
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

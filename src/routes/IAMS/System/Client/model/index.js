/*
 * @Descripttion : 客户端管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-04-16 10:41:52
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'client',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    clientType: []
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select(state => state.client)
      yield put.resolve({
        type: 'getClientType'
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select(state => state.client)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/client/getlistdata`,
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
      let { pageData } = yield select(state => state.client)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/client/submit`,
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
      let { pageData } = yield select(state => state.client)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/client/delete?id=${id}`
        }
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      })
      success()
    },


    //获取客户端类型
    *getClientType({ payload }, { call, put }) {
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response)
        },
        payload: {
          valueField: 'clientType',
          url: `${apiPrefix}/masterdataitem/getselectordata?category=clientType`
        }
      })
    }
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

/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-27 11:57:32
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../config'

export default modelEnhance({
  namespace: 'Content',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false,
    details: {},
    isCurrentRoute: false,
    basicInfos: {},
    contentType: [],
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == `${routePrefix}/content` ? true : false,
          },
        })
      })
    },
  },
  effects: {
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/webcontent/getdetail?id=${id}`,
          success: () => {
            success && success()
          },
        },
      })
    },
    // 删除内容
    *delete({ payload }, { call, put, select }) {
      let { id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/webcontent/delete?id=${id}`,
          data: payload,
        },
      })
      const { parameters, pageData } = yield select((state) => state.Content)

      yield put({
        type: 'getPageInfo',
        payload: {
          values: parameters,
          pageData,
        },
      })
    },
    // 修改发布状态
    *handleChangeState({ payload }, { call, put }) {
      yield put({
        type: '@change',
        payload: {
          ...payload,
        },
      })
    },
    *init({ payload }, { call, put, select }) {
      const { parameters, pageData } = yield select((state) => state.Content)

      // 获取内容类型
      yield put.resolve({
        type: 'global/getMasterDataItem',
        payload: {
          namespace: 'Content',
          valueField: 'contentType',
          category: 'contentType',
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData: pageData.startPage(1, 10, 'PublishDate', 'desc'),
        },
      })
    },

    // 获取内容管理列表
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select((state) => state.Content)
      let { pageData, values, success } = payload
      let data = {
        ...parameters,
        ...values,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/webcontent/getlistdata`,
          pageInfo: pageData,
          ...data,
          success: () => {
            success && success()
          },
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          data: data,
        },
      })
    },
  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload.data,
      }
    },
  },
})

/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-16 14:09:14
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-08 15:34:21
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'procurementTest',

  state: {
    parameters: {},
    isCurrentRoute: false,
    pageData: PageHelper.create(),
    popoverVisible: false, // 采购计划/筛选 popover 显隐控制
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute:
              pathname == `${routesPrefix}/procurementTest` ? true : false,
          },
        })
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { parameters, pageData } = yield select(
        (state) => state.procurementTest
      )
      yield put({
        type: 'getPageInfo',
        payload: {
          values: parameters,
          pageData,
        },
      })
    },
    *handleChangeState({ payload }, { call, put }) {
      yield put({
        type: '@change',
        payload: {
          ...payload,
        },
      })
    },

    // 获取采购验收页面列表
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select((state) => state.procurementTest)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/purchaseaccept/getlistdata`,
          pageInfo: pageData,
          ...data,
        },
      })
      // /api/purchaseaccept/getlistdata
      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          data: data,
        },
      })
    },
    // 删除采购计划列表
    *delete({ payload }, { call, put, select }) {
      let { id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/purchaseaccept/delete?id=${id}`,
          data: payload,
        },
      })
      const { parameters, pageData } = yield select(
        (state) => state.procurementTest
      )

      yield put({
        type: 'getPageInfo',
        payload: {
          values: parameters,
          pageData,
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

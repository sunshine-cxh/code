/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 09:37:19
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'standingBook',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false, // 采购计划/筛选 popover 显隐控制
    treeData: [],
    isCurrentRoute: false,
    addressList: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == `${routesPrefix}/standingBook` ? true : false,
            details: {},
          },
        })
      })
    },
  },
  effects: {
    *handleChangeState({ payload }, { call, put }) {
      yield put({
        type: '@change',
        payload: {
          ...payload,
        },
      })
    },
    *init({ payload }, { call, put, select }) {
      const { parameters, pageData } = yield select((state) => state.standingBook)

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData,
        },
      })
      yield put({
        type: 'getType',
        payload: {
          success: () => {},
        },
      })
    },
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentledger/delete?id=${id}`,
          success: () => {
            success()
          },
        },
      })
    },
    // 获取类别
    *getType({ payload }, { call, put, select }) {
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'treeData',
          url: `${apiPrefix}/equipmentcategory/getselectordata?Type=1`,
          success: () => {
            success && success()
          },
        },
      })
    },
    // 获取台账列表
    *getPageInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: pageData,
          ...values,
        },
      })
    },
  },

  reducers: {
  },
})

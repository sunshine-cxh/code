/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:57
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 15:03:02
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import $$ from 'cmn-utils'
import { routerRedux } from 'dva/router'
export default modelEnhance({
  namespace: 'curingsTaskOperate',

  state: {
    details: {},
    allUserList: [],
    recordPageData: PageHelper.create(),
    curingPageInfo: PageHelper.create(),
    itemPageData: PageHelper.create(),
    stkpickingPageInfo: PageHelper.create(),
    selectedPickingRow: [],
    selectedPickingRowKeys: [],
    selectedPickingRowLocal: [],
    selectedPickingRowKeysLocal: [],
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/curingsTask/subCuringsTaskOperate`) {
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let { id } = payload
      if (id) {
        yield put({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {},
          },
        })
      }
    },
    // 保存新增领料申请数据
    *edit({ payload }, { call, put, select }) {
      const { details } = yield select((state) => state.curingsTaskOperate)
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/curingTask/edit`,
          data: { ...details },
          success: () => {
            success()
          },
        },
      })
    },
    // 保存新增领料申请数据
    *submit({ payload }, { call, put, select }) {
      const { details } = yield select((state) => state.curingsTaskOperate)
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/curingTask/submit`,
          data: { ...details },
          success: () => {
            success()
          },
        },
      })
    },
    // 获取领料申请列表
    *getApplyList({ payload }, { call, put, select }) {
      let { stkpickingPageInfo, values } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'stkpickingPageInfo',
          url: `${apiPrefix}/stkpicking/getlistdata`,
          pageInfo: stkpickingPageInfo,
          ...values,
        },
      })
    },
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { curingPageInfo, itemPageData } = yield select((state) => state.curingsTaskOperate)
      let res = {}
      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          res = response
        },
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/curingtask/getdetail?id=${id}`,
          success: (details) => {
            success(details)
            curingPageInfo.list = details.curingLineEntityList ? details.curingLineEntityList : []
            ;(itemPageData.list = details.purchaseDataEntities ? details.purchaseDataEntities : []),
              put({
                type: '@change',
                payload: {
                  curingPageInfo,
                  itemPageData,
                },
              })
          },
        },
      })
      yield put({
        type: 'setEditData',
        payload: res,
      })
    },
  },
  reducers: {
    setEditData(state, { payload }) {
      return {
        ...state,
        selectedPickingRow: payload.stkpickingList,
        selectedPickingRowKeys: JSON.parse(payload.stkpickingIds),
        selectedPickingRowLocal: payload.stkpickingList,
        selectedPickingRowKeysLocal: JSON.parse(payload.stkpickingIds),
      }
    },
  },
})

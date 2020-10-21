/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-08 15:32:33
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'external',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false, // 采购计划/筛选 popover 显隐控制
    isCurrentRoute: false,
    flowchart: [],
    // /flowwork/getauditflowchart
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == `${routesPrefix}/external` ? true : false,
          },
        })
      })
    },
  },
  effects: {
    // 获取流程列表
    *getauditflowchart({ payload }, { call, put }) {
      let { success, id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'flowchart',
          url: `/iams/flowwork/getauditflowchart`,
          data: {
            processSchemeId: id,
            flowTypeString: 'EquipmentRepairCommission',
          },
          success: () => {
            success()
          },
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
    *init({ payload }, { call, put, select }) {
      const { parameters, pageData } = yield select((state) => state.external)

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData,
        },
      })
    },
    // 删除采购计划列表
    *delete({ payload }, { call, put, select }) {
      let { id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentrepaircommission/delete?id=${id}`,
          data: payload,
        },
      })
      const { parameters, pageData } = yield select((state) => state.external)

      yield put({
        type: 'getPageInfo',
        payload: {
          values: parameters,
          pageData,
        },
      })
    },

    // 获取采购计划列表
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select((state) => state.external)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/equipmentrepaircommission/getlistdata`,
          pageInfo: pageData,
          ...data,
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

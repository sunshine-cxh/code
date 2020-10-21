/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-14 13:34:49
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-08 15:33:23
 * @FilePath     : \ilng-shuaizhen-admin\src\routes\SubEquipment\Equipment\ProcurementApply\model\index.js
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'procurementapply',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    isCurrentRoute: false,
    popoverVisible: false,
    flowchart: [],
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute:
              pathname == `${routesPrefix}/procurementApply` ? true : false,
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
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { parameters, pageData } = yield select(
        (state) => state.procurementapply
      )

      yield put({
        type: 'getPageInfo',
        payload: {
          values: parameters,
          pageData,
        },
      })
    },

    *getauditflowchart({ payload }, { call, put }) {
      let { success, id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'flowchart',
          url: `/iams/flowwork/getauditflowchart`,
          data: {
            processSchemeId: id,
            flowTypeString: 'Purchase',
          },
          success: () => {
            success()
          },
        },
      })
    },
    // 删除采购计划列表
    *delete({ payload }, { call, put, select }) {
      let { id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/purchase/delete?id=${id}`,
          data: payload,
        },
      })
      const { parameters, pageData } = yield select(
        (state) => state.procurementapply
      )

      yield put({
        type: 'getPageInfo',
        payload: {
          values: parameters,
          pageData,
        },
      })
    },
    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select((state) => state.procurementapply)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/purchase/getlistdata`,
          pageInfo: pageData,
          ...data,
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          data,
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

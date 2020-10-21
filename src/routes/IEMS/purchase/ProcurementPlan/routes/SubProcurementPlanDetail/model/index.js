/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:48:59
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 09:39:38
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'procurementPlanDetail',

  state: {
    orderTableList: PageHelper.create(),
    fileTableList: PageHelper.create(),
    details: {},
    checkHis: [],
    brandList: [],
    unitList: [],
    supplyList: [],
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/procurementPlan/subProcurementPlanDetail`) {
          dispatch({
            type: '@change',
            payload: {
              details: {},
              orderTableList: PageHelper.create(),
              fileTableList: PageHelper.create(),
              checkHis: []
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { orderTableList, fileTableList } = yield select((state) => state.procurementPlanDetail)
      let { id } = payload
      if (id) {
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              orderTableList.list = details.purchaseDataList ? details.purchaseDataList : []
              fileTableList.list = details.fileDataList ? details.fileDataList : []
              put({
                type: '@change',
                payload: {
                  fileTableList,
                  orderTableList,
                },
              })
            },
          },
        })
        const { details } = yield select((state) => state.procurementPlanDetail)
        if (!(details.isCommit === 0)) {
          yield put.resolve({
            type: 'getCheckHis',
            payload: {
              id,
              success: () => {},
            },
          })
        }
      }
    },
    // 审批
    *postaudit({ payload }, { call, put, select }) {
      let { id, success, auditOpinion, resultType } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/iams/flowwork/postaudit`,
          success: () => {
            success()
          },
          data: {
            processSchemeId: id,
            flowTypeString: 'PurchasePlan',
            auditOpinion,
            resultType,
          },
        },
      })
    },

    // 获取审核历史
    *getCheckHis({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'checkHis',
          url: `/iams/flowwork/getaduithistory`,
          data: {
            processSchemeId: id,
            flowTypeString: 'PurchasePlan',
          },
          success: (details) => {
            success(details)
          },
        },
      })
    },
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success, fn } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/purchaseplan/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
  },
  reducers: {},
})

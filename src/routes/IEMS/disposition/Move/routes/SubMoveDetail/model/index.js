/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:57
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 17:50:34
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'moveDetail',

  state: {
    moveTableList: PageHelper.create(),
    details: {},
    checkHis: [],
    filePageData: PageHelper.create(),
    allUserList: [],
    organizationTree: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/move/submoveDetail`) {
          dispatch({
            type: '@change',
            payload: {
              details: {},
              moveTableList: PageHelper.create(),
              checkHis: []
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { moveTableList, filePageData, checkHis } = yield select((state) => state.moveDetail)
      let { id } = payload
      if (id) {
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              moveTableList.list = details.equipmentDataList ? details.equipmentDataList : []
              filePageData.list = details.fileDataList ? details.fileDataList : []
              put({
                type: '@change',
                payload: {
                  moveTableList,
                  filePageData
                },
              })
            },
          },
        })
        const { details } = yield select((state) => state.moveDetail)
        if (details.isCommit !== 0) {
          yield put.resolve({
            type: 'getCheckHis',
            payload: {
              id,
              success: () => {},
            },
          })
        } else {
          yield put({
            type: 'setHisData'
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
            flowTypeString: 'EquipmentAllocation',
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
            flowTypeString: 'EquipmentAllocation',
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
          url: `${apiPrefix}/equipmentallocation/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
  },
  reducers: {
    setHisData(state, { payload }) {
      return {
        ...state,
        checkHis: [],
      }
    }
  },
})

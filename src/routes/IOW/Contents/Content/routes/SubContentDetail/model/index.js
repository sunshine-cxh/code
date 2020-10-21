/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-05-06 10:48:59
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-17 11:26:06
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'

export default modelEnhance({
  namespace: 'contentDetail',

  state: {
    details: {},
  },
  effects: {
    // 获取内容详情
    *getContentDetail({ payload }, { put }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/webcontent/getdetail?id=${id}`,
        },
      })
    },
    *updatestatus({ payload }, { put }) {
      let { id, success ,status} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          // valueField: 'details',
          url: `${apiPrefix}/webcontent/updatestatus?id=${id}&status=${status}`,
          success: () => {
            success()
          },
        },
      })
    },
  },
  reducers: {
    detailChange(state, { payload }) {
      return {
        ...state,
        details: {
          ...state.details,
          [payload.key]: payload.val,
        },
      }
    },
  },
})

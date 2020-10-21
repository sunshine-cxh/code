/*
 * @Descripttion : 用户审批详情页面model
 * @Author       : caojiarong
 * @Date         : 2020-08-31ng
 * @LastEditTime : 2020-09-02 14:42:30
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'subApprovalDetail',

  state: {
    weatherPageData: PageHelper.create(),
    details:[], 
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routePrefix}/keyUserApproval/subApprovalDetail`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
            },
          })
        }
      })
    },
  },
  effects: {
    // /equipment/equipmentinventory/getdetail
    *init({ payload }, { call, put, select }) {
      let { id } = payload
      console.log(id)
      if(id){
        yield put({
          type: 'getDetails',
          payload: {
            id,
          },
        })
      }

    },

    *getDetails({ payload }, { call, put, select }) {
      let { id } = payload
      console.log(id)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/gasdeclare/approveDetail?id=${id}`,
        },
      })
    },
    
  },
  reducers: {
    // basicInfosChange(state, { payload }) {
    //   return {
    //     ...state,
    //     basicInfos: {
    //       ...state.basicInfos,
    //       [payload.key]: payload.val,
    //     },
    //   }
    // },
    // getUserPageInfoSuccess(state, { payload }) {
    //   return {
    //     ...state,
    //     userParameter: payload.data,
    //   }
    // },
  },
})

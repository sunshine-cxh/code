/*
 * @Descripttion : 管段管理详情页面model
 * @Author       : caojiarong
 * @Date         : 2020-08-18 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-21 16:12:43
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'subLineDetail',

  state: {
    linePageData: PageHelper.create(),
    details:[], 
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routePrefix}/PipLineManage/subLineDetail`) {
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
      const { details } = yield select((state) => state.subLineDetail)
      let { id } = payload
      if(id){
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
          },
        })
      }

      yield put({
        type:'getLineStatus'
      })
    },
    *getDetails({ payload }, { call, put, select }) {
      let { id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/pipesection/getdetail?id=${id}`,
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

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:57
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-05 10:30:17
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import $$ from 'cmn-utils'
import { routerRedux } from 'dva/router'
export default modelEnhance({
  namespace: 'patrolTaskOperate',

  state: {
    childPageData: PageHelper.create(),
    parentPageData: PageHelper.create(),
    connectPageData: PageHelper.create(),
    filePageData: PageHelper.create(),
    imageList: [],
    details: {},
    brandList: [],
    unitList: [],
    supplyList: [],
    allUserList: [],
    recordPageData: PageHelper.create(),
    patrolLinePageInfo: PageHelper.create(),
    problemPageInfo: PageHelper.create(),
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/standingBook/subpatrolTaskOperate`) {
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
            success: (details) => {
            },
          },
        })
      }
    },
    // 保存新增领料申请数据
    *edit({ payload }, { call, put, select }) {
      const { details } = yield select(state => state.patrolTaskOperate)
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/patroltask/edit`,
          data: {...details},
          success: ()=> {
            success()
          }
        }
      })
    },
    // 保存新增领料申请数据
    *submit({ payload }, { call, put, select }) {
      const { details } = yield select(state => state.patrolTaskOperate)
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/patroltask/submit`,
          data: {...details},
          success: ()=> {
            success()
          }
        }
      })
    },
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { patrolLinePageInfo, problemPageInfo } = yield select(state => state.patrolTaskOperate)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/patroltask/getdetail?id=${id}`,
          success: (details) => {
            success(details)
            patrolLinePageInfo.list = details.patrolLineEntity ? details.patrolLineEntity : []
            // problemPageInfo.list = details.patrolPlanLines ? details.patrolPlanLines : [],
            put({
              type: '@change',
              payload: {
                patrolLinePageInfo,
                // problemPageInfo
              },
            })
          },
        },
      })
    },
    *getRecord({ payload }, { call, put, select }) {
      let { values, pageData, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'recordPageData',
          url: `${apiPrefix}/equipmentledger/getequipmentdetail`,
          pageInfo: pageData,
          ...values,
          success: (details) => {
            success(details)
          },
        },
      })
    },
  },
  reducers: {},
})

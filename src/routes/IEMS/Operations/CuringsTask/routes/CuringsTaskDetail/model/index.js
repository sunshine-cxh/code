/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:57
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 08:49:43
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'curingsTaskDetail',

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
    curingPageInfo: PageHelper.create(),
    curingFeePageInfo: PageHelper.create()
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/curingsTaskDetail/subCuringsTaskDetail`) {
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
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { curingPageInfo, curingFeePageInfo } = yield select(state => state.curingsTaskDetail)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/curingtask/getdetail?id=${id}`,
          success: (details) => {
            success(details)
            curingPageInfo.list = details.curingLineEntityList ? details.curingLineEntityList : []
            curingFeePageInfo.list = details.purchaseDataEntities ? details.purchaseDataEntities : [],
            put({
              type: '@change',
              payload: {
                curingPageInfo,
                curingFeePageInfo
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

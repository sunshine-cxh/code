/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:57
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 16:11:11
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'standingBookDetail',

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
    flowchart: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/standingBook/substandingBookDetail`) {
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let { filePageData, childPageData, connectPageData, parentPageData } = yield select((state) => state.standingBookDetail)
      let { id } = payload
      if (id) {
        yield put({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              filePageData.list = details.fileList ? details.fileList : []
              connectPageData.list = details.sparepartsList ? details.sparepartsList : []
              childPageData.list = details.childLedgers ? details.childLedgers : []
              parentPageData.list = details.parentLedger ? [details.parentLedger] : []
              put({
                type: '@change',
                payload: {
                  filePageData,
                  connectPageData,
                  childPageData,
                  parentPageData,
                  imageList: details.photoList,
                },
              })
            },
          },
        })
      }
    },
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/equipmentledger/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
    *getauditflowchart({ payload }, { call, put }) {
      let { success, id, flowTypeString } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'flowchart',
          url: `/iams/flowwork/getauditflowchart`,
          data: {
            processSchemeId: id,
            flowTypeString,
          },
          success: () => {
            success()
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

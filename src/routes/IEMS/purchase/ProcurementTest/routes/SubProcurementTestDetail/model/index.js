/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:48:59
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-08 16:39:08
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'procurementTestDetail',

  state: {
    orderTableList: PageHelper.create(),
    fileTableList: PageHelper.create(),
    checkTypeList: [],
    details: {},
    supplyList: [],
    unitList: [],
    typeList: [],
    locationList: []
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { orderTableList, fileTableList } = yield select(
        (state) => state.procurementTestDetail
      )
      let { id } = payload
      yield put({
        type: 'getDetails',
        payload: {
          id,
          success: (details) => {
            orderTableList.list = details.purchaseDataList
              ? details.purchaseDataList
              : []
            fileTableList.list = details.fileDataList
              ? details.fileDataList
              : []
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
    },
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success, fn } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/purchaseaccept/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
    // 获取验收类别列表  basiInfo
    *getCheckType({ payload }, { call, put }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: (response) => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'procurementTestAdd',
          valueField: 'checkTypeList',
          category: 'checkType',
        },
      })
    },
  },
  reducers: {},
})

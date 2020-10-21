/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:57
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 14:52:22
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'
import moment from 'moment'
export default modelEnhance({
  namespace: 'moveAdd',

  state: {
    parameter: {},
    moveInfoPageData: PageHelper.create(),
    moveAddPageData: PageHelper.create(),
    moveRow: [],
    moveRowKeys: [],
    details: {},
    basicInfos: {},
    approvalParameters: {},
    approvalDataList: PageHelper.create(),
    approvalDataList1: PageHelper.create(),
    approvalRow: [],
    approvalRowKeys: [],
    approvalRowLocal: [],
    approvalRowKeysLocal: [],
    approvalCheckedKeys: [],
    flowchartList: [],
    organizationTree: [],
    brandList: [],
    unitList: [],
    supplyList: [],
    allUserList: [],
    filePageData: PageHelper.create()
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/move/subMoveAdd`) {
          dispatch({
            type: '@change',
            payload: {
              details: {},
              moveInfoPageData: PageHelper.create(),
              approvalParameters: {},
              approvalDataList: PageHelper.create(),
              approvalDataList1: PageHelper.create(),
              approvalRow: [],
              approvalRowKeys: [],
              approvalRowLocal: [],
              approvalRowKeysLocal: [],
              approvalCheckedKeys: [],
              filePageData: PageHelper.create(),
              moveRow: [],
              moveRowKeys: [],
              flowchartList: []
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { moveInfoPageData, filePageData } = yield select((state) => state.moveAdd)
      let { id, success } = payload
      if (id) {
        yield put({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              moveInfoPageData.list = details.equipmentDataList ? details.equipmentDataList : []
              filePageData.list = details.fileDataList ? details.fileDataList : []
              put({
                type: '@change',
                payload: {
                  moveInfoPageData,
                  filePageData
                },
              })
              if (success) {
                success(details)
              }
            },
          },
        })
      }
    },
    // 提交调拨单
    *submit({ payload }, { call, put, select }) {
      const { basicInfos, moveInfoPageData, approvalRow, filePageData, details } = yield select((state) => state.moveAdd)
      approvalRow.map(item => {
        item.approverName = item.realName || item.approverName
      })
      let { success, id, type } = payload
      let postData = {
        ...basicInfos,
        flowSchemeDataList: approvalRow,
        equipmentDataList: moveInfoPageData.list,
        fileDataList: filePageData.list
      }
      if (id) {
        postData.id = id
        postData.code = details.code
      }
      if(type === 'submit') {
        postData.registerDate = moment()
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentallocation/${type}`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    *getEquipmentPageInfo({ payload }, { call, put, select }) {
      const { parameter } = yield select((state) => state.moveAdd)
      let { moveAddPageData, values } = payload
      let data = {
        ...parameter,
        ...values,
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'moveAddPageData',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: moveAddPageData,
          ...data,
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
      const { details } = yield select((state) => state.moveAdd)
      let approvalRowKeys = []
      details.flowSchemeDataList && details.flowSchemeDataList.forEach((item) => {
        approvalRowKeys.push(item.id)
      })
      yield put({
        type: '@change',
        payload: {
          approvalRow: details.flowSchemeDataList,
          approvalRowLocal: details.flowSchemeDataList,
          flowchartList: details.flowSchemeDataList,
          approvalRowKeys,
          approvalRowKeysLocal: approvalRowKeys,
        },
      })
    },
    *getUserInfos({ payload }, { call, put, select }) {
      const { approvalParameters } = yield select((state) => state.moveAdd)
      let { approvalDataList, values } = payload
      let data = {
        ...approvalParameters,
        ...values,
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'approvalDataList',
          url: `/iams/user/getlistdata`,
          pageInfo: approvalDataList,
          ...data,
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          data: data,
        },
      })
    },
  },
  reducers: {},
})

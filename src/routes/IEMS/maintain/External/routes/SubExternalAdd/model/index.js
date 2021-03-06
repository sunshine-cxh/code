/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 14:57:05
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'externalAdd',

  state: {
    appPageData: PageHelper.create(),
    filePageData: PageHelper.create(),
    flowworkList: [],
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
    equipmentRow: [],
    equipmentRowKeys: [],
    equipmentDataList: PageHelper.create(),
    equipmentParameters: {},
    selectDataList: PageHelper.create(),
    parameters: {},
    selectedRow: [],
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/external/subExternalAdd`) {
          dispatch({
            type: '@change',
            payload: {
              details: {},
              approvalParameters: {},
              approvalDataList: PageHelper.create(),
              approvalDataList1: PageHelper.create(),
              approvalRow: [],
              approvalRowKeys: [],
              approvalRowLocal: [],
              approvalRowKeysLocal: [],
              approvalCheckedKeys: [],
              equipmentRow: [],
              equipmentRowKeys: [],
              equipmentDataList: PageHelper.create(),
              equipmentParameters: {},
              flowchartList: [],
              appPageData: PageHelper.create(),
              filePageData: PageHelper.create(),
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { appPageData, filePageData } = yield select((state) => state.externalAdd)
      let { id } = payload
      if (id) {
        yield put({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              appPageData.list = details.equipmentRepairList ? details.equipmentRepairList : []
              filePageData.list = details.fileDataList ? details.fileDataList : []
              put({
                type: '@change',
                payload: {
                  filePageData,
                  appPageData,
                },
              })
            },
          },
        })
      }
    },
    // 提交采购计划新增
    *submit({ payload }, { call, put, select }) {
      const {
        basicInfos,
        appPageData,
        filePageData,
        equipmentRowKeys,
        approvalRowKeys,
      } = yield select((state) => state.externalAdd)
      let { success, id } = payload
      let postData = {
        ...basicInfos,
        ledgerId: equipmentRowKeys.join(','),
        flowSchemeDataList: approvalRowKeys,
        equipmentRepairList: appPageData.list,
        fileDataList: filePageData.list,
      }
      if (id) {
        postData.id = id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentrepaircommission/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    // 保存采购计划新增
    *save({ payload }, { call, put, select }) {
      const {
        basicInfos,
        appPageData,
        filePageData,
        approvalRowKeys,
        equipmentRowKeys,
      } = yield select((state) => state.externalAdd)
      let { success, id } = payload
      let postData = {
        ...basicInfos,
        ledgerId: equipmentRowKeys.join(','),
        flowSchemeDataList: approvalRowKeys,
        equipmentRepairList: appPageData.list,
        fileDataList: filePageData.list,
      }
      if (id) {
        postData.id = id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentrepaircommission/edit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    *getEquipmentList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'equipmentDataList',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: PageHelper.create(),
        },
      })
    },
    *getSelectList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'selectDataList',
          url: `${apiPrefix}/equipmentrepair/getlistdata`,
          pageInfo: PageHelper.create(),
        },
      })
    },
    // 删除文件
    *deleteFile({ payload }, { put }) {
      let postData = {
        id: payload.record.fileId,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/ifss/file/delete`,
          data: postData,
        },
      })
    },
    // 获取审核人列表
    *getFlowwork({ payload }, { put }) {
      // /flowwork/getauditorlist?FlowTypeString=Purchase
      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          return Format.selectDictFormat(response, 'auditorId', 'aduitorName')
        },
        payload: {
          valueField: 'flowworkList',
          url: `/iams/flowwork/getauditorlist?FlowTypeString=EquipmentRepairCommission`,
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
          url: `${apiPrefix}/equipmentrepaircommission/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
      const { details } = yield select((state) => state.externalAdd)
      if (!details.flowSchemeDataList) {
        return
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'approvalDataList1',
          url: `/iams/user/getlistdata`,
          pageInfo: PageHelper.create(),
          entity: {
            ids: details.flowSchemeDataList ? details.flowSchemeDataList : [],
          },
        },
      })
      const { approvalDataList1 } = yield select((state) => state.externalAdd)
      let approvalRowKeys = []
      approvalDataList1.list.forEach((item) => {
        approvalRowKeys.push(item.id)
      })
      yield put({
        type: '@change',
        payload: {
          approvalRow: approvalDataList1.list,
          approvalRowLocal: approvalDataList1.list,
          flowchartList: approvalDataList1.list,
          approvalRowKeys,
          approvalRowKeysLocal: approvalRowKeys,
        },
      })
    },
    *getUserInfos({ payload }, { call, put, select }) {
      const { approvalParameters } = yield select((state) => state.externalAdd)
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
    },
  },
  reducers: {},
})

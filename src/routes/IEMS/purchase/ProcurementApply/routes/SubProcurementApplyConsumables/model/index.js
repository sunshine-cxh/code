/*
 * @Descripttion : 采购申请耗材新增
 * @Author       : hezihua
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 14:58:16
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'

export default modelEnhance({
  namespace: 'procurementApplyConsumables',

  state: {
    parameters: {},
    appPageData: PageHelper.create(),
    filePageData: PageHelper.create(),
    selectTableList: PageHelper.create(),
    approvalParameters: {},
    approvalDataList: PageHelper.create(),
    approvalDataList1: PageHelper.create(),
    approvalRow: [],
    approvalRowKeys: [],
    approvalRowLocal: [],
    approvalRowKeysLocal: [],
    approvalCheckedKeys: [],
    planParameters: {},
    planDataList: PageHelper.create(),
    planDataList1: PageHelper.create(),
    planRow: [],
    planRowKeys: [],
    basicInfos: {},
    flowworkList: [],
    selectDataList: PageHelper.create(),
    selectedRow: [],
    selectedRowKeys: [],
    checkedKeys: [],

    addRow: [],
    details: {},
    flowchartList: [],
    organizationTree: [],
    unitList: [],
    supplyList: [],
    brandList: [],
    typeList: [],
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/procurementApply/subProcurementApplyConsumables`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              details: {},
              selectedRow: [],
              selectedRowKeys: [],
              checkedKeys: [],
              addRow: [],
              planRow: [],
              planRowKeys: [],
              approvalParameters: {},
              approvalDataList: PageHelper.create(),
              approvalDataList1: PageHelper.create(),
              approvalRow: [],
              approvalRowKeys: [],
              approvalRowLocal: [],
              approvalRowKeysLocal: [],
              approvalCheckedKeys: [],
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
      let { appPageData, filePageData, approvalRow } = yield select((state) => state.procurementApplyConsumables)
      let { id, success } = payload
      if (id) {
        yield put({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              appPageData.list = details.purchaseDataList ? details.purchaseDataList : []
              filePageData.list = details.fileDataList ? details.fileDataList : []

              put({
                type: '@change',
                payload: {
                  filePageData,
                  appPageData,
                },
              })
              success(details)
            },
          },
        })
      }
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
          url: `/iams/flowwork/getauditorlist?FlowTypeString=Purchase`,
        },
      })
    },
    // 获取采购计划列表  basicInfos
    *getPurchasePlanList({ payload }, { call, put, select }) {
      const { planParameters } = yield select((state) => state.procurementApplyConsumables)
      let { planDataList, values } = payload
      let data = {
        ...planParameters,
        ...values,
      }
      // applyParameters
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'planDataList',
          url: `${apiPrefix}/purchaseplan/getlistdata`,
          pageInfo: planDataList,
          ...data,
        },
      })
    },
    *getPurchasePlanList1({ payload }, { call, put, select }) {
      const { planParameters } = yield select((state) => state.procurementApplyConsumables)
      let { planDataList1, values } = payload
      let data = {
        ...planParameters,
        ...values,
      }
      // applyParameters
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'planDataList1',
          url: `${apiPrefix}/purchaseplan/getlistdata`,
          pageInfo: planDataList1,
          ...data,
        },
      })
    },
    // 获取 申请信息 可选列表
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select((state) => state.procurementApplyConsumables)
      let { selectDataList, values } = payload
      let data = {
        ...parameters,
        ...values,
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'selectDataList',
          url: `${apiPrefix}/spareparts/getlistdata`,
          pageInfo: selectDataList,
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
    *getUserInfos({ payload }, { call, put, select }) {
      const { approvalParameters } = yield select((state) => state.procurementApplyConsumables)
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
    // 提交新增采购耗材
    *submit({ payload }, { call, put, select }) {
      const { basicInfos, appPageData, filePageData, planRowKeys, approvalRowKeys } = yield select((state) => state.procurementApplyConsumables)

      let { success, id } = payload
      let postData = {
        ...basicInfos,
        sourceID: planRowKeys.length > 0 && planRowKeys[0],
        flowSchemeDataList: approvalRowKeys,
        purchaseDataList: appPageData.list,
        fileDataList: filePageData.list,
      }
      if (id) {
        postData.id = id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/purchase/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },

    // 保存新增采购耗材
    *save({ payload }, { call, put, select }) {
      const { basicInfos, appPageData, filePageData, planRowKeys, approvalRowKeys } = yield select((state) => state.procurementApplyConsumables)
      let { success, id } = payload
      let postData = {
        ...basicInfos,
        sourceID: planRowKeys.length > 0 && planRowKeys[0],
        flowSchemeDataList: approvalRowKeys,
        purchaseDataList: appPageData.list,
        fileDataList: filePageData.list,
      }
      if (id) {
        postData.id = id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/purchase/edit`,
          data: postData,
          success: () => {
            success()
          },
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
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success, fn } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/purchase/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })

      const { details, planParameters, approvalParameters } = yield select((state) => state.procurementApplyConsumables)
      // 获取采购计划id 的完整数据
      let data = {
        ...planParameters,
        entity: {
          ids: details.sourceID ? [details.sourceID] : [],
        },
      }
      // applyParameters
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'planDataList1',
          url: `${apiPrefix}/purchaseplan/getlistdata`,
          pageInfo: PageHelper.create(),
          ...data,
        },
      })
      const { planDataList1, planRow, planRowKeys } = yield select((state) => state.procurementApplyConsumables)
      yield put({
        type: '@change',
        payload: {
          planRow: planDataList1.list,
          planRowKeys: planDataList1.list.length > 0 ? [planDataList1.list[0].id] : [],
        },
      })
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
            ids: details.flowSchemeDataList ? details.flowSchemeDataList : undefined,
          },
        },
      })
      const { approvalDataList1 } = yield select((state) => state.procurementApplyConsumables)
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
  },
  reducers: {},
})

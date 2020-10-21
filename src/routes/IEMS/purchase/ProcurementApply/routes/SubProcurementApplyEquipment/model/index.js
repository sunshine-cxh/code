/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:20:14
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'

export default modelEnhance({
  namespace: 'procurementApplyEquipment',

  state: {
    appPageData: PageHelper.create(),
    filePageData: PageHelper.create(),
    planDataList: PageHelper.create(),
    planDataList1: PageHelper.create(),
    planParameters: {},
    planRow: [],
    planRowKeys: [],
    approvalRowLocal: [],
    approvalRowKeysLocal: [],
    approvalParameters: {},
    approvalDataList: PageHelper.create(),
    approvalDataList1: PageHelper.create(),
    approvalRow: [],
    approvalRowKeys: [],
    approvalCheckedKeys: [],
    flowchartList: [],
    flowworkList: [],
    basicInfos: {},
    details: {},
    organizationTree: [],
    supplyList: [],
    brandList: [],
    typeList: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (
          pathname ===
          `${routesPrefix}/procurementApply/subProcurementApplyEquipment`
        ) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              details: {},
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
      const { appPageData, filePageData, planRow, planRowKeys } = yield select(
        (state) => state.procurementApplyEquipment
      )
      let { id } = payload
      if (id) {
        yield put({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              appPageData.list = details.purchaseDataList
                ? details.purchaseDataList
                : []
              filePageData.list = details.fileDataList
                ? details.fileDataList
                : []
              planRow[0] = { sn: details.sourceID }
              planRowKeys[0] = details.sourceID
              put({
                type: '@change',
                payload: {
                  filePageData,
                  appPageData,
                  planRow,
                  planRowKeys,
                },
              })
            }
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
      const { planParameters } = yield select(
        (state) => state.procurementApplyEquipment
      )
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
    // 提交新增设备信息
    *submit({ payload }, { call, put, select }) {
      const {
        basicInfos,
        appPageData,
        filePageData,
        planRowKeys,
        approvalRowKeys,
      } = yield select((state) => state.procurementApplyEquipment)
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
    *getUserInfos({ payload }, { call, put, select }) {
      const { approvalParameters } = yield select(
        (state) => state.procurementApplyEquipment
      )
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
    // 保存列表信息
    *save({ payload }, { call, put, select }) {
      const {
        basicInfos,
        appPageData,
        filePageData,
        planRowKeys,
        approvalRowKeys,
      } = yield select((state) => state.procurementApplyEquipment)
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

      const { details, planParameters, approvalParameters } = yield select(
        (state) => state.procurementApplyEquipment
      )
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
      const { planDataList1, planRow, planRowKeys } = yield select(
        (state) => state.procurementApplyEquipment
      )
      yield put({
        type: '@change',
        payload: {
          planRow: planDataList1.list,
          planRowKeys:
            planDataList1.list.length > 0 ? [planDataList1.list[0].id] : [],
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
            ids: details.flowSchemeDataList ? details.flowSchemeDataList : [],
          },
        },
      })
      const { approvalDataList1 } = yield select(
        (state) => state.procurementApplyEquipment
      )
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

/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 09:39:20
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'procurementPlanAdd',

  state: {
    appPageData: PageHelper.create(),
    filePageData: PageHelper.create(),
    flowworkList: [],
    details: {
      title: '',
      type: '0',
      remark: '',
      year: new Date().getFullYear(),
      cycleUnit: undefined,
      cycle: undefined,
      flowSchemeDataList: [],
    },
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
    supplyList: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/procurementPlan/subProcurementPlanAdd`) {
          dispatch({
            type: '@change',
            payload: {
              details: {
                title: '',
                type: '0',
                remark: '',
                year: new Date().getFullYear(),
                cycleUnit: undefined,
                cycle: undefined,
                flowSchemeDataList: [],
              },
              approvalParameters: {},
              approvalDataList: PageHelper.create(),
              approvalDataList1: PageHelper.create(),
              approvalRow: [],
              approvalRowKeys: [],
              approvalRowLocal: [],
              approvalRowKeysLocal: [],
              approvalCheckedKeys: [],
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
      const { appPageData, filePageData } = yield select(
        (state) => state.procurementPlanAdd
      )
      let { id } = payload
      if(id) {
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
        approvalRowKeys,
      } = yield select((state) => state.procurementPlanAdd)
      let { success, id } = payload
      let postData = {
        ...basicInfos,
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
          url: `${apiPrefix}/purchaseplan/submit`,
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
      } = yield select((state) => state.procurementPlanAdd)
      let { success, id } = payload
      let postData = {
        ...basicInfos,
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
          url: `${apiPrefix}/purchaseplan/edit`,
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
          url: `/iams/flowwork/getauditorlist?FlowTypeString=PurchasePlan`,
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
          url: `${apiPrefix}/purchaseplan/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
      const { details } = yield select((state) => state.procurementPlanAdd)
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
        (state) => state.procurementPlanAdd
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
    *getUserInfos({ payload }, { call, put, select }) {
      const { approvalParameters } = yield select(
        (state) => state.procurementPlanAdd
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
  },
  reducers: {},
})

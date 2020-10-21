/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:10:22
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'recipientsAdd',

  state: {
    appPageData: PageHelper.create(),
    filePageData: PageHelper.create(),
    flowworkList: [],
    details: {},
    basicInfos: {},
    approvalParameters: {},
    approvalDataList: PageHelper.create(),
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
    parameters: {},
    selectDataList: PageHelper.create(),
    selectedRow: [],
    selectedRowKeys: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/recipients/subRecipientsAdd`) {
          dispatch({
            type: '@change',
            payload: {
              details: {},
              approvalParameters: {},
              approvalDataList: PageHelper.create(),
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
      
    },
    // 提交采购计划新增
    *submit({ payload }, { call, put, select }) {
      const { basicInfos, appPageData, filePageData, approvalRowKeys } = yield select(
        (state) => state.recipientsAdd
      )
      let { success, id } = payload
      let postData = {
        ...basicInfos,
        flowSchemeDataList: approvalRowKeys,
        equipmentDataList: appPageData.list,
        fileDataList: filePageData.list,
      }
      if (id) {
        postData.id = id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentcollar/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    // 获取台账列表
    *getEquipmentPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select((state) => state.recipientsAdd)
      let { selectDataList, values } = payload
      let data = {
        ...parameters,
        ...values,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'selectDataList',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: selectDataList,
          ...data,
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
    *getUserInfos({ payload }, { call, put, select }) {
      const { approvalParameters } = yield select((state) => state.recipientsAdd)
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

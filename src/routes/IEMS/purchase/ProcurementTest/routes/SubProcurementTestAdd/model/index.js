/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 09:39:54
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'

export default modelEnhance({
  namespace: 'procurementTestAdd',

  state: {
    parameters: {},
    applyParameters: {},
    addRow: [],
    selectedRow: [],
    selectedRowKeys: [],
    applyRow: [],
    applyRowKeys: [],
    appPageData: PageHelper.create(),
    filePageData: PageHelper.create(),
    selectDataList: PageHelper.create(),
    applyDataList: PageHelper.create(),
    checkTypeList: [],
    basicInfos: {
      title: undefined,
      acceptUserID: $$.getStore('user') && $$.getStore('user').userName,
      acceptEndDate: undefined,
      acceptType: undefined,
      purchaseID: undefined,
      acceptResult: undefined,
      remark: undefined,
    },
    popoverVisible: false,
    organizationTree: [],
    supplyList: [],
    unitList: [],
    typeList: [],
    locationList: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        // 监听回到新增验收页面时清空数据
        if (pathname === `${routesPrefix}/procurementTest/subProcurementTestAdd`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {
                title: undefined,
                acceptUserID:
                  $$.getStore('user') && $$.getStore('user').userName,
                acceptEndDate: undefined,
                acceptType: undefined,
                purchaseID: undefined,
                acceptResult: undefined,
                remark: undefined,
              },
              applyRow: [],
              applyRowKeys: [],
              addRow: [],
              selectedRow: [],
              selectedRowKeys: [],
              appPageData: PageHelper.create(),
              filePageData: PageHelper.create(),
            },
          })
        }
      })
    },
  },
  effects: {
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
    // 获取采购申请列表
    *getApplyList({ payload }, { call, put, select }) {
      const { applyParameters } = yield select((state) => state.procurementTest)
      let { applyDataList, values } = payload
      let data = {
        ...applyParameters,
        ...values,
      }
      // applyParameters
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'applyDataList',
          url: `${apiPrefix}/purchase/getlistdata`,
          pageInfo: applyDataList,
          ...data,
        },
      })
    },
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select((state) => state.procurementTest)
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
          url: `${apiPrefix}/equipmentledger/getlistdata`,
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
    *submit({ payload }, { call, put, select }) {
      const {
        basicInfos,
        appPageData,
        filePageData,
        applyRowKeys,
      } = yield select((state) => state.procurementTestAdd)
      let { success } = payload
      let postData = {
        ...basicInfos,
        purchaseID: applyRowKeys.length > 0 && applyRowKeys[0],
        purchaseDataList: appPageData.list,
        fileDataList: filePageData.list,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/purchaseaccept/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
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
  },
  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload.data,
      }
    },
  },
})

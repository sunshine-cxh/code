/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:26:15
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 17:12:44
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'standingBookAdd',

  state: {
    appPageData: PageHelper.create(),
    childPageData: PageHelper.create(),
    childAddPageData: PageHelper.create(),
    childParameter: {},
    childRow: [],
    childRowKeys: [],
    parentPageData: PageHelper.create(),
    parentAddPageData: PageHelper.create(),
    parentParameter: {},
    parentRow: [],
    parentRowKeys: [],
    connectPageData: PageHelper.create(),
    connectAddPageData: PageHelper.create(),
    connectParameter: {},
    connectRow: [],
    connectRowKeys: [],
    filePageData: PageHelper.create(),
    flowworkList: [],
    imageList: [],
    basicInfos: {},
    details: {},
    typeList: [],
    supplyList: [],
    unitList: [],
    brandList: [],
    organizationTree: [],
    allUserList: [],
    locationList: [],
    gasList: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/standingBook/substandingBookAdd`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              childPageData: PageHelper.create(),
              childRow: [],
              childRowKeys: [],
              parentPageData: PageHelper.create(),
              parentRow: [],
              parentRowKeys: [],
              connectPageData: PageHelper.create(),
              connectRow: [],
              connectRowKeys: [],
              details: {},
              filePageData: PageHelper.create(),
              imageList: []
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let { filePageData, childPageData, connectPageData, parentPageData } = yield select((state) => state.standingBookAdd)
      let { id, success } = payload
      if (id) {
        yield put({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              filePageData.list = details.fileList ? details.fileList : []
              connectPageData.list = details.sparepartsList ? details.sparepartsList : []
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
              success(details)
            },
          },
        })
      }
    },
    *getGasStationList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'gasList',
          url: `${apiPrefix}/gasstation/getlist`,
        },
      })
    },
    *getGasUserList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'gasList',
          url: `${apiPrefix}/gasuser/getlist`,
        },
      })
    },
    // 提交采购计划新增
    *submit({ payload }, { call, put, select }) {
      const { basicInfos, connectPageData, imageList, filePageData, parentRowKeys, details } = yield select((state) => state.standingBookAdd)

      let { success, id } = payload
      let postData = {
        ...basicInfos,
        sparepartsList: connectPageData.list,
        photoList: imageList,
        fileList: filePageData.list,
        parentId: parentRowKeys[0],
        isCollect: details.isCollect || 0,
        coordinateX: String(basicInfos.coordinateX),
        coordinateY: String(basicInfos.coordinateY),
      }
      if (id) {
        postData.id = id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentledger/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
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
    *deleteImage({ payload }, { call, put, select }) {
      let { id, success } = payload
      let postData = { id }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/ifss/image/delete`,
          data: postData,
          success: ()=> {
            success()
          }
        },
      })
    },
    *getChildPageInfo({ payload }, { call, put, select }) {
      const { childParameter } = yield select((state) => state.standingBookAdd)
      let { childAddPageData, values } = payload
      let data = {
        ...childParameter,
        ...values,
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'childAddPageData',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: childAddPageData,
          ...data,
        },
      })

      yield put({
        type: 'getChildPageInfoSuccess',
        payload: {
          data: data,
        },
      })
    },
    *getParentPageInfo({ payload }, { call, put, select }) {
      const { childParameter } = yield select((state) => state.standingBookAdd)
      let { parentAddPageData, values } = payload
      let data = {
        ...childParameter,
        ...values,
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'parentAddPageData',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: parentAddPageData,
          ...data,
        },
      })
    },
    *getConnectPageInfo({ payload }, { call, put, select }) {
      const { connectParameter } = yield select((state) => state.standingBookAdd)
      let { connectAddPageData, values } = payload
      let data = {
        ...connectParameter,
        ...values,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'connectAddPageData',
          url: `${apiPrefix}/spareparts/getlistdata`,
          pageInfo: connectAddPageData,
          ...data,
        },
      })

      yield put({
        type: 'getConnectPageInfoSuccess',
        payload: {
          data: data,
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
        payload: {
          valueField: 'flowworkList',
          url: `${apiPrefix}/flowwork/getauditorlist?FlowTypeString=PurchasePlan`,
        },
      })
    },
  },
  reducers: {
    basicInfosChange(state, { payload }) {
      return {
        ...state,
        basicInfos: {
          ...state.basicInfos,
          [payload.key]: payload.val,
        },
      }
    },
    getChildPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        childParameter: payload.data,
      }
    },
    getConnectPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        connectParameter: payload.data,
      }
    },
  },
})

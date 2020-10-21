/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:26:15
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 14:56:45
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'

export default modelEnhance({
  namespace: 'basicDataAdd',

  state: {
    filePageData: PageHelper.create(),
    imageList: [],
    flowworkList: [],
    basicInfos: {},
    details: {},
    typeList: [],
    unitList: [],
    brandList: [],
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/Comsumables/subBasicDataAdd`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              details: {},
              imageList: [],
              flowworkList: [],
              filePageData: PageHelper.create(),
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let { filePageData, imageList, details } = yield select((state) => state.basicDataAdd)
      let { id } = payload
      if (id) {
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              imageList = details.imageList ? details.imageList : []
              filePageData.list = details.attachmentList ? details.attachmentList : []
              put({
                type: '@change',
                payload: {
                  filePageData,
                  imageList,
                },
              })
            },
          },
        })
      }
    },
    // 保存采购计划新增
    *save({ payload }, { call, put, select }) {
      const { basicInfos, imageList, filePageData } = yield select((state) => state.basicDataAdd)
      let { success, id } = payload
      let postData = {
        ...basicInfos,
        imageList: imageList,
        attachmentList: filePageData.list,
      }

      if (id) {
        postData.id = id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/spareparts/submit`,
          data: postData,
          success: () => {
            success()
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
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/spareparts/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
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
  },
})

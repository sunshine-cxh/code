/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:48:59
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-10 10:49:11
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'recipientsReturn',

  state: {
    orderTableList: PageHelper.create(),
    filePageData: PageHelper.create(),
    details: {},
    selectedRow: [],
    selectedRowKeys: [],
    allUserList: [],
    organizationTree: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/recipients/subSecipientsReturn`) {
          dispatch({
            type: '@change',
            payload: {
              details: {},
              orderTableList: PageHelper.create(),
              filePageData: PageHelper.create(),
              checkHis: []
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { orderTableList, filePageData } = yield select((state) => state.recipientsReturn)
      let { id } = payload
      if (id) {
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
              orderTableList.list = details.equipmentDataList ? details.equipmentDataList : []
              filePageData.list = details.fileDataList ? details.fileDataList : []
              put({
                type: '@change',
                payload: {
                  filePageData,
                  orderTableList,
                },
              })
            },
          },
        })
      }
    },
    // 归还设备
    *returnEquipment({ payload }, { call, put, select }) {
      let { entitys, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentcollar/altercollar`,
          data: entitys,
          success: (details) => {
            success(details)
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
          url: `${apiPrefix}/equipmentcollar/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
  },
  reducers: {},
})

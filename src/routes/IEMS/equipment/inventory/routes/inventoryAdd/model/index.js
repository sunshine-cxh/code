/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:13:13
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'inventoryAdd',

  state: {
    userParameters: {},
    appPageData: PageHelper.create(),
    organizationTree: [],
    typeList: [],
    locationList: [],
    basicInfos: {},
    userList: PageHelper.create(),
    allUserList: [],
    details: {scopeType: 1},
    gasList: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/inventory/subInventoryAdd`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              details: {scopeType: 1}
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { details } = yield select((state) => state.inventoryAdd)
      let { id, success } = payload
      if(id){
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
            success: (details) => {
            }
          },
        })
      }
    },
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/equipmentinventory/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
    // 提交采购计划新增
    *submit({ payload }, { call, put, select }) {
      const { basicInfos } = yield select((state) => state.inventoryAdd)

      let { success, id } = payload
      let postData = {
        ...basicInfos,
      }
      if (id) {
        postData.id = id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentinventory/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
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
    *getUserInfos({ payload }, { call, put, select }) {
      const { userParameters } = yield select((state) => state.inventoryAdd)
      let { userList, values } = payload
      let data = {
        ...userParameters,
        ...values,
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'userList',
          url: `/iams/user/getlistdata`,
          pageInfo: userList,
          ...data,
        },
      })

      yield put({
        type: 'getUserPageInfoSuccess',
        payload: {
          data: data,
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
    getUserPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        userParameter: payload.data,
      }
    },
  },
})

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-04 17:43:23
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'inventoryOperat',

  state: {
    inventoryPageData: PageHelper.create(),
    organizationTree: [],
    flowworkList: [],
    locationList: [],
    basicInfos: {},
    details: PageHelper.create(),
    inventoryRowKeys: [],
    inventoryRows: [],
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/inventory/subInventoryOperat`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              details: PageHelper.create(),
              inventoryRowKeys: [],
              inventoryRows: [],
              inventoryPageData: PageHelper.create(),
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let { id, success } = payload
      if (id) {
        yield put.resolve({
          type: 'getDetailsForm',
          payload: {
            id,
            pageData: PageHelper.create(),
            success: (details) => {
              success && success(details)
            },
          },
        })
      }
    },
    // 更新地址
    *changeSite({ payload }, { call, put, select }) {
      let { success, id, ledgerId, inventoryLocation, detailRemark } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentinventory/updateinventorylocation`,
          data: { id, ledgerId, inventoryLocation, detailRemark },
          success: () => {
            success()
          },
        },
      })
    },
    // 提交采购计划新增
    *submit({ payload }, { call, put, select }) {
      let { success, id, ids, type } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentinventory/updateinventorystatus`,
          data: { id, ledgerIds: ids, type },
          success: () => {
            success()
          },
        },
      })
    },
    *getDetailsForm({ payload }, { call, put, select }) {
      let { id, locationId, orgId, status, success, pageData } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/equipmentinventory/getdetailForm?id=${id}`,
          pageInfo: pageData,
          entity: {
            id,
            locationId,
            orgId,
            status,
          },
          success: (details) => {
            success(details)
          }
          
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

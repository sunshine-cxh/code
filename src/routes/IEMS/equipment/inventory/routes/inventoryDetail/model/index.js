/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:48:59
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-05 17:03:47
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import $$ from 'cmn-utils'
export default modelEnhance({
  namespace: 'inventoryDetail',

  state: {
    orderTableList: PageHelper.create(),
    fileTableList: PageHelper.create(),
    details: PageHelper.create(),
    brandList: [],
    unitList: [],
    supplyList: [],
    operatePageData: PageHelper.create(),
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routesPrefix}/inventory/subinventoryDetail`) {
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let { id, success } = payload
      if (id) {
        yield put.resolve({
          type: 'getDetails',
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
    // 获取详情
    *updateSite({ payload }, { call, put, select }) {
      let { id, success, installationSite } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/equipmentledger/updateinstallationsite`,
          data: {
            ledgerId: id,
            installationSite: installationSite,
          },
          success: (details) => {
            success(details)
          },
        },
      })
    },
    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, status, success, pageData } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/equipmentinventory/getdetailForm?id=${id}`,
          pageInfo: pageData,
          entity: {
            id,
            status,
          },
          success: (details) => {
            success(details)
          },
        },
      })
    },
  },
  reducers: {},
})

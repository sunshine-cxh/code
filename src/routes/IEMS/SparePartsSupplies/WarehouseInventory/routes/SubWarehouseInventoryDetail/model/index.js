/*
 * @Descripttion : 入库管理详情页面的model
 * @Author       : caojiarong
 * @Date         : 2020-04-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-28 10:09:25
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'warehouseInventoryDetail',

  state: {
    pageData: PageHelper.create(),
    details: []
  },
  effects: {
    // 获取仓库详情
    *getWarehouseDetail({ payload }, { call, put, select }){
      let code = payload.id
      let data = []
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          data = response.detailList
        },
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/warehouseinventory/getdetail?id=${code}`
        }
      })

      yield put({
        type: 'setPageData',
        payload: {
          data:data
        }
      })

    },

  }

  // reducers: {
  //   setPageData(state, { payload }){
  //     return {
  //       ...state,
  //       list: payload.data
  //     }
  //   }
  // }
})

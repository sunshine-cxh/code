/*
 * @Descripttion : 库存台账详情页面的model
 * @Author       : caojiarong
 * @Date         : 2020-05-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-06 17:07:33
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../../../config'

export default modelEnhance({
  namespace: 'inventoryLedgerDetail',

  state: {
    pageData: PageHelper.create(),
    replaceData: PageHelper.create(),
    deviceData: PageHelper.create(),
    details: {}
  },
  effects: {
    // 获取台账详情
    *getInventoryDetail({ payload }, { call, put, select }){
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/warehousewarning/getwarehoseaccountsdetail`,
          data:{id:payload.id}
          // success: ()=> {
          //   success()
          // }
        }
      })

      // yield put({
      //   type: 'setPageData',
      //   payload: {
      //     data:data
      //   }
      // })

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

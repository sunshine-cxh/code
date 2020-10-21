/*
 * @Descripttion : 出库管理详情页面的model
 * @Author       : caojiarong
 * @Date         : 2020-05-14 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:20:43
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'outWarehouseDetail',

  state: {
    pageData: PageHelper.create(),
    details: [],
    filePageData:PageHelper.create(),
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
          url: `${apiPrefix}/warehouseout/getdetail?id=${code}`
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
})

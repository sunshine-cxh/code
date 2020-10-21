/*
 * @Descripttion : 报修工单页面的model
 * @Author       : caojiarong
 * @Date         : 2020-06-02 17:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-24 10:55:29
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'repairOrderDetail',

  state: {
    pageData: PageHelper.create(),
    itemList: PageHelper.create(),
    details: []
  },
  effects: {
    // 获取巡检标准详情
    *getDetail({ payload }, { call, put, select }){
      let {id} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/equipmentrepair/getdetail?id=${id}`
        }
      })

    }
  }
})

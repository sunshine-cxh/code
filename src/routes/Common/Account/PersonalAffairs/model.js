/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-22 15:21:37
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-30 15:31:00
 */ 
import $$ from 'cmn-utils'
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from './config'

export default modelEnhance({
  namespace: 'checkGlobal',

  state: {
  },

  effects: {
    // 获取审核列表
    *getPurchaseplanDetails({ payload }, { call, put, select }){
      let { id, success } = payload
      let data = yield $$.post(`${apiPrefix}/purchaseplan/getdetail?id=${id}`)
      console.log("*getCheckType -> data", data)
      success(data)
    },
    *getPurchaseapplyDetails({ payload }, { call, put, select }){
      let { id, success } = payload
      let data = yield $$.post(`${apiPrefix}/purchase/getdetail?id=${id}`)
      console.log("*getCheckType -> data", data)
      success(data)
    },
    //
    *getMoveDetails({ payload }, { call, put, select }){
      let { id, success } = payload
      let data = yield $$.post(`${apiPrefix}/equipmentallocation/getdetail?id=${id}`)
      console.log("*getCheckType -> data", data)
      success(data)
    },
    *getSellDetails({ payload }, { call, put, select }){
      let { id, success } = payload
      let data = yield $$.post(`${apiPrefix}/equipmentsold/getdetail?id=${id}`)
      console.log("*getCheckType -> data", data)
      success(data)
    },
    *getScrapDetails({ payload }, { call, put, select }){
      let { id, success } = payload
      let data = yield $$.post(`${apiPrefix}/equipmentscrap/getdetail?id=${id}`)
      console.log("*getCheckType -> data", data)
      success(data)
    },
    *getPickingDetails({ payload }, { call, put, select }){
      let { id, success } = payload
      let data = yield $$.post(`${apiPrefix}/stkpicking/getdetail?id=${id}`)
      console.log("*getCheckType -> data", data)
      success(data)
    },
    *getRepairDetails({ payload }, { call, put, select }){
      let { id, success } = payload
      let data = yield $$.post(`${apiPrefix}/equipmentrepaircommission/getdetail?id=${id}`)
      console.log("*getCheckType -> data", data)
      success(data)
    },
  },

  reducers: {},
})
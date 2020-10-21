/*
 * @Descripttion : 子系统公用model
 * @Author       : wuhaidong
 * @Date         : 2020-06-02 16:25:49
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-30 15:25:48
 */
import $$ from 'cmn-utils'
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from './config'
import { func } from 'prop-types'

export default modelEnhance({
  namespace: 'equipmentGlobal',

  state: {
    checkType: [], // 审批类型
  },

  effects: {
    // 获取审核列表
    *getCheckType({ payload }, { call, put, select }){
      let { namespace, valueField } = payload
      let data = yield $$.post('/iams/flowwork/getaudittype')
      console.log("*getCheckType -> data", data)
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: data
        }
      })
    },
    // 获取供应商
    *getSupply({ payload }, { call, put, select }){
      let { namespace, valueField } = payload
      let data = yield $$.post(`${apiPrefix}/supplier/getselectordata`)
      let result = Format.selectDictFormat(data, 'id', 'name')
      console.log("*getUnit -> result", result)
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: result
        }
      })
    },
    // 获取单位
    *getUnit({ payload }, { call, put, select }){
      let { namespace, valueField, success } = payload
      let data = yield $$.post(`${apiPrefix}/unit/getselectordata`)
      let result = Format.selectDictFormat(data, 'id', 'name')
      console.log("*getUnit -> result", result)
      
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: result
        }
      })
    },
    // 获取品牌
    *getBrand({ payload }, { call, put, select }){
      let { namespace, valueField } = payload
      let data = yield $$.post(`${apiPrefix}/brand/getselectordata`)
      let result = Format.selectDictFormat(data, 'id', 'name')
      console.log("*getUnit -> result", result)
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: result
        }
      })
    },
    // 获取存放位置列表
    *getLocation({ payload }, { call, put, select }){
      let { namespace, valueField } = payload
      let data = yield $$.post(`${apiPrefix}/location/getselectordata`)
      console.log("*getLocation -> data", data)
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: data
        }
      })
    },
    // 获取列表
    *getType({ payload }, { call, put, select }){
      let { namespace, valueField, type } = payload

      if(!type) {
        type = 1
      }
      let data = yield $$.post(`${apiPrefix}/equipmentcategory/getselectordata?Type=${type}`)
      console.log("*getType -> data", data)
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: data
        }
      })
    },
    // 获取所属部门
    *getAllOrganization({ payload }, { call, put }) {
      let { namespace, valueField, enterpriseId } = payload
      let data = yield $$.post(`/iams/organization/getselectordata?enterpriseId=${enterpriseId}`)
      console.log("*getAllOrganization -> data", data)
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: data
        }
      })
    },
    // 获取所有用户
    *getUser({ payload }, { call, put }) {
      let { namespace, valueField } = payload
      let data = yield $$.post(`/iams/user/getlistdata`, {
        pagination: PageHelper.create().startPage(1, 10000)
      })
      console.log("*getUser -> data", data)
      let result = Format.selectDictFormat(data.rows, 'id', 'realName')
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: result
        }
      })
    },
    // 获取地址
    *getAddress({ payload }, { call, put }) {
      let { namespace, valueField } = payload
      let data = yield $$.post(`/iams/address/getselectordata`)
      console.log("*getUser -> data", data)
      yield put({
        type: `${namespace}/@change`,
        payload: {
          [valueField]: data
        }
      })
    },
  },

  reducers: {},
})
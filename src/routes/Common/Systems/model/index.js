/*
 * @Descripttion : 子系统列表
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:09:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-04-08 16:47:34
 */

import $$ from 'cmn-utils';
import { getSystems } from '../service'

export default {
  namespace: 'systems',

  state: {
    clients: []
  },

  subscriptions: {},

  effects: {
    //获取系统列表，保存在本地localstorage
    *getSystems({ payload }, { call, put }) {
      let data = yield call(getSystems, payload)
      $$.setStore('clients', data)
      yield put({
        type: 'getSystemsSuccess',
        payload: data
      })
    },

  },

  reducers: {
    getSystemsSuccess(state, { payload }) {
      return {
        ...state,
        clients: payload,
      };
    }
  }
};

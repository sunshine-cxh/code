/*
 * @Descripttion : 登录
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:09:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-24 08:59:07
 */
import { routerRedux } from 'dva/router'
import { login } from '../service'
import $$ from 'cmn-utils'

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {},
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user')
        }
      })
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const data = yield call(login, payload)
        $$.setStore('user', data.user).setStore('token', data.token)

        yield put.resolve({
          type: 'global/getUserInfo',
        })

        yield put(routerRedux.replace('/sign/systems'))
      } catch (e) {
        yield put({
          type: 'loginError',
        })
      }
    },
    *logout(_, { put }) {},
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload,
      }
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message,
      }
    },
  },
}

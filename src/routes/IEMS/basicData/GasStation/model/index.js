/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-27 18:46:45
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 09:24:20
 */ 
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'gasstation',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    popoverVisible: false,
    isCurrentRoute: false,
    addressList: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname === `${routesPrefix}/gasstation`,
          },
        })
      })
    },
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select((state) => state.gasstation)
      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData: pageData.startPage(1, 10, 'SortId', 'asc') },
      })
    },
    *handleChangeState({ payload }, { call, put }) {
      yield put({
        type: '@change',
        payload: {
          ...payload
        }
      })
    },
    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/gasstation/getlistdata`,
          pageInfo: pageData,
          ...values,
        },
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.gasstation)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/gasstation/submit`,
          data: values,
          success: () => {
            success && success()
          },
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { pageData } = yield select((state) => state.gasstation)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/gasstation/delete?id=${id}`,
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
      success()
    },
  },

  reducers: {
  },
})

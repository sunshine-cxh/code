/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-07 16:14:14
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix ,routePrefix} from '../../../config'

export default modelEnhance({
  namespace: 'Message',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    details: {},
    isCurrentRoute: false,
    flowchart: [],
    basicInfos:{}
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute:
              pathname == `${routePrefix}/message` ? true : false,
          },
        })
      })
    },
  },
  effects: {
    // 获取留言管理列表
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select((state) => state.Message)
      let { pageData, values,success } = payload
      let data = {
        ...parameters,
        ...values,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/webmessage/getlistdata`,
          pageInfo: pageData,
          ...data,
          success: () => {
            success && success()
          },
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          data: data,
        },
      })
    },
    *handleChangeState({ payload }, { call, put }) {
      yield put({
        type: '@change',
        payload: {
          ...payload,
        },
      })
    },
    *init({ payload }, { call, put, select }) {
      const { parameters, pageData } = yield select((state) => state.Message)

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData,
        },
      })
    },

    // 获取详情
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/webmessage/getdetail?id=${id}`,
          success: () => {
            success && success()
          },
        },
      })
    },

    // 删除内容
    *delete({ payload }, { call, put, select }) {
      let { id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/webmessage/delete?id=${id}`,
          data: payload,
        },
      })
      const { parameters, pageData } = yield select((state) => state.Message)

      yield put({
        type: 'getPageInfo',
        payload: {
          values: parameters,
          pageData,
        },
      })
    },

  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload.data,
      }
    },
  },
})

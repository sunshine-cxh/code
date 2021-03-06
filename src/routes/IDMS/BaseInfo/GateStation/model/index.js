/*
 * @Descripttion : 门站信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 10:38:18
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-16 18:37:18
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../config'

export default modelEnhance({
  namespace: 'gateStation',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    type:2
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: '@change',
          payload: {
            isCurrentRoute: pathname == routePrefix+'/gateStation' ? true : false,
          }
        })
      });
    }
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select((state) => state.gateStation)
      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData: pageData.startPage(1, 10), values:{} },
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters,type } = yield select((state) => state.gateStation)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values,
        entity:{
          type
        }
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/stationpoint/getlistdata`,
          pageInfo: pageData,
          ...data,
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })
    },

    // 新增/修改   TODO异步问题---------提交成功，返回的数据还没有变化
    *submit({ payload }, { call, put, select }) {
      let { type } = yield select((state) => state.gateStation)
      let { values, success } = payload
      values.type = type
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/stationpoint/submit`,
          data: values,
          success: () => {
            success && success()
          },
        },
      })

    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { pageData } = yield select((state) => state.gateStation)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/stationpoint/delete?id=${id}`,
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
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload,
      }
    },
  },
})

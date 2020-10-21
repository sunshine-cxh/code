/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 15:35:15
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-09-04 18:39:49
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../config'

export default modelEnhance({
  namespace: 'codeRule',

  state: {
    parameters: {
      keyword: '',
      entity: {},
    },
    pageData: PageHelper.create(),
    popoverVisible: false, // 筛选popover显隐控制
    isCurrentRoute: false, // 判断是否为当前主页面
    enterprises: [], // 企业列表
    codeRuleEntity: [], // 对应模块
    toolbarSelectorValue: null,
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: '@change',
          payload: {
            isCurrentRoute: pathname == `${routePrefix}/codeRule` ? true : false,
          },
        })
      })
    },
  },

  effects: {
    *init({ payload }, { call, put, select }) {
      // 获取企业列表
      yield put.resolve({
        type: 'iamsGlobal/getEnterprises',
        payload: {
          namespace: 'codeRule',
          valueField: 'enterprises',
        },
      })

      // 获取对应模块列表
      yield put.resolve({
        type: 'global/getMasterDataItem',
        payload: {
          namespace: 'codeRule',
          valueField: 'codeRuleEntity',
          category: 'codeRuleEntity',
        },
      })

      let { enterprises, pageData } = yield select((state) => state.codeRule)
      enterprises.unshift({
        code: 'default',
        codeName: '系统系统编码',
      })

      yield put.resolve({
        type: '@change',
        payload: {
          toolbarSelectorValue: enterprises.length > 0 ? enterprises[0].code : '',
        },
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: {
          pageData,
        },
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { parameters, toolbarSelectorValue } = yield select((state) => state.codeRule)
      let { pageData, values } = payload
      parameters = {
        ...parameters,
        ...values,
        entity: {
          enterpriseId: toolbarSelectorValue,
        },
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/coderule/getlistdata`,
          pageInfo: pageData,
          ...parameters,
        },
      })

      yield put.resolve({
        type: 'getPageInfoSuccess',
        payload: {
          ...parameters,
        },
      })
    },

    // 复制
    *copyItem({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/coderule/copysubmit?id=${id}`,
        },
        success: (response) => {
          success && success()
        },
      })
    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id } = payload
      let { pageData } = yield select((state) => state.codeRule)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/coderule/delete?id=${id}`,
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })
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

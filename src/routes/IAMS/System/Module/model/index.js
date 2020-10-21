/*
 * @Descripttion : 系统模块 model
 * @Author       : wuhaidong
 * @Date         : 2020-01-04 08:06:34
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-17 20:59:45
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from '@/utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'module',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    listData: [], //表格data
    clientList: [], //客户端列表
    moduleTypeTree: [], //上级类别tree
    expandedRowKeys: [],
    toolbarSelectorValue: '',
    functionPageData: PageHelper.create(), //功能分页
    functionParameters: {}, //功能搜索params
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select((state) => state.module)
      yield put.resolve({
        type: 'getClient',
        payload: {
          pageData: pageData.startPage(1, 10000), // 获取客户端列表，一次性取完，所以取一页10000条。
        },
      })

      let { toolbarSelectorValue } = yield select((state) => state.module)

      yield put.resolve({
        type: 'getModuleTypeTree',
        payload: {
          clientId: toolbarSelectorValue,
        },
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: {},
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { parameters, toolbarSelectorValue } = yield select(
        (state) => state.module
      )
      let { values } = payload
      let data = {
        clientId: toolbarSelectorValue,
        ...parameters,
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'listData',
          url: `${apiPrefix}/module/getlistdata?clientId=${data.clientId}`,
          data: data,
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })

      let { listData } = yield select((state) => state.module)

      yield put({
        type: '@change',
        payload: {
          expandedRowKeys: Format.multiToKeysFormat(listData),
        },
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData, toolbarSelectorValue } = yield select(
        (state) => state.module
      )
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/module/submit`,
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

      yield put({
        type: 'getModuleTypeTree',
        payload: {
          clientId: toolbarSelectorValue,
        },
      })
    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id } = payload
      let { pageData, toolbarSelectorValue } = yield select(
        (state) => state.module
      )
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/module/delete?id=${id}`,
        },
      })

      yield put({
        type: 'getPageInfo',
        payload: { pageData },
      })

      yield put({
        type: 'getModuleTypeTree',
        payload: {
          clientId: toolbarSelectorValue,
        },
      })
    },

    //获取客户端类型
    *getClient({ payload }, { call, put, select }) {
      let { pageData } = payload
      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          return Format.selectDictFormat(response.list, 'id', 'clientName')
        },
        payload: {
          valueField: 'clientList',
          url: `${apiPrefix}/client/getlistdata`,
          pageInfo: pageData,
        },
      })

      let { clientList } = yield select((state) => state.module)
      yield put({
        type: '@change',
        payload: {
          toolbarSelectorValue: clientList.length > 0 ? clientList[0].code : '',
        },
      })
    },

    //获取上级类别tree
    *getModuleTypeTree({ payload }, { put }) {
      let { clientId, success } = payload

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'moduleTypeTree',
          url: `${apiPrefix}/module/getselectordata?clientId=${clientId}`,
        },
      })

      success && success()
    },

    //获取模块功能列表
    *getFunctionPageInfo({ payload }, { call, put, select }) {
      const { functionParameters } = yield select((state) => state.module)
      let { functionPageData, values, success } = payload
      let data = {
        ...functionParameters,
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'functionPageData',
          url: `${apiPrefix}/modulefunction/getlistdata?moduleId=${data.id}`,
          pageInfo: functionPageData,
          ...data,
        },
      })

      yield put({
        type: 'getFunctionPageInfoSuccess',
        payload: {
          ...data,
        },
      })

      success && success()
    },

    //保存模块功能列表
    *functionSubmit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { functionPageData } = yield select((state) => state.module)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: false,
          url: `${apiPrefix}/modulefunction/submit`,
          data: values,
        },
      })

      yield put.resolve({
        type: 'getFunctionPageInfo',
        payload: {
          functionPageData,
          success: () => {},
        },
      })

      success()
    },

    //功能模块删除
    *functionDelete({ payload }, { call, put, select }) {
      let { id } = payload
      let { functionPageData } = yield select((state) => state.module)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: false,
          url: `${apiPrefix}/modulefunction/delete?id=${id}`,
        },
      })

      yield put({
        type: 'getFunctionPageInfo',
        payload: {
          functionPageData,
        },
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
    getFunctionPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        functionParameters: payload,
      }
    },
  },
})

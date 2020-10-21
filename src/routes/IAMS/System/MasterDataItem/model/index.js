/*
 * @Descripttion : 数据字典
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-04-16 10:37:15
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'masterDataItem',

  state: {
    parameters: { keyword: '' },
    pageData: PageHelper.create(),
    masterDataTree: [], //数据字典树
    masterDataType: [], //数据字典类型
    masterDataTreeActiveValue: '', //数据字典树当前点击值
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select(state => state.masterDataItem)

      yield put.resolve({
        type: 'getMasterDataTree',
      })

      yield put.resolve({
        type: 'getMasterDataType',
        payload: {
          category: 'masterData'
        }
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { parameters, masterDataTree } = yield select(state => state.masterDataItem)
      let { pageData, values } = payload
      let data = {
        category: masterDataTree.length > 0 ? masterDataTree[0].key : 'masterData', //init
        ...parameters,
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/masterdataitem/getlistdata?category=${data.category}`,
          pageInfo: pageData,
          ...data,
        }
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data
        }
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select(state => state.masterDataItem)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/masterdataItem/submit`,
          data: values,
          success: () => {
            success && success()
          }
        }
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },

    //删除
    *delete({ payload }, { call, put, select }) {
      let { id } = payload
      let { pageData } = yield select(state => state.masterDataItem)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/masterdataitem/delete?id=${id}`
        }
      })

      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData }
      })
    },

    //get masterdata tree
    *getMasterDataTree({ paload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'masterDataTree',
          url: `${apiPrefix}/masterdata/gettreedata`,
        }
      })

      let { masterDataTree } = yield select(state => state.masterDataItem)
      yield put.resolve({
        type: '@change',
        payload: {
          masterDataTreeActiveValue: masterDataTree[0].key
        }
      })
    },

    //获取字典类型,新增修改要用到
    *getMasterDataType({ payload }, { call, put }) {
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'masterDataType',
          url: `${apiPrefix}/masterdata/getselectordata`
        }
      })

      success && success()
    },

  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload
      }
    }
  }
})

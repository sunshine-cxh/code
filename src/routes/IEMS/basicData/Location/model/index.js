
import modelEnhance from 'utils/modelEnhance'
import Format from 'utils/format'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'location',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    listData: [], //表格数据
    locationType: [], //数据字典类型
    expandedRowKeys: [] //表格树收缩keys
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { put }) {
      yield put.resolve({
        type: 'getLocationType'
      })

      yield put({
        type: 'getPageInfo',
        payload: {}
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { put, select }) {
      let { parameters } = yield select(state => state.location)
      let { values } = payload
      let data = {
        ...parameters,
        ...values
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'listData',
          url: `${apiPrefix}/location/getlistdata`,
          data: data
        }
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data
        }
      })

      let { listData } = yield select(state => state.location)

      yield put({
        type: '@change',
        payload: {
          expandedRowKeys: Format.multiToKeysFormat(listData)
        }
      })
    },

    // 新增/修改
    *submit({ payload }, { put, }) {
      let { values, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/location/submit`,
          data: values,
          success: () => {
            success && success()
          }
        }
      })

      yield put({
        type: 'init',
        payload: {}
      })
    },


    //删除
    *delete({ payload }, { put }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/location/delete?id=${id}`
        }
      })

      yield put({
        type: 'init',
        payload: {}
      })

      success && success()
    },

    //获取数据字典类型
    *getLocationType({ payload }, { put }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'locationType',
          url: `${apiPrefix}/location/getselectordata`
        }
      })
    }
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

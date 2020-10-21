/*
 * @Descripttion : 数据字典类别
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-29 15:50:47
 */
import modelEnhance from 'utils/modelEnhance'
import Format from 'utils/format'
import { apiPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'equipmentcategory',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    listData: [], //表格数据
    equipmentcategoryType: [], //数据字典类型
    expandedRowKeys: [], //表格树收缩keys
  },

  subscriptions: {},

  effects: {
    // 进入页面加载
    *init({ payload }, { put }) {
      yield put.resolve({
        type: 'getEquipmentcategoryType',
      })

      yield put({
        type: 'getPageInfo',
        payload: {},
      })
    },

    // 获取分页数据
    *getPageInfo({ payload }, { put, select }) {
      let { parameters } = yield select((state) => state.equipmentcategory)
      let { values } = payload
      let data = {
        ...parameters,
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'listData',
          url: `${apiPrefix}/equipmentcategory/getlistdata`,
          data: data,
        },
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })

      let { listData } = yield select((state) => state.equipmentcategory)

      yield put({
        type: '@change',
        payload: {
          expandedRowKeys: Format.multiToKeysFormat(listData),
        },
      })
    },

    // 新增/修改
    *submit({ payload }, { put }) {
      let { values, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/equipmentcategory/submit`,
          data: values,
          success: () => {
            success && success()
          },
        },
      })

      yield put({
        type: 'init',
        payload: {},
      })
    },

    //删除
    *delete({ payload }, { put }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/equipmentcategory/delete?id=${id}`,
        },
      })

      yield put({
        type: 'init',
        payload: {},
      })

      success && success()
    },

    //获取数据字典类型
    *getEquipmentcategoryType({ payload }, { put }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'equipmentcategoryType',
          url: `${apiPrefix}/equipmentcategory/getselectordata`,
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
  },
})

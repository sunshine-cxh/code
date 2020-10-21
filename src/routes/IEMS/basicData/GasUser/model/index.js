/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-27 18:46:45
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 09:29:48
 */ 
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'gasuser',

  state: {
    parameters: { keyword: '' }, //接收接口传参
    pageData: PageHelper.create(),
    popoverVisible: false,
    isCurrentRoute: false,
    gasStationList: [],
    addressList: [],
    gasUserTypeList: []
    
  },

  subscriptions: {
    setup({ history, dispatch }) {
      
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname === `${routesPrefix}/gasuser`,
          },
        })
      })
    },
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      let { pageData } = yield select((state) => state.gasuser)
      yield put.resolve({
        type: 'getPageInfo',
        payload: { pageData: pageData.startPage(1, 10, 'SortId', 'asc') },
      })
      yield put.resolve({
        type: 'getGasStationList',
        payload: { success: (res)=> {console.log(res)}},
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
    // 从数据字典中获取用气用户类型
    *getGasUserType({ payload }, { call, put }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'gasuser',
          valueField: 'gasUserTypeList',
          category: 'gasUserType',
        }
      })
    },
    *getGasStationList({ payload }, { call, put, select }) {
      let { success } = payload
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'gasStationList',
          url: `${apiPrefix}/gasstation/getlist`,
          success: (res)=> {
            success(res)
          }
        },
      })
    },
    
    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/gasuser/getlistdata`,
          pageInfo: pageData,
          ...values,
        },
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.gasuser)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/gasuser/submit`,
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
      let { pageData } = yield select((state) => state.gasuser)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/gasuser/delete?id=${id}`,
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

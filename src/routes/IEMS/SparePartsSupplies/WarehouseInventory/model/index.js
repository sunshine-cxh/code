/*
 * @Descripttion : 仓库盘点列表页面的数据管理页
 * @Author       : caojiarong
 * @Date         : 2020-05-08 10:48:49
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:22:01
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'warehouseInventory',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false,   // 筛选模块显隐控制
    popoverVisible1: false,
    details: {},
    isCurrentRoute: false,
    flag: 'add',
    warehouseList:[]
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == routesPrefix+'/warehouseInventory' ? true : false,
          }
        })
      });
    }
  },

  effects: {
    *handleChangeState({ payload }, { call, put }) {
      yield put({
        type: '@change',
        payload: {
          ...payload
        }
      })
    },

    *init({ payload }, { call, put, select }) {
      const { parameters, pageData } = yield select(state => state.warehouseInventory)
      yield put({
        type: 'getPageInfo',
        payload: {
          values: {keyword:''},
          pageData: PageHelper.create(),
        }
      })
    },

    *getDetails({ payload }, { call, put, select }) { //----------------------
      let {id, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/warehouseinventory/getdetail?id=${id}`,
          success: ()=> {
            success()
          }
        }
      })
    },

    // *revoke({ payload }, { call, put, select }) {
    //   let {id} = payload
    //   yield put.resolve({
    //     type: '@request',
    //     payload: {
    //       url: `${apiPrefix}/warehousein/delete?id=${id}`,
    //       success: ()=> {
    //         payload.success()
    //       }
    //     }
    //   })

    // },
    
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select(state => state.warehouseInventory)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/warehouseinventory/getlistdata`,
          pageInfo: pageData,
          ...data
        }
      })

      yield put({
        type: 'getPageInfoSuccess',
        payload: {
          data: data
        }
      })
    },

    // 获取仓库列表
    *getWarehouse({ payload }, { call, put, select }){
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'warehouseList',
          url: `${apiPrefix}/warehouse/getselectordata`
        }
      })
    },

    // 跳转到入库管理详情
    *toInWarehouse({ payload }, { call, put, select }){
      let {id, success} = payload
      yield put.resolve({
        type: '@request',
        payload:{
          url: `${apiPrefix}/warehousein/getdetail?id=${id}`,
          success: ()=>{
            success()
          }
        }
      })
    },

    // 跳转到出库管理详情
    *toOutWarehouse({ payload }, {call, put, select}){
      let {id, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/warehouseout/getdetail?id=${id}`,
          success: ()=>{
            success()
          }
        }
      })
    }

  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload.data
      }
    },
    // 控制筛选框显隐
    popoverVisibleeChange(state, { payload }) {
      return {
        ...state,
        popoverVisible: payload.value
      }
    },
    popoverVisibleChange1(state, { payload }) {
      return {
        ...state,
        popoverVisible1: payload.value
      }
    },
    changeFlag(state, { payload }) {
      return {
        ...state,
        flag: payload.value
      }
    }
  }
})

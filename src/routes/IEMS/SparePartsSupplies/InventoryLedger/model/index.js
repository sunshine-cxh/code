/*
 * @Descripttion : 库存台账model
 * @Author       : caojiarong
 * @Date         : 2020-05-22 13:01:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:18:50
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'inventoryLedger',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false,   // 采购计划/筛选 popover 显隐控制
    details: {},
    treeData: [],
    isCurrentRoute: false,
    checkedKeys: [],
    details: {},
    warehouseList:[]
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == routesPrefix+'/inventoryLedger' ? true : false,
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
      const { parameters, pageData } = yield select(state => state.inventoryLedger)

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData
        }
      })
      yield put({
        type: 'getTree',
        payload: {}
      })
    },
    // 获取库存台账列表 -------------
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select(state => state.inventoryLedger)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/warehousewarning/getwarehoseaccountslistdata`,
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
      // 获取搜索 treeData 用于搜索可选列表
    *getTree({ payload }, { call, put, select }){
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'treeData',
          url: `${apiPrefix}/equipmentcategory/getselectordata?Type=2`,
          success:()=>{
            success && success()
          }
        }
      })
    },
    // 获取仓库列表
    *getWarehouse({ payload }, { call, put, select }) { //----------------------
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
    
    *getDetails({ payload }, { call, put, select }) { //----------------------
      let {id, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/warehousewarning/getwarehoseaccountsdetail`,
          data:{code:id},
          success: ()=> {
            success()
          }
        }
      })
    },
  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload.data
      }
    }
  }
})

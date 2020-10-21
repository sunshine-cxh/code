/*
 * @Descripttion : 管段管理数据处理层
 * @Author       : caojiarong
 * @Date         : 2020-08--25 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-04 15:26:16
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import {apiPrefix, routePrefix} from '../../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'keyUserApproval',

  state: {
    pageData: PageHelper.create(),
    historyPageData: PageHelper.create(),
    popoverVisible:false,
    isCurrentRoute:true,
    parameters:{
    },
    historyData:{},
    moduleList:[],
    clientList:[]
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: '@change',
          payload: {
            isCurrentRoute: pathname == routePrefix+'/keyUserApproval' ? true : false,
          }
        })
      });
    }
  },

  effects: {
    // 初始化数据
    *init({payload}, { call, put, select }){
      yield put({
        type: 'getPageData',
        payload:{
          values:{keyword:''},
          pageData:PageHelper.create()
        }
      })

      yield put({
        type:'getModulList'
      })

      yield put({
        type:'getHistoryData',
        payload:{
          dateType:1
        }
      })

      yield put({
        type:'getGasClient'
      })
    },

    // 获取列表
    *getPageData({ payload }, { call, put, select }){
      const { parameters } = yield select(state => state.keyUserApproval)
      let { pageData, values } = payload
      let data = {
        entity:{
          ...parameters
        },
        ...values
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/gasdeclare/approvelist`,
          pageInfo: pageData,
          ...data
        }
      })
    },

    // 获取历史审批数据列表
    *getHistoryData({ payload }, { call, put, select }){
      let { dateType } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'historyData',
          url: `${apiPrefix}/gasdeclare/declarehistorylist`,
          data:{
            dateType
          }
        }
      })
    },

    // 删除数据 todo url需要修改
    *deleteFn({ payload }, { call, put, select }){
      let { id, success } = payload
      yield put.resolve({
        type:'@request',
        payload:{
          url:`${apiPrefix}/model/delete`,
          data:{
            id,
            success:()=>{
              success()
            }
          },
        }
      })

    },


    // 获取所属模块列表
    *getModulList({ payload }, { call, put, select }) {
      const { moduleList } = yield select(state => state.keyUserApproval)
      if(moduleList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'keyUserApproval',
          valueField: 'moduleList',
          category: 'modelWarehouseModul',
        }
      })
    },

    *getDetails({payload},{call,put,select}){
      let {id,success}=payload
      yield put.resolve({
        type:'@request',
        payload:{
          url:`${apiPrefix}/gasdeclare/approveDetail?id=${id}`,
          success:()=>{
            success()
          }
        }
      })
    },

    *getGasClient({payload},{call, put, select}){
      yield put.resolve({
        type:'@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload:{
          url:`${apiPrefix}/gasclient/getselectordata`,
          valueField:'clientList'
        }
      })
    }


  },

  reducers: {}
})

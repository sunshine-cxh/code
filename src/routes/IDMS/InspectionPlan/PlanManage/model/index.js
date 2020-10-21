/*
 * @Descripttion : 路线管理数据处理层
 * @Author       : caojiarong
 * @Date         : 2020-08-17 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-18 17:40:23
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import {apiPrefix, routePrefix} from '../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'PlanManage',

  state: {
    demo: [],
    pageData: PageHelper.create(),
    popoverVisible:false,
    isCurrentRoute:true,
    parameters:{
      code:'',
      name:'',
      pipelineId:''
    },
    lineStatus:[]
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: '@change',
          payload: {
            isCurrentRoute: pathname == routePrefix+'/PlanManage' ? true : false,
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

      // yield put({
      //   type:'getLineStatus'
      // })
    },

    // 获取列表
    *getPageData({ payload }, { call, put, select }){
      const { parameters } = yield select(state => state.PlanManage)
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
          url: `${apiPrefix}/inspectionroute/getlistdata`,
          pageInfo: pageData,
          ...data
        }
      })
    },

    // 删除数据 todo url需要修改
    *deleteFn({ payload }, { call, put, select }){
      let { id, success } = payload
      yield put.resolve({
        type:'@request',
        payload:{
          url:`${apiPrefix}/inspectionroute/deleteFn`,
          data:{
            id,
            success:()=>{
              success()
            }
          },
        }
      })

    },

    // 获取路线
    *getLineStatus({ payload }, { call, put, select }) {
      const { lineStatus } = yield select(state => state.PlanManage)
      if(lineStatus.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'PlanManage',
          valueField: 'lineStatus',
          category: 'lineStatus',
        }
      })
    },

    // 生成巡检点
    *generatepoint({payload},{call, put, select}){
      let {pointData}=payload
      yield put.resolve({
        type:'@request',
        payload:{
          url:`${apiPrefix}/inspectionroute/generatepoint`,
          data:{...pointData}
        }
      })
    }

  },

  reducers: {}
})

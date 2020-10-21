/*
 * @Descripttion : 模型仓数据处理层
 * @Author       : caojiarong
 * @Date         : 2020-08--25 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-03 16:33:13
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import {apiPrefix, routePrefix} from '../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'modelHouse',

  state: {
    demo: [],
    pageData: PageHelper.create(),
    popoverVisible:false,
    isCurrentRoute:true,
    // parameters:{
    //   code:'',
    //   name:'',
    //   pipelineId:''
    // },
    moduleList:[]
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: '@change',
          payload: {
            isCurrentRoute: pathname == routePrefix+'/modelWarehouse' ? true : false,
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
    },

    // 获取列表
    *getPageData({ payload }, { call, put, select }){
      const { parameters } = yield select(state => state.modelHouse)
      let { pageData, values } = payload
      let data = {
        // entity:{
        //   ...parameters
        // },
        ...values
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/model/getlistdata`,
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
      const { moduleList } = yield select(state => state.modelHouse)
      if(moduleList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'modelHouse',
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
          url:`${apiPrefix}/model/getdetail?id=${id}`,
          success:()=>{
            success()
          }
        }
      })
    }

  },

  reducers: {}
})

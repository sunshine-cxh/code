/*
 * @Descripttion : 巡检点管理数据处理层
 * @Author       : caojiarong
 * @Date         : 2020-08-17 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-20 11:16:25
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import {apiPrefix, routePrefix} from '../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'pointManage',

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
    checkMethodList:[],
    lineList:[],
    basicInfos:{}
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: '@change',
          payload: {
            isCurrentRoute: pathname == routePrefix+'/spectionPointMange' ? true : false,
          }
        })
      });
    }
  },

  effects: {
    // 初始化数据
    *init({payload}, { call, put, select }){
      let {values}=payload
      yield put({
        type: 'getPageData',
        payload:{
          values,
          pageData:PageHelper.create()
        }
      })

      yield put({
        type:'getSelectData'
      })

      yield put({
        type:'getMethodList'
      })
    },

    // 获取列表
    *getPageData({ payload }, { call, put, select }){
      const { parameters } = yield select(state => state.pointManage)
      let { pageData, values } = payload
      let data = {
        entity:{...parameters},
        ...values
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/inspectionpoint/getlistdata`,
          pageInfo: pageData,
          ...data
        }
      })
    },

    // 新增巡检点
    *submit({ payload }, { call, put, select }){
      // let { basicInfos } = yield select((state)=>state.pointManage)
      let { values, success } = payload
      let data = {...values}

      yield put.resolve({
        type: '@request',
        payload:{
          url:`${apiPrefix}/inspectionpoint/submit`,
          data,
          success:()=>{
            success()
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
          url:`${apiPrefix}/inspectionpoint/delete`,
          data:{
            id,
            success:()=>{
              success()
            }
          },
        }
      })
    },

    // 打卡方式
    *getMethodList({ payload }, { call, put, select }) {
      const { checkMethodList } = yield select(state => state.pointManage)
      if(checkMethodList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'pointManage',
          valueField: 'checkMethodList',
          category: 'checkMethod',
        }
      })
    },

    // 获取路线选择列表
    *getSelectData({ payload }, {call, put, select }){
      yield put.resolve({
        type:'@request',
        afterResponse:res=>{
          return Format.selectDictFormat(res, 'id', 'name')
        },
        payload:{
          url:`${apiPrefix}/inspectionroute/getselectordata`,
          valueField: 'lineList'
        }
      })
    },

  },

  reducers: {}
})

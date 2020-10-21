/*
 * @Descripttion : 重点用户申报
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-08 09:20:25
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix, routePrefix } from '../../../../config'
import { Select } from 'antd'


export default modelEnhance({
  namespace: 'user',

  state: {
    parameters: { keyword: '' }, //分页接口传参
    pageData: PageHelper.create(), //分页信息
    startTime: null,
    moduleList:[],
    moduleStatus:[],
    isCurrentRoute:true,
    // toolbarSelectorValue:'',
    
    
    
  },

  subscriptions: {
    setup({history,dispatch}){
      return history.listen(({pathname})=>{
        dispatch({
          type:'@change',
          payload:{
            isCurrentRoute:pathname == routePrefix+'/gasdeclare'?true : false,
          }
        })
      });
    },
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select((state) => state.user)
      
      yield put.resolve({
        type: 'getEnterprise',
        payload: {
          pageData: PageHelper.create().startPage(1, 10000), //一次性取完，所以取一页10000条。
        },
      })

      
      yield put.resolve({
        type: 'getPageInfo',
        payload: {
          pageData,
        },
      })

   
      yield put({
        type:'getModuleList',
        payload:{}

      })
     

     
    },

    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { parameters, toolbarSelectorValue } = yield select(
        (state) => state.user
      )
      console.log(parameters)
      let { pageData, values } = payload
      let data = {
        DepartmentId: toolbarSelectorValue,
        entity:{
          ...parameters
        },
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/gasdeclare/getlistdata?DepartmentId=${data.DepartmentId}`,
          pageInfo: pageData,
          ...data,
        },
      })

      yield put.resolve({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })
      yield put.resolve({
        type:'getModuleListstatus',
        payload:{
          ...data,
        }
      })
      yield put.resolve({
        type:'getModuleList',
        payload:{
          ...data,
        }
      })
    },

    // 新增/修改
    *submit({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.user)
      console.log('aaaa',values)
      values.status = parseInt(values.status)                                                                        
      values.declareType=parseInt(values.declareType)
      values.declareConsumption=parseFloat(values.declareConsumption)
      values.assignAmount=parseFloat(values.assignAmount)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/gasdeclare/submit`,
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

    //修改
    *updatePassword({ payload }, { call, put, select }) {
      let { values, success } = payload
      let { pageData } = yield select((state) => state.user)
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `${apiPrefix}/gasdeclare/submitnewpassword?id=${values.id}&newPassword=${values.password}`,
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

    *getAllDeclare({ payload }, { call, put }) {
      let { DepartmentId } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/organization/getselectordata?DepartmentId=${DepartmentId}`,
        },
      })
    },

    

    //获取所属模块状态列表
    *getModuleListstatus({payload},{call,put,select}){
      // const {moduleList} =yield select(state=>state.user)
      // if(moduleStatus.length>0) return ;
      yield put.resolve({
        type:'global/getMasterDataItem',   //获取数据字典数据
        afterResponse:response=>{
          console.log(response)
          return Format.selectDictFormat(response,'dataCode','dataName')
        },
        payload:{
          namespace:'user',
          valueField:'moduleStatus',
          category:'status',
        }

      })
    },
    
     //获取所属模块申报类型列表
     *getModuleList({payload},{call,put,select}){
      const {moduleList} =yield select(state=>state.user)
      if(moduleList.length>0) return ;
      yield put.resolve({
        type:'global/getMasterDataItem',   //获取数据字典数据
        afterResponse:response=>{
          console.log(response)
          return Format.selectDictFormat(response,'dataCode','dataName')
        },
        payload:{
          namespace:'user',
          valueField:'moduleList',
          category:'declareType',
        }

      })
    },
    
    //获取详情页的数据

    *getDetails({payload},{call,put,select}){
      let {id,success} = payload
      yield put.resolve({
        type:'@request',
        payload:{
          url:`${apiPrefix}/gasdeclare/getdetail?id=${id}`,
          success:()=>{
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
        parameters: payload,
      }
    },
  },
})

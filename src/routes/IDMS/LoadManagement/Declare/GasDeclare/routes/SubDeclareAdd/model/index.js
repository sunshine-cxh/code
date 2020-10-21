/*
 * @Descripttion : 用户申报新增页面
 * @Author       : gujitao
 * @Date         : 2020-08-25 14:12:55
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-07 16:46:54
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../../config'
import Format from 'utils/format'
import { format } from 'ol/coordinate'

export default modelEnhance({
  namespace: 'subModelAdd',

  state: {
    weatherPageData: PageHelper.create(),
    moduleList:[],
    details:{},
    weatherlist:[],
    contractList:[],

   
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routePrefix}/gasdeclare`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      let { id } = payload
      if(id){
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
          },
        })
      }

      yield put({
        type:'getModulList'
      })
      yield put({
        type:'getselectordata'
      })
     

    },
    *getDetails({ payload }, { call, put, select }) {
      let { id } = payload
      console.log(id)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/gasdeclare/getDetail?id=${id}`,
        },
      })
    },
    // 提交新增、编辑
    *submit({ payload }, { call, put, select }) {
      const { basicInfos } = yield select((state) => state.subModelAdd)
      
      basicInfos.module = parseInt(basicInfos.module)
     
      let { success, id } = payload
      
      if(id){
        basicInfos.id=id
      }
      console.log(basicInfos)
    

      //数据的处理来传递到后端
      basicInfos.declareType=parseInt(basicInfos.declareType)
      basicInfos.declareConsumption=parseFloat(basicInfos.declareConsumption)
      basicInfos.assignAmount=parseFloat(basicInfos.assignAmount)
      basicInfos.gasStartTime=basicInfos.date[0]
      basicInfos.gasEndTime=basicInfos.date[1]
      let postData = {
        ...basicInfos,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/gasdeclare/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    
    // 获取所属模块列表
    *getModulList({ payload }, { call, put, select }) {
      const { moduleList } = yield select(state => state.subModelAdd)
      if(moduleList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'subModelAdd',
          valueField: 'moduleList',
          category: 'declareType',
        }
      })
    },

    // 获取天气数据

    *getweather({payload},{call,put,select}){
     
      
      yield put.resolve({
        type:'@request',
        afterResponse:res=>{
          let arr = []
          arr.push(res)
          return arr
        },
        payload:{
          valueField:'weatherlist', //请求回来的数据
          url:`${apiPrefix}/gasdeclare/getweather`,
          method: 'GET',
        }
        
      })
     
      
     
    },
    
    //获取合同名称的下拉列表
    *getselectordata({payload},{call,put,select}){
      const { contractList } = yield select(state => state.subModelAdd)
      yield put.resolve({
        type:'@request',
        afterResponse:(response)=>{
         
          return Format.selectDictFormat(response,'id','name')  //接口返回数据需要的字段
          
        },
        payload:{
          valueField:'contractList',  //合同数据
          url:`${apiPrefix}/contractmanage/getselectordata`,
          
        }
      })



    }

    
  },
  reducers: {
  },
})

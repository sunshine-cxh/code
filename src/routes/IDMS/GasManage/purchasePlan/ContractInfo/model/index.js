/*
 * @Descripttion : 合同信息数据处理层
 * @Author       : caojiarong
 * @Date         : 2020-0 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 16:17:52
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import {apiPrefix, routePrefix} from '../../../../config'
import Format from 'utils/format'
export default modelEnhance({
  namespace: 'contractInfo',

  state: {
    demo: [],
    pageData: PageHelper.create(),
    childContractData: PageHelper.create(),
    childContractList:[],
    popoverVisible:false,
    isCurrentRoute:true,
    parameters:{},
    
    sellerList:[],
    buyerList:[],
    addressList:[],
    agreementList:[],
    agreementStatusList:[],
    currencyList:[]
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: '@change',
          payload: {
            isCurrentRoute: pathname == routePrefix+'/gasPurchasePlan/contractInfo' ? true : false,
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

      yield put({ //卖方
        type:'getSelectList',
        payload:{
          valueParams:'sellerList',
          type:'contractSeller'
        }
      })

      yield put({  //买方
        type:'getSelectList',
        payload:{
          valueParams:'buyerList',
          type:'contractBuyer'
        }
      })

      yield put({  //交付点
        type:'getSelectList',
        payload:{
          valueParams:'addressList',
          type:'deliveryAddrss'
        }
      })

      yield put({  //协议类型
        type:'getSelectList',
        payload:{
          valueParams:'agreementList',
          type:'agreementType'
        }
      })

    },

    // 获取列表
    *getPageData({ payload }, { call, put, select }){
      const { parameters } = yield select(state => state.contractInfo)
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
          url: `${apiPrefix}/contractmanage/getlistdata`,
          pageInfo: pageData,
          ...data
        }
      })
    },

    // 获取补充协议
    *getChildList({payload},{call, put, select}){
      const { childContractData } = yield select(state => state.contractInfo)
      let {id} = payload
      yield put.resolve({
        type:'@request',
        payload:{
          valueField:'childContractList',
          url:`${apiPrefix}/contractmanage/getReplenishList?id=${id}`
        }
      })
    },

    // 删除数据
    *deleteFn({ payload }, { call, put, select }){
      let { id, success } = payload
      console.log(id)
      yield put.resolve({
        type:'@request',
        payload:{
          url:`${apiPrefix}/contractmanage/delete?id=${id}`,
          // data:{
          //   id,
          // },
          success:()=>{
            success()
          }
        }
      })

    },


    // 获取所属模块列表
    *getSelectList({ payload }, { call, put, select }) {
      const { moduleList } = yield select(state => state.contractInfo)
      let {valueParams, type}=payload
      // if([].length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'contractInfo',
          valueField: valueParams,
          category: type,
        }
      })
    },

    *getDetails({payload},{call,put,select}){
      let {id,success}=payload
      yield put.resolve({
        type:'@request',
        payload:{
          url:`${apiPrefix}/contractmanage/getdetail?id=${id}`,
          success:()=>{
            success()
          }
        }
      })
    },

  },

  reducers: {}
})

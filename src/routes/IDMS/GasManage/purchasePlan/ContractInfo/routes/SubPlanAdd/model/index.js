/*
 * @Descripttion : 合同新增页面
 * @Author       : caojiarong
 * @Date         : 2020-09-01 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 19:11:44
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'subPlanAdd',

  state: {
    filePageData: PageHelper.create(),
    selectTypeList:[], 
    areaList:[], 
    moduleList:[],
    details:{},
    // 各种下拉选择
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
        if (pathname === `${routePrefix}/contractInfo/subPlanAdd`) {
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
    },

    *paramInit({payload},{call, put, select}){

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

      yield put({  //协议状态
        type:'getSelectList',
        payload:{
          valueParams:'agreementStatusList',
          type:'agreementStatus'
        }
      })

      yield put({  //币种
        type:'getSelectList',
        payload:{
          valueParams:'currencyList',
          type:'currency'
        }
      })
    },

    // 获取所属模块列表
    *getSelectList({ payload }, { call, put, select }) {
      let {valueParams, type}=payload
      // if([].length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'subPlanAdd',
          valueField: valueParams,
          category: type,
        }
      })
    },
    
    *getDetails({ payload }, { call, put, select }) {
      let { id } = payload
      console.log(id)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/contractmanage/getdetail?id=${id}`,
        },
      })
    },
    // 提交新增、编辑
    *submit({ payload }, { call, put, select }) {
      const { basicInfos,filePageData } = yield select((state) => state.subPlanAdd)
      
      let { success, id, fatherId } = payload
      let fileStr = []
      // if(id){
        basicInfos.id=id
        basicInfos.fatherId=fatherId
        basicInfos.status = parseInt(basicInfos.status)
        basicInfos.annualSupply = parseInt(basicInfos.annualSupply)
        basicInfos.assignAmount = parseInt(basicInfos.assignAmount)
        basicInfos.upliftRateBase = parseInt(basicInfos.upliftRateBase)
        basicInfos.upliftRateCoefficient =basicInfos.upliftRateCoefficient && parseInt(basicInfos.upliftRateCoefficient)
        basicInfos.purchasePrice = parseInt(basicInfos.purchasePrice)
        basicInfos.pipelineTransportationFee = basicInfos.pipelineTransportationFee &&parseInt(basicInfos.pipelineTransportationFee)
        basicInfos.deliveryPressure = parseInt(basicInfos.deliveryPressure)
        basicInfos.deliveryCalorific = parseInt(basicInfos.deliveryCalorific)
        basicInfos.gasUnit = parseInt(basicInfos.gasUnit)
        basicInfos.exchangeCurrency = parseInt(basicInfos.exchangeCurrency)
        basicInfos.exchangeRate = basicInfos.exchangeRate && parseInt(basicInfos.exchangeRate)
        basicInfos.contractType  = basicInfos.contractType && parseInt(basicInfos.contractType )
        basicInfos.gasType = basicInfos.gasType && basicInfos.gasType.toString()
        basicInfos.startTime= basicInfos.date[0]
        basicInfos.endTime= basicInfos.date[1]
      // }
        for(let i=0;i<filePageData.list.length;i++){
          fileStr.push(filePageData.list[i].id)
        }
        console.log(fileStr)
        basicInfos.attchmentId = fileStr.length>0 ? fileStr.toString() :''
      let postData = {
        ...basicInfos,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/contractmanage/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    
    // 获取所属模块列表
    *getModulList({ payload }, { call, put, select }) {
      const { moduleList } = yield select(state => state.subPlanAdd)
      if(moduleList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'subPlanAdd',
          valueField: 'moduleList',
          category: 'modelWarehouseModul',
        }
      })
    },
  },
  reducers: {
  },
})

/*
 * @Descripttion : 报修工单页面的数据管理页
 * @Author       : caojiarong
 * @Date         : 2020-06-17 10:48:49
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:13:14
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'repairOrder',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    assignDataList: PageHelper.create(), //维修人员指派列表
    popoverVisible: false,   // 筛选模块显隐控制
    popoverVisible1: false,
    details: {},
    isCurrentRoute: false,
    warehouseList:[],
    companyList:[],
    peopleList:[],
    repairOrderList:[]
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if( pathname === routesPrefix+'/repairOrder') {
          dispatch({
            type: '@change',
            payload:{
              parameters:{}
            }
          })
        }
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == routesPrefix + '/repairOrder' ? true : false,
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
    //初始化页面数据，每次进来都要刷新 
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'getPageInfo',
        payload: {
          values: {keyword:''},
          pageData: PageHelper.create(),
        }
      })
      yield put({
        type: 'getCompanyList'
      })

      yield put({
        type: 'getRepairOrderList'
      })
      
      yield put({
        type: 'getAllPeople',
        payload: {
          enterpriseId:JSON.parse(window.localStorage.getItem('user')).enterpriseId
        }
      })

      yield put({
        type: 'getAssignDataList',
        payload: {
          keyword:'',
          enterpriseId:JSON.parse(window.localStorage.getItem('user')).enterpriseId
        }
      })


    },

    *getDetails({ payload }, { call, put, select }) {
      let {id, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/equipmentrepair/getdetail?id=${id}`,
          success: ()=> {
            success()
          }
        }
      })
    },

    // 撤销巡检标准
    *revocation({payload}, {call, put, select}){
      const { pageData } = yield select(state => state.repairOrder)
      let {id, result,success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/equipmentrepair/revocation`,
          data:{
            id:id,
            result: result
          },
          success:()=>{
            success()
          }
        }
      })

      yield put({
        type:'getPageInfo',
        payload:{
          pageData
        }
      })
    },

    // 获取工单状态列表
    *getRepairOrderList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'repairOrder',
          valueField: 'repairOrderList',
          category: 'repairOrder',
        }
      })
    },

    // 获取公司列表
    *getCompanyList({ payload }, { call, put, select }){
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response.rows, 'id', 'name')
        },
        payload: {
          valueField: 'companyList',
          url: `${apiPrefix}/supplier/getlistdata`,
          data:{
            pagination:{
              currentPage: 1,
              pageSize: 10000,
              sort: "asc",
              sortField: "SortId"
            }
          }
        }
      })
    },

    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select(state => state.repairOrder)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values
      }
      
      
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/equipmentrepair/getlistdata`,
          pageInfo: pageData,
          ...data
        }
      })

      // yield put({
      //   type: 'getPageInfoSuccess',
      //   payload: {
      //     data: data
      //   }
      // })
    },

    // 获取人员列表
    *getAllPeople({ payload }, { call, put }) {
      let {enterpriseId} = payload,
      postData = {
        enterpriseId:enterpriseId
      }
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response.rows, 'id', 'realName')
        },
        payload: {
          valueField: 'peopleList',
          url: `/iams/user/getlistdata`,
          data:postData,
        }
      })
    },

    // 获取人员列表
    *getAssignDataList({ payload }, { call, put, select }) {
      let { assignDataList } = yield select(state => state.repairOrder)
      let {enterpriseId,keyword} = payload,
      postData = {
        enterpriseId:enterpriseId
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'assignDataList',
          url: `/iams/user/getlistdata`,
          pageInfo: assignDataList,
          data:postData,
          keyword
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
    },
    // 控制筛选框显隐
    popoverVisibleeChange(state, { payload }) {
      return {
        ...state,
        popoverVisible: payload.value
      }
    }
  }
})

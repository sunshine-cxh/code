/*
 * @Descripttion : 出库管理列表页面的数据管理页
 * @Author       : caojiarong
 * @Date         : 2020-05-14 10:48:49
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:21:21
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'pickingApply',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false,   // 筛选模块显隐控制
    popoverVisible1: false,
    details: {},
    isCurrentRoute: false,
    flag: 'add',
    pickingApplyList:[{code:1,codeName:'123'}],
    flowchart: [],

    approveStatusList:[],
    pickingTypeList:[]
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if( pathname === routesPrefix+'/pickingApply') {
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
            isCurrentRoute: pathname == routesPrefix+'/pickingApply' ? true : false,
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
    // 获取流程列表
    *getauditflowchart({ payload }, { call, put }) {
      let { success, id} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'flowchart',
          url: `/iams/flowwork/getauditflowchart`,
          data: {
            processSchemeId: id,
            flowTypeString: 'Stkpicking',
          },
          success: ()=> {
            success()
          }
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

    },

    *getDetails({ payload }, { call, put, select }) { //----------------------
      let {id, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/stkpicking/getdetail?id=${id}`,
          success: ()=> {
            success()
          }
        }
      })
    },

    // 获取列表
    // *getPickingApply({ payload }, { call, put, select }) { //----------------------
    //   yield put.resolve({
    //     type: '@request',
    //     afterResponse: response => {
    //       return Format.selectDictFormat(response, 'id', 'name')
    //     },
    //     payload: {
    //       valueField: 'pickingApplyList',
    //       url: `${apiPrefix}/stkpicking/getselectordata`,
    //     }
    //   })
    // },

    // 获取领料类型列表
    *getPickingTypeList({ payload }, { call, put, select }) {
      if(payload.pickingTypeList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'pickingApply',
          valueField: 'pickingTypeList',
          category: 'pickingType',
        }
      })
    },

    // 获取审核状态列表
    *getApproveStatus({ payload }, { call, put, select }) {
      if(payload.approveStatusList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'pickingApply',
          valueField: 'approveStatusList',
          category: 'approveStatus',
        }
      })
    },

    
    *getPageInfo({ payload }, { call, put, select }) {
      const { parameters } = yield select(state => state.pickingApply)
      let { pageData, values } = payload
      let data = {
        ...parameters,
        ...values
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/stkpicking/getlistdata`,
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
    },
    popoverVisibleChange1(state, { payload }) {
      return {
        ...state,
        popoverVisible1: payload.value
      }
    },
    changeFlag(state, { payload }) {
      return {
        ...state,
        flag: payload.value
      }
    }
  }
})

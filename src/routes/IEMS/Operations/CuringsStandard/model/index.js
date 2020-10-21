/*
 * @Descripttion : 养护标准列表页面的model
 * @Author       : hezihua
 * @Date         : 2020-06-08 10:48:49
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 14:33:06
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'curingsStandard',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false,   // 筛选模块显隐控制
    isCurrentRoute: false,
    curingsStandardList:[],
    typeList: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == routesPrefix+'/curingsStandard' ? true : false,
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
        type:'getCuringsStandardList'
      })
    },
    // 
    
    *getCuringsStandardList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'curingsStandard',
          valueField: 'curingsStandardList',
          category: 'patrolStandardType',
        }
      })
    },
    // 删除养护标准
    *deleteRecord({payload}, {call, put, select}){
      let {id, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/curingstandard/delete?id=${id}`,
          success: ()=> {
            success()
          }
        }
      })
    },

    *getPageInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/curingstandard/getlistdata`,
          pageInfo: pageData,
          ...values
        }
      })
    },

  },

  reducers: {}
})

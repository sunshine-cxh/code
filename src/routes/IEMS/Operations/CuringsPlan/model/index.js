/*
 * @Descripttion : 出库管理列表页面的数据管理页
 * @Author       : hezihua
 * @Date         : 2020-05-14 10:48:49
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 10:52:45
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'curingsPlan',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false,   // 筛选模块显隐控制
    isCurrentRoute: false,
    allUserList: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == routesPrefix + '/curingsPlan' ? true : false,
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
          values: { keyword: '' },
          pageData: PageHelper.create(),
        }
      })
    },
    // 删除养护标准
    *deleteRecord({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/curingplan/delete?id=${id}`,
          success: ()=> {
            success()
          }
        }
      })
    },

    // 获取领料类型列表
    *getpatrolPlanList({ payload }, { call, put, select }) {
      if (payload.patrolPlanList.length > 0) return;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'curingsPlan',
          valueField: 'patrolPlanList',
          category: 'pickingType',
        }
      })
    },
    // 停止任务
    *stopPlan({ payload }, { call, put, select }) {
      let { success, id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/curingplan/changestatus`,
          data: {id, status: 4},
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
          url: `${apiPrefix}/curingplan/getlistdata`,
          pageInfo: pageData,
          ...values
        }
      })
    },

  },

  reducers: {
    // 控制筛选框显隐
    popoverVisibleeChange(state, { payload }) {
      return {
        ...state,
        popoverVisible: payload.value
      }
    }
  }
})

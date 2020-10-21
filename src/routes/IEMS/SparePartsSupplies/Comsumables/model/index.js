/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-08 15:36:04
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'basicData',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false,   // 采购计划/筛选 popover 显隐控制
    typeList: [],
    brandList: [],
    isCurrentRoute: false,
    checkedKeys: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == `${routesPrefix}/Comsumables` ? true : false,
            details: {}
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
    *init({ payload }, { call, put, select }) {
      const { parameters, pageData } = yield select(state => state.basicData)

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData
        }
      })
    },
    
    *delete({ payload }, { call, put, select }){
      let {id, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/spareparts/delete?id=${id}`,
          success: ()=> {
            success()
          }
        }
      })
    },
     // 获取耗材列表
     *getPageInfo({ payload }, { call, put, select }) {
        const { parameters } = yield select(state => state.basicData)
        let { pageData, values } = payload
        let data = {
          ...parameters,
          ...values
        }
        yield put.resolve({
          type: '@request',
          payload: {
            valueField: 'pageData',
            url: `${apiPrefix}/spareparts/getlistdata`,
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
    }
  }
})

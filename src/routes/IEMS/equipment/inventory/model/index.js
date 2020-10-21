/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 08:55:24
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 09:35:28
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'inventory',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    layoutParameters: {},
    layoutData: PageHelper.create(),
    visible: false,
    popoverVisible: false, // 采购计划/筛选 popover 显隐控制
    treeData: [],
    organizationTree: [],
    allUserList: [],
    isCurrentRoute: false,
    currentId: '',
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == `${routesPrefix}/inventory` ? true : false,
            details: {},
          },
        })
      })
    },
  },
  effects: {
    *handleChangeState({ payload }, { call, put }) {
      yield put({
        type: '@change',
        payload: {
          ...payload,
        },
      })
    },
    // /equipmentinventory/updateoperator
    *init({ payload }, { call, put, select }) {
      const { parameters, pageData, layoutParameters, layoutData } = yield select((state) => state.inventory)

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData,
        },
      })
      yield put({
        type: 'getLayoutData',
        payload: {
          layoutParameters,
          layoutData,
          success: () => {},
        },
      })
    },
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentledger/delete?id=${id}`,
          success: () => {
            success()
          },
        },
      })
    },
    *updateoperator({ payload }, { call, put, select }) {
      let {id, operateId, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentinventory/updateoperator?id=${id}&operatorId=${operateId}`,
          success: ()=> {
            success()
          }
        },
      })
    },
    *getLayoutData({ payload }, { call, put, select }) {
      const { layoutParameters } = yield select((state) => state.inventory)
      let { layoutData, values } = payload
      let data = {
        ...layoutParameters,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'layoutData',
          url: `/iams/user/getlistdata`,
          pageInfo: layoutData,
          ...data,
        },
      })
    },
    // 获取盘点列表
    *getPageInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/equipmentinventory/getlistdata`,
          pageInfo: pageData,
          ...values,
        },
      })
    },
  },

  reducers: {
  },
})

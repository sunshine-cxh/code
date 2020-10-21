/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-14 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 16:10:15
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'scrap',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false, // 采购计划/筛选 popover 显隐控制
    treeData: [],
    isCurrentRoute: false,
    flowchart: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == `${routesPrefix}/scrap` ? true : false,
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
    *init({ payload }, { call, put, select }) {
      const { parameters, pageData } = yield select((state) => state.scrap)

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData,
        },
      })
      yield put({
        type: 'getType',
        payload: {
          success: () => {},
        },
      })
    },
    *delete({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentscrap/delete?id=${id}`,
          success: () => {
            success()
          },
        },
      })
    },
    *getauditflowchart({ payload }, { call, put }) {
      let { success, id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'flowchart',
          url: `/iams/flowwork/getauditflowchart`,
          data: {
            processSchemeId: id,
            flowTypeString: 'EquipmentScrap',
          },
          success: () => {
            success()
          },
        },
      })
    },
    // 获取类别
    *getType({ payload }, { call, put, select }) {
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'treeData',
          url: `${apiPrefix}/equipmentcategory/getselectordata?Type=1`,
          success: () => {
            success && success()
          },
        },
      })
    },
    // 获取台账列表
    *getPageInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/equipmentscrap/getlistdata`,
          pageInfo: pageData,
          ...values,
        },
      })
    },
  },

  reducers: {
  },
})
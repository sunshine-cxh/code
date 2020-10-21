/*
 * @Descripttion : 库存台账model
 * @Author       : caojiarong
 * @Date         : 2020-05-22 13:01:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 10:31:01
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'patrolTask',

  state: {
    parameters: {},
    pageData: PageHelper.create(),
    popoverVisible: false,   // 采购计划/筛选 popover 显隐控制
    record: {},
    treeData: [],
    isCurrentRoute: true,
    checkedKeys: [],
    warehouseList:[],
    taskStateList:[],
    organizationTree: [],
    layoutParameters: {},
    layoutData: PageHelper.create(),
    allUserList: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == routesPrefix+'/patrolTask' ? true : false,
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
      const { parameters, pageData, layoutParameters, layoutData } = yield select(state => state.patrolTask)

      yield put({
        type: 'getPageInfo',
        payload: {
          parameters,
          pageData
        }
      })
      yield put({
        type: 'getLayoutData',
        payload: {
          layoutParameters,
          layoutData,
          success: () => {},
        },
      })

      yield put({
        type:'getTaskState'
      })
    },
    // 停止任务
    *stopTask({ payload }, { call, put, select }) {
      let { success, id } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/patroltask/changestatus`,
          data: {id, state: 4},
          success: ()=> {
            success()
          }
        }
      })
    },
    // 转换责任人
    *transfer({ payload }, { call, put, select }) {
      const { record } = yield select(state => state.patrolTask)
      let { id, responseInfos } = record
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/patroltask/transfer`,
          data: { id, responseInfos },
          success: ()=> {
            success()
          }
        }
      })
    },
    // 获取巡检任务列表 -------------
    *getPageInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: `${apiPrefix}/patroltask/getlistdata`,
          pageInfo: pageData,
          ...values
        }
      })
    },
    *getLayoutData({ payload }, { call, put, select }) {
      const { layoutParameters } = yield select((state) => state.patrolTask)
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

    //获取任务状态
    *getTaskState({payload},{call,put}){
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'patrolTask',
          valueField: 'taskStateList',
          category: 'taskStatus',
        }
      })
    }
    
  },

  reducers: {
  }
})

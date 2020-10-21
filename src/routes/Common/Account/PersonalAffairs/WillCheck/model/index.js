/*
 * @Descripttion : 我发出的审批  model
 * @Author       : hezihua
 * @Date         : 2020-05-29 08:53:00
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-17 14:58:52
 */ 


import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'


export default modelEnhance({
  namespace: 'willCheck',

  state: {
    parameters: { keyword: '' }, //分页接口传参
    pageData: PageHelper.create(), //分页信息
    role: [], //角色列表
    accountType: [], //账户类型
    organizationTree: [], //组织机构
    enterpriseList: [], //企业列表
    toolbarSelectorValue: '', //toolbar select选中
    flowchart: []
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/account/willCheck') {
          dispatch({
            type: 'getPageInfo',
            payload: {
              pageData: PageHelper.create(),
              values: {
                entity: {
                  type: 3
                }
              }
            },
          })
        }
      })
    },
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select((state) => state.willCheck)

      yield put.resolve({
        type: 'getPageInfo',
        payload: {
          pageData,
          values: {
            entity: {
              type: 3
            }
          }
        },
      })
    },
    // 获取流程列表
    *getauditflowchart({ payload }, { call, put }) {
      let { success, id, type} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'flowchart',
          url: `/iams/flowwork/getauditflowchart`,
          data: {
            processSchemeId: id,
            flowTypeString: type,
          },
          success: ()=> {
            success()
          }
        }
      })
    },


    // 获取分页数据
    *getPageInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload
      let data = {
        ...values,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: '/iams/flowwork/getdatalist',
          pageInfo: pageData,
          ...data,
        },
      })

      yield put.resolve({
        type: 'getPageInfoSuccess',
        payload: {
          ...data,
        },
      })
    },
  },

  reducers: {
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload,
      }
    },
  },
})

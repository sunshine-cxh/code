/*
 * @Descripttion : 新增 - model
 * @Author       : wuhaidong
 * @Date         : 2020-06-05 08:54:36
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-09-04 19:01:45
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'codeRuleAdd',

  state: {
    appPageData: PageHelper.create(),
    details: {
      enterpriseId: null, // 公司
      name: null, // 规则名称
      enCode: null, // 对应模块
      remark: null, // 备注
    },
    ruleDetailTypeValue: 0, // 规则明细-类型value
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routePrefix}/codeRule/subAdd`) {
          dispatch({
            type: '@change',
            payload: {
              details: {
                enterpriseId: null, // 公司
                name: null, // 规则名称
                enCode: null, // 对应模块
                remark: null, // 备注
              },
            },
          })
        }
      })
    },
  },

  effects: {
    // 初始化
    *init({ payload }, { call, put, select }) {
      let { id } = payload
      // TODO default
      // 获取企业列表 
      // yield put.resolve({
      //   type: 'iamsGlobal/getEnterprises',
      //   payload: {
      //     namespace: 'codeRule',
      //     valueField: 'enterprises',
      //   },
      // })

      // 获取对应模块列表
      yield put.resolve({
        type: 'global/getMasterDataItem',
        payload: {
          namespace: 'codeRule',
          valueField: 'codeRuleEntity',
          category: 'codeRuleEntity',
        },
      })

      //获取详情
      if (id) {
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
          },
        })
      }
    },

    // 获取编辑详情
    *getDetails({ payload }, { put, select }) {
      let { appPageData } = yield select((state) => state.codeRuleAdd)
      let { id } = payload

      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/coderule/getdetail?id=${id}`,
          success: (response) => {
            appPageData.list = response.codeRuleFormatList ? response.codeRuleFormatList : []
            put({
              type: '@change',
              payload: {
                appPageData,
              },
            })
          },
        },
      })
    },

    // 保存
    *submit({ payload }, { put, select }) {
      let { details, appPageData } = yield select((state) => state.codeRuleAdd)
      let { success } = payload
      let postData = {
        enterpriseId: details.enterpriseId,
        name: details.name,
        enCode: details.enCode,
        remark: details.remark,
        codeRuleFormatList: appPageData.list,
      }
      if (details.id) {
        postData.id = details.id
      }

      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/coderule/submit`,
          data: postData,
          success: () => {
            success && success()
          },
        },
      })
    },
  },

  reducers: {},
})

/*
 * @Descripttion :领料申请页面的model
 * @Author       : caojiarong
 * @Date         : 2020-05-14 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-30 17:29:45
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'pickingApplyDetail',

  state: {
    pageData: PageHelper.create(),
    details: [],
    filePageData:PageHelper.create(),
    flowWorkList:[],
    checkHis:[]
  },
  effects: {
    // 获取领料详情
    *getPickingApplyDetail({ payload }, { call, put, select }){
      let code = payload.id
      let data = []
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          data = response.detailList
        },
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/stkpicking/getdetail?id=${code}`
        }
      })

      yield put({
        type: 'setPageData',
        payload: {
          data:data
        }
      })

      yield put({
        type: 'getCheckHis',
        payload:{id:code}
      })

    },
    // 获取审核历史
    *getCheckHis({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'checkHis',
          url: `/iams/flowwork/getaduithistory`,
          data: {
            processSchemeId: id,
            flowTypeString: 'Stkpicking',
          },
          // success: (details) => {
          //   success(details)
          // },
        },
      })
    },
    // 获取审核人列表
    *getFlowwork({ payload }, { put }) {
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'aduitorId', 'aduitorName')
        },
        payload: {
          valueField: 'flowWorkList',
          url: `/iams/flowwork/getauditorlist?FlowTypeString=Stkpicking`
        }
      })
    },

    // 审批
    *postaudit({ payload }, { call, put, select }) {
      let { id, success, auditOpinion, resultType } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/iams/flowwork/postaudit`,
          success: () => {
            success()
          },
          data: {
            processSchemeId: id,
            flowTypeString: 'Stkpicking',
            auditOpinion,
            resultType,
          },
        },
      })
    },

  }
})

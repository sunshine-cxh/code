/*
 * @Descripttion : 巡检详情计划页面的model
 * @Author       : caojiarong
 * @Date         : 2020-06-02 17:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:10:22
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'patrolPlanDetail',

  state: {
    pageData: PageHelper.create(),
    itemList: PageHelper.create(),
    connectTaskData: PageHelper.create(),
    details: {},
    organizationTree: [],
    allUserList: []
  },
  effects: {
    *getDetails({ payload }, { call, put, select }) {
      let {id, success} = payload
      let { pageData, itemList, connectTaskData } = yield select(state => state.patrolPlanDetail)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/patrolplan/getdetail?id=${id}`,
          success: (details)=> {
            success(details)
            pageData.list = details.responseInfos ? details.responseInfos : []
            itemList.list = details.patrolPlanLines ? details.patrolPlanLines : [],
            connectTaskData.list = details.patrolTaskList ? details.patrolTaskList : [],
            put({
              type: '@change',
              payload: {
                pageData,
                itemList,
                connectTaskData
              },
            })
          }
        }
      })
    }
  }
})

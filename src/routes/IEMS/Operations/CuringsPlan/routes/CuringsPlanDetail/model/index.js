/*
 * @Descripttion : 详情养护计划页面的model
 * @Author       : hezihua
 * @Date         : 2020-06-02 17:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-07 17:06:25
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'curingsPlanDetail',

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
      let { connectTaskData } = yield select(state => state.curingsPlanDetail)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/curingplan/getdetail?id=${id}`,
          success: (details)=> {
            success(details)
            connectTaskData.list = details.curingTaskList
            put({
              type: '@change',
              payload: {
                connectTaskData
              },
            })
          }
        }
      })
    }
  }
})

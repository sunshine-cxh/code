/*
 * @Descripttion : 子系统公用model
 * @Author       : wuhaidong
 * @Date         : 2020-06-02 16:25:49
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-07 11:53:56
 */
import $$ from 'cmn-utils'
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from './config'


export default modelEnhance({
  namespace: `iamsGlobal`,

  state: {
    enterprisePageData: PageHelper.create(), // 企业列表分页
  },

  effects: {
    // 获取企业列表, for select
    *getEnterprises({ payload }, { call, put, select }) {
      let { enterprisePageData } = yield select((state) => state.iamsGlobal)
      let { namespace, valueField } = payload
      payload.pageData = enterprisePageData.startPage(
        1,
        5,
        'sortId',
        'asc'
      )
      let data = yield call(getEnterprises, payload)

      let list = []
      if (data && data.rows.length > 0) {
        list = Format.selectDictFormat(data.rows, 'id', 'enterpriseName')
      }

      let newPayload = {}
      newPayload[`${valueField}`] = list

      yield put({
        type: `${namespace}/@change`,
        payload: newPayload,
      })
    },
  },

  reducers: {},
})

//企业列表
export async function getEnterprises(payload) {
  return $$.post(`${apiPrefix}/enterprise/getlistdata`, payload)
}

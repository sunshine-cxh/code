/*
 * @Descripttion : 重点用户申报详情页面model
 * @Author       : caojiarong
 * @Date         : 2020-08-25 14:12:55
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-04 11:33:37
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../../config'
import Format from 'utils/format'
// import { connect } from 'dva'

// @connect(({subModelAdd,loading})=>({
//   subModelAdd,
//   loading: loading.models.subModelAdd,
// }))
export default modelEnhance({
  namespace: 'subGasdeclareDetail',

  state: {
    weatherPageData: PageHelper.create(),
    details: {},
    weatherlist:[],

  },
  subscriptions: {
    //异步数据初始化
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        // if (pathname === `${routePrefix}/gasdeclare/subDeclareDetail`) {
        //   dispatch({
        //     type: '@change',
        //     payload: {
        //       details: [],
        //     },
        //   })
        // }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      const { details } = yield select((state) => state.subGasdeclareDetail)
      let { id } = payload
      console.log(id)
      if (id) {
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
          },
        })
      }
      yield put({
        type:'getweather'
      })
    },

    //详情页面请求数据方法
    *getDetails({ payload }, { call, put, select }) {
      let { id } = payload
        yield put.resolve({
          type: '@request',
          // data:details,
          afterResponse:res=>{
           console.log(res)
          },
          payload: {          
            url: `${apiPrefix}/gasdeclare/getDetail?id=${id}`,
            valueField: 'details',
          },
        })     
    
  },
  
},
  reducers: {

    
  },
})


/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-14 08:45:03
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-13 17:36:09
 */ 
import modelEnhance from 'utils/modelEnhance'
import { apiPrefix, routesPrefix } from '../../../config'

export default modelEnhance({
  namespace: 'realtime',

  state: {
    zoom: 9,
    fixedVideo: [],
    pointVideo: []
  },

  subscriptions: {},

  effects: {
    *getVideoUrl({ payload }, { call, put, select }) {
      let {id, operateId, success} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          method:'get',
          valueField:'pointVideo',
          url: `${apiPrefix}/intelligentnetworkreport/getmapcemeradata`,
          success: (res)=> {
            success(res)
          }
        },
      })
    },
  },

  reducers: {},
})

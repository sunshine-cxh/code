/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-14 08:45:03
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-30 15:33:17
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

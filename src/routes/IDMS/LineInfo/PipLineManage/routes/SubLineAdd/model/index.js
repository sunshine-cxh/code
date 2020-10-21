/*
 * @Descripttion : 管段新增页面
 * @Author       : caojiarong
 * @Date         : 2020-08-18 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-21 08:44:02
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'subLineAdd',

  state: {
    linePageData: PageHelper.create(),
    selectTypeList:[{code: 1, codeName: "选取管段"},{code: 2, codeName: "手工选取"}], 
    areaList:[], 
    lineStatusList:[]
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routePrefix}/PipLineManage/subPipLineAdd`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
            },
          })
        }
      })
    },
  },
  effects: {
    // /equipment/equipmentinventory/getdetail
    *init({ payload }, { call, put, select }) {
      const { details } = yield select((state) => state.subLineAdd)
      let { id, success } = payload
      if(id){
        yield put.resolve({
          type: 'getDetails',
          payload: {
            // id,
            success: (details) => {
              console.log(details)
            }
          },
        })
      }

      yield put({
        type:'getLineStatus'
      })

      yield put({
        type:'getSelectData'
      })
    },
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/inspectionroute/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })
    },
    // 提交新增、编辑
    *submit({ payload }, { call, put, select }) {
      const { basicInfos } = yield select((state) => state.subLineAdd)
      basicInfos.status = parseInt(basicInfos.status)
      let { success } = payload
      let postData = {
        ...basicInfos,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/pipesection/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    
    // 获取路线
    *getLineStatus({ payload }, { call, put, select }) {
      const { lineStatusList } = yield select(state => state.subLineAdd)
      if(lineStatusList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'subLineAdd',
          valueField: 'lineStatusList',
          category: 'lineStatus',
        }
      })
    },

    // 获取管段选择列表
    *getSelectData({ payload }, {call, put, select }){
      yield put.resolve({
        type:'@request',
        afterResponse:res=>{
          return Format.selectDictFormat(res, 'id', 'name')
        },
        payload:{
          url:`${apiPrefix}/pipesection/getselectordata`,
          valueField: 'areaList'
        }
      })
    }
  },
  reducers: {
  },
})

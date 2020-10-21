/*
 * @Descripttion : 用户审批计算页面
 * @Author       : caojiarong
 * @Date         : 2020-08-28 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-28 15:47:26
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'subCaculate',

  state: {
    weatherPageData: PageHelper.create(),
    selectTypeList:[], 
    areaList:[], 
    moduleList:[],
    details:{}
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routePrefix}/keyUserApproval/subCaculate`) {
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
    *init({ payload }, { call, put, select }) {
      // let { id } = payload
      // if(id){
      //   yield put.resolve({
      //     type: 'getDetails',
      //     payload: {
      //       id,
      //     },
      //   })
      // }

      // yield put({
      //   type:'getModulList'
      // })

    },
    *getDetails({ payload }, { call, put, select }) {
      let { id } = payload
      console.log(id)
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/model/getdetail?id=${id}`,
        },
      })
    },
    // 提交新增、编辑
    *submit({ payload }, { call, put, select }) {
      const { basicInfos } = yield select((state) => state.subCaculate)
      
      basicInfos.module = parseInt(basicInfos.module)
      basicInfos.module = parseInt(basicInfos.module)
      let { success, id } = payload
      
      if(id){
        basicInfos.id=id
      }
      console.log(basicInfos)
      let postData = {
        ...basicInfos,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/model/submit`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
    
    // 获取所属模块列表
    *getModulList({ payload }, { call, put, select }) {
      const { moduleList } = yield select(state => state.subCaculate)
      if(moduleList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'subCaculate',
          valueField: 'moduleList',
          category: 'modelWarehouseModul',
        }
      })
    },

  },
  reducers: {
  },
})

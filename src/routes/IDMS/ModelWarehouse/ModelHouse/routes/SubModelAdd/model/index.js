/*
 * @Descripttion : 模型仓新增页面
 * @Author       : caojiarong
 * @Date         : 2020-08-25 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-08 17:20:55
 */

import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routePrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'subModelAdd',

  state: {
    filePageData: PageHelper.create(),
    selectTypeList:[], 
    areaList:[], 
    moduleList:[],
    details:{}
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routePrefix}/modelHouse/subModalAdd`) {
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
      let { id } = payload
      if(id){
        yield put.resolve({
          type: 'getDetails',
          payload: {
            id,
          },
        })
      }

      yield put({
        type:'getModulList'
      })

    },
    *getDetails({ payload }, { call, put, select }) {
      let { id } = payload
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
      const { basicInfos,filePageData } = yield select((state) => state.subModelAdd)
      basicInfos.module = parseInt(basicInfos.module)
      basicInfos.saveAddress = filePageData.list[0].filePath || ''
      basicInfos.fileId = filePageData.list[0].id || ''
      let { success, id } = payload
      
      if(id){
        basicInfos.id=id
      }
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
      const { moduleList } = yield select(state => state.subModelAdd)
      if(moduleList.length > 0) return ;
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'subModelAdd',
          valueField: 'moduleList',
          category: 'modelWarehouseModul',
        }
      })
    },

    *deleteFile({payload},{call, put, select}){
      let {id} = payload.record
      yield put.resolve({
        type:`/api/file/delete?id=${id}`
      })
    }

  },
  reducers: {
  },
})

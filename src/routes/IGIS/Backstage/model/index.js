/*
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-09-04 11:35:41
 * @FilePath     : \ilng.iomp.web\src\routes\IGIS\Home\model\index.js
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix } from '../../config'

export default modelEnhance({
  namespace: 'geographyBackstage',

  state: {
    zoom: 14, //缩放比列
    lineLength: 0, //线段长度
    area: 0, //面积大小
    point: [0, 0], //坐标，x,y
    centralCoordinates: [120.171151990288507, 30.235276483959943], //中心点坐标
    dataSource: [
      {
        title: 'Libraries',
      },
      {
        title: 'Solutions',
      },
      {
        title: 'Articles',
      },
    ], //搜索历史记录
    checkedKeys: [],
    expandedKeys: [],
    tableVisible: false,
    formInfos: {
      status: 1,
      Zindex: 1,
      geometryType:'Point',
      dataSourceType:'API',
    },
    contentType: [],
    pageData: PageHelper.create(),
    parameters: {
      keyword: '',
    },
    tableState: false,
    layerLists: [],
    layerKey: '',
    layerName:'',
    layerVisible:true,
  },

  subscriptions: {},

  effects: {
    // 获取详情
    *getLayerLists({ payload }, { call, put, select }) {
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'layerLists',
          url: `${apiPrefix}/layerlist?type=${1}`,
          success: () => {
            success && success()
          },
        },
      })
    },
    *submit({ payload }, { call, put, select }) {
      let { success, parameters } = payload

      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/layersubmit`,
          data: parameters,
          success: () => {
            success()
          },
        },
      })
    },
  },

  reducers: {},
})

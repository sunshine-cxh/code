/*
 * @Descripttion : 新增仓库盘点页面的model
 * @Author       : caojiarong
 * @Date         : 2020-05-26 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:22:19
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'warehouseInventoryAdd',

  state: {
    appPageData: PageHelper.create(),
    // filePageData: PageHelper.create(),
    flowSchemes: PageHelper.create(),
    warehouseList: [{label:'大连仓库',value:1}],
    unitList: [],
    inWarehouseType: [],
    peopleList:[],
    basicInfos: {
      warehouseId: undefined,  //盘点仓库
      operateTime: new Date(),  // 盘点时间
      remark: ''  // 备注
    },
    selectDataList: PageHelper.create(),
    addRow: [],
    parameters:{},
    brandList:[],
    unitList:[],
    selectedRowKeys: [],
    selectedRow:[],
    
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if( pathname === routesPrefix+'/warehouseInventory/subWarehouseInventoryAdd') {
          dispatch({
            type: '@change',
            payload: { ///-------------需要修改的，待定
              basicInfos: {
                warehouseId: undefined,  //盘点仓库
                operateTime: new Date(),  // 盘点时间
                remark: '',  // 备注
              },
              addRow: [],
              selectedRow: [],
              selectedRowKeys: [],
              parameters:{},
            }
          })
        }
      });
    }
  },
  effects: {
    // 保存新增入库管理数据
    *save({ payload }, { call, put, select }) {
      const { basicInfos, appPageData } = yield select(state => state.warehouseInventoryAdd)
      let postData = {
        // ...basicInfos,
        warehouseId: basicInfos.warehouseId,  //盘点仓库
        operateTime: basicInfos.operateTime,  // 盘点时间
        remark: basicInfos.remark, // 备注
        detailList: appPageData.list
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/warehouseinventory/submit`,
          data: postData,
          success: ()=> {
            success()
          }
        }
      })
    },

    // 获取仓库列表
    *getWarehouse({ payload }, { call, put, select }){
      yield put({
        type: 'initParams',
      })

      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'warehouseList',
          url: `${apiPrefix}/warehouse/getselectordata`
        }
      })
    },

    // 获取手动添加数据列表
    *getPageInfo({payload}, {call, put, select}){
      let { basicInfos } = yield select(state => state.warehouseInventoryAdd)
      let { selectDataList, values} = payload
      let data = {
        ...values,
        entity:{
          warehouseId:basicInfos.warehouseId
        }
      }
      // 产品列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'selectDataList',
          url: `${apiPrefix}/warehousewarning/getwarehoseaccountslistdata`,
          pageInfo: selectDataList,
          ...data
        }
      })
      
    },

    // 获取单位
    *getUnit({ payload }, { call, put, select }){
      let { success } = payload
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'unitList',
          url: `${apiPrefix}/unit/getselectordata`,
          success: ()=> {
            success()
          }
        }
      })
    },
    // 获取品牌
    *getBrand({ payload }, { call, put, select }){
      let { success } = payload
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'id', 'name')
        },
        payload: {
          valueField: 'brandList',
          url: `${apiPrefix}/brand/getselectordata`,
          success: ()=> {
            success()
          }
        }
      })
    },

  },
  reducers: {
    basicInfosChange(state, { payload }) {
      return {
        ...state,
        basicInfos: {
          ...state.basicInfos,
          [payload.key]: payload.val
        }
      }
    },
    getPageInfoSuccess(state, { payload }) {
      return {
        ...state,
        parameters: payload.data
      }
    },
    initParams(state, {payload}){
      return {
        ...state,
        basicInfos: {
          warehouseId: undefined,  //入库仓库
          operateTime: new Date(),  // 入库时间
          outInType: undefined,// 入库类型
          supplierId:'',  //选择采购申请
          operateId:undefined,  // 选择归还人
          remark: ''  // 备注
        },
        appPageData:PageHelper.create(),
        selectedRow:[]
      }
    }
  }
})

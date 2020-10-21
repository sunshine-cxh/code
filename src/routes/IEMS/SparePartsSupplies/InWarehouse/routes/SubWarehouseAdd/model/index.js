/*
 * @Descripttion : 新增入库管理页面的model
 * @Author       : caojiarong
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:09:25
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../../../config'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'inWarehouseAdd',

  state: {
    appPageData: PageHelper.create(),
    // filePageData: PageHelper.create(),
    flowSchemes: PageHelper.create(),
    warehouseList: [{label:'大连仓库',value:1}],
    unitList: [],
    inWarehouseType: [],
    peopleList:[],
    basicInfos: {
      warehouseId: undefined,  //入库仓库
      operateTime: new Date(),  // 入库时间
      outInType: undefined,// 入库类型
      relateCode:'',  //选择采购申请
      relateId:'',  //选择采购申请
      receiveUserId:undefined,  // 选择归还人
      receiveUserName:undefined,  // 选择归还人
      remark: ''  // 备注
    },
    // 采购申请模块要用参数
    applyRow: [],
    applyRowKeys: [],
    applyDataList: PageHelper.create(),
    applyParamters: {},
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
        if( pathname === routesPrefix+'/inWarehouse/subWarehouseAdd') {
          dispatch({
            type: '@change',
            payload: { ///-------------需要修改的，待定
              basicInfos: {
                warehouseId: undefined,  //入库仓库
                operateTime: new Date(),  // 入库时间
                outInType: undefined,// 入库类型
                relateCode:'',  //选择采购申请
                relateId:'',  //选择采购申请
                receiveUserId:undefined,  // 选择归还人
                receiveUserName:undefined,  // 选择归还人
                remark: '',  // 备注
              },
              appPageData: PageHelper.create(),
              applyRow: [],
              applyRowKeys: [],
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
      const { basicInfos, appPageData,applyRowKeys,applyRow } = yield select(state => state.inWarehouseAdd)
      let postData = {
        warehouseId: basicInfos.warehouseId,  //入库仓库
        operateTime: basicInfos.operateTime,  // 入库时间
        outInType: basicInfos.outInType ? parseInt(basicInfos.outInType) : undefined,// 入库类型
        relateCode:applyRow[0] ? applyRow[0].sn : undefined,  //选择采购申请
        relateId:applyRowKeys[0],  //选择采购申请
        receiveUserId:basicInfos.receiveUserId,  // 选择归还人
        receiveUserName:basicInfos.receiveUserName,  // 选择归还人
        remark: basicInfos.remark, // 备注
        detailList: appPageData.list
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/warehousein/submit`,
          data: postData,
          success: ()=> {
            success()
            dispatch({
              type:'subWarehouseAdd/@change',
              payload:{
                applyRow: [],
                applyRowKeys: [],
                addRow: [],
                selectedRow: [],
                selectedRowKeys: [],
                addRow: [],
                parameters:{},
              }
            })
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

    // 从数据字典中获取入库类型
    *getInWarehouseType({ payload }, { call, put }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'inWarehouseAdd',
          valueField: 'inWarehouseType',
          category: 'inWarehouseType',
        }
      })
    },

    // 从用户列表中选择的数据作为归还人列表
    *getAllPeople({ payload }, { call, put }) {
      let {enterpriseId} = payload,
      postData = {
        enterpriseId:enterpriseId
      }
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          return Format.selectDictFormat(response.rows, 'id', 'realName')
        },
        payload: {
          valueField: 'peopleList',
          url: `/iams/user/getlistdata`,
          data:postData
        }
      })
    },

    // 获取采购申请列表
    *getApplyList({ payload }, { call, put, select }) {
      const { applyParamters } = yield select(state => state.inWarehouseAdd)
      let {applyDataList, values} = payload
      let data = {
        ...applyParamters,
        ...values,
        entity:{
          auditStatus:2,
          type: '1'
        }
      }
      let keyword = values ? values.keyword : ''
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'applyDataList',
          url: `${apiPrefix}/purchase/getlistdata`,
          pageInfo:applyDataList,
          ...data
        }
      })
    },

    // 获取手动添加数据列表
    *getPageInfo({payload}, {call, put, select}){
      let { parameters } = yield select(state => state.inWarehouseAdd)
      let { selectDataList, values} = payload
      let data = {
        ...parameters,
        ...values
      }
      // 产品列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'selectDataList',
          url: `${apiPrefix}/spareparts/getlistdata`,
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

    *initParams({payload},{call,put,select}){
    }

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
          relateCode:'',  //选择采购申请
          relateId:'',  //选择采购申请
          receiveUserId:undefined,  // 选择归还人
          receiveUserName:undefined,  // 选择归还人
          remark: '',  // 备注
        },
        appPageData:PageHelper.create(),
        applyRow: [],
        applyRowKeys: [],
        selectedRow:[],
      }
    }
  }
})

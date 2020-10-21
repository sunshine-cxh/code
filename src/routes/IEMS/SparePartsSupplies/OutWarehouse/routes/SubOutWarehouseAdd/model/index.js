/*
 * @Descripttion : 新增出库管理页面的model
 * @Author       : caojiarong
 * @Date         : 2020-05-14 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:20:33
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import PageHeader from 'utils/pageHelper'

export default modelEnhance({
  namespace: 'outWarehouseAdd',

  state: {
    appPageData: PageHelper.create(),
    filePageData: PageHelper.create(),

    flowSchemes: PageHelper.create(),
    warehouseList: [{label:'大连仓库',value:1}],
    unitList: [],
    outWarehouseTypeList: [],
    peopleList:[],
    basicInfos: {
      warehouseId: undefined,  //出库仓库
      operateTime: new Date(),  // 出库时间
      outInType: undefined,// 出库类型
      relateId:'',  //选择领料申请
      receiveUserId:undefined,  // 选择领料人
      remark: '',  // 备注
    },
    // 采购申请模块要用参数
    applyRow: [],
    applyRowKeys: [],
    applyDataList: PageHelper.create(),
    applyParamters: {},
    selectDataList: PageHelper.create(),
    selectedRow:[],
    addRow: [],
    parameters:{},
    brandList:[],
    unitList:[],
    applyParams:{
      keyword:undefined, //关键词
      operateTimeStart:undefined,  //出库开始日期
      operateTimeEnd:undefined,    //出库开始日期
      applyType:undefined          //出库类型
    },
    applyTypeList:[],
    selectedRowKeys: [],
    
    pickingType:[]   //领料申请类型
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if( pathname === routesPrefix+'/outWarehouse/subOutWarehouseAdd') {
          dispatch({
            type: '@change',
            payload: { ///-------------需要修改的，待定
              basicInfos: {
                warehouseId: undefined,  //出库仓库
                operateTime: new Date(),  // 出库时间
                outInType: undefined,// 出库类型
                relateId:'',  //选择领料申请
                receiveUserId:undefined,  // 选择领料人
                remark: '',  // 备注
              },
              appPageData: PageHelper.create(),
              selectedRowKeys: [],
              applyRow: [],
              applyRowKeys: [],
            }
          })
        }
      });
    }
  },
  effects: {
    // 保存新增入库管理数据
    *save({ payload }, { call, put, select }) {
      const { basicInfos, appPageData, filePageData } = yield select(state => state.outWarehouseAdd)
      let postData = {
        // ...basicInfos,
        warehouseId: basicInfos.warehouseId,  //入库仓库
        operateTime: basicInfos.operateTime,  // 入库时间
        outInType: basicInfos.outInType ? parseInt(basicInfos.outInType) : undefined,// 入库类型
        relateId:basicInfos.relateId,  //选择领料申请单
        receiveUserId:basicInfos.receiveUserId,  // 选择领料人
        remark: basicInfos.remark, // 备注
        detailList: appPageData.list || undefined,
        attachmentList:filePageData.list || undefined
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/warehouseout/submit`,
          data: {...postData},
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

    // 从数据字典中获取出库类型
    *getOutWarehouseType({ payload }, { call, put }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'outWarehouseAdd',
          valueField: 'outWarehouseTypeList',
          category: 'outWarehouseType',
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

    // 获取领料申请列表
    *getApplyList({ payload }, { call, put, select }) {
      const { applyParamters } = yield select(state => state.outWarehouseAdd)
      let {applyDataList, values} = payload
      let data = {
        ...applyParamters,
        ...values
      }
      let keyword = values ? values.keyword : ''
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'applyDataList',
          url: `${apiPrefix}/stkpicking/getlistdata`,
          pageInfo:applyDataList,
          ...data
        }
      })
    },

    // 获取手动添加数据列表
    *getPageInfo({payload}, {call, put, select}){
      let { parameters } = yield select(state => state.outWarehouseAdd)
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

    // 获取领料类型
    *getPickingType({ payload }, { call, put, select }){
      let { success } = payload
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'outWarehouseAdd',
          valueField: 'pickingType',
          category: 'pickingType',
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

    // 删除文件
    *deleteFile({ payload }, { put }) {
      let postData = {
        id: payload.record.id
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/ifss/file/delete`,
          data: postData
        }
      })
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
          warehouseId: undefined,  //出库仓库
          operateTime: new Date(),  // 出库时间
          outInType: undefined,// 出库类型
          relateId:'',  //选择领料申请
          receiveUserId:undefined,  // 选择领料人
          remark: ''  // 备注
        },
        appPageData:PageHelper.create(),
        applyRow: [],
        applyRowKeys: [],
        selectedRow:[],
        filePageData:PageHeader.create()
      }
    }
  }
})

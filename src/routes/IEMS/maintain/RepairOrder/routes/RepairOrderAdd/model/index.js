/*
 * @Descripttion : 报修工单新增页面的model
 * @Author       : caojiarong
 * @Date         : 2020-06-19 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:14:57
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix,routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import { PageHeader } from 'antd'

export default modelEnhance({
  namespace: 'repairOrderAdd',

  state: {
    deviceDataList: PageHelper.create(),
    repairOrderDetail: {},
    recordId:'',  //记录id，若不为空则说明是修改而不是新增
    basicInfos: {},
    
    selectedDeviceRow:[],
    selectedDeviceRowKeys: [],
    applyRow: [],
    applyRowKeys: [],
    // 
    parametersDevice:{},
    parametersResponse:{},
    // edit
    editDeviceDataList:[],
    editResponserList:[],
    
    // 所属部门列表
    companyList:[],

    imageList: [],//图片列表
    peopleList: [],//用户列表
    faultTypeList:[], //类型列表
    warehouseList:[], //存放位置 仓库列表 
    faultLevelList :[], //故障水平 
    details:{},
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if( pathname === routesPrefix+'/repairOrder/subRepairOrderAdd') {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {
                name: undefined,    //标准名称
                
                remark: undefined   //备注
              },
              responserList: PageHelper.create(),
              editResponserList:[],
              selectedDeviceRow:[],
              selectedDeviceRowKeys: [],
              selectedResponseRow:[],
              selectedResponseRowKeys: [],
              selectDataList: PageHelper.create(),
              editSelectDataList:[],
              parametersDevice:{},
              parametersResponse:{}
            }
          })
        }
      });
    }
  },
  effects: {
    // 初始化
    *init({payload},{call, put, select}){
      yield put({
        type: 'getWarehouse'
      })

      yield put({
        type: 'getAllPeople',
        payload: {
          enterpriseId:JSON.parse(window.localStorage.getItem('user')).enterpriseId
        }
      })

      yield put({
        type: 'getFaultType'
      })

      yield put({
        type: 'getFaultLevel'
      })
    },

    // 保存新增领料申请数据
    *save({ payload }, { call, put, select }) {
      
      const { basicInfos, imageList, recordId,applyRowKeys } = yield select(state => state.repairOrderAdd)
      let postData = {
        reportUserId: basicInfos.reportUserId,    //名称
        standard: basicInfos.standard, //规格
        reportTime: basicInfos.reportTime, //报障时间
        processsor: basicInfos.processsor, //负责人
        ledgerId: applyRowKeys.length > 0 ? applyRowKeys[0] : undefined, //设备id
        faultType: parseInt(basicInfos.faultType) ,  //故障类型
        wareshouseId: basicInfos.wareshouseId, //存放位置--仓库id
        faultLevel: parseInt(basicInfos.faultLevel), //故障等级
        content: basicInfos.content,   //开始时间
        remark: basicInfos.remark,
        id: recordId,  // 记录id，若不为空则说明是修改而不是新增,
        photoList: imageList
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/equipmentrepair/submit`,
          data: {...postData},
          success: ()=> {
            success()
          }
        }
      })
    },
    // 删除图片
    *deleteImage({ payload }, { call, put, select }) {
      let postData = {
        id: payload.id,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/ifss/image/delete`,
          data: postData,
        },
      })
    },

    // 获取设备列表
    *getPageInfo({payload}, {call, put, select}){
      let { parametersDevice } = yield select(state => state.repairOrderAdd)
      let { deviceDataList , values} = payload
      let data = {
        ...parametersDevice,
        ...values
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'deviceDataList',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: deviceDataList,
          keywords: {...parametersDevice},
          ...values,
        }
      })

    },

    // 获取报修工单详情
    *getPartolPlanDetail({ payload }, { call, put, select }){
      let {id} = payload
      let res = {}
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          res = response
        },
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/patrolplan/getdetail?id=${id}`
        }
      })

      yield put({
        type:'setEditData',
        payload:{
          data : res,
        }
      })
    },

    // 获取人员列表
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

    // 获取仓库列表
    *getWarehouse({ payload }, { call, put, select }){
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

    // 故障类型列表
    *getFaultType({payload}, {call, put, select }){
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload:{
          namespace: 'repairOrderAdd',
          valueField: 'faultTypeList',
          category: 'breakdownType'
        }
      })
    },

    // 故障等级列表
    *getFaultLevel({payload}, {call, put, select }){
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload:{
          namespace: 'repairOrderAdd',
          valueField: 'faultLevelList',
          category: 'faultLevel'
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
    initParams(state, {payload}){
      return {
        ...state,
        basicInfos: {
          name: undefined,    //标准名称
          startTime: undefined,    //类型
          endTime:undefined,   //分类
          remark: undefined   //备注
        },
        responserList:PageHelper.create(),
        applyRow: [{}],
        applyRowKeys: [],
        selectedDeviceRow:[],
        selectedDeviceRowKeys: [],
        selectedResponseRow:[],
        selectedResponseRowKeys: [],
        selectDataList: PageHelper.create(),
      }
    }
  }
})
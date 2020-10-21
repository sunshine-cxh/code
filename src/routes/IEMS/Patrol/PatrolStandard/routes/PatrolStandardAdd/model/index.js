/*
 * @Descripttion : 巡检标准页面的model
 * @Author       : caojiarong
 * @Date         : 2020-06-02 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:09:50
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import { PageHeader } from 'antd'

export default modelEnhance({
  namespace: 'patrolStandardAdd',

  state: {
    appPageData: PageHelper.create(),
    itemPageData: PageHelper.create(),
    selectDataList: PageHelper.create(),
    patrolStandardDetail: {},
    recordId:'',  //记录id，若不为空则说明是修改而不是新增
    basicInfos: {
      name: undefined,    //标准名称
      type: undefined,    //类型
      cateId:undefined,   //分类
      require:undefined,  //要求
      remark: undefined   //备注
    },
    standardTypeList:[], //类型列表
    standardItemTypeList:[],  //点检类型列表
    
    
    selectedRow:[],
    selectedRowKeys: [],
    addRow: [],
    parameters:{},
    // edit
    editDeviceDataList:[],
    typeList:[],
    details:{}
    
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if( pathname === routesPrefix+'/patrolStandard/subPatrolStandardAdd') {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              details: {},
              appPageData: PageHelper.create(),
              selectedRowKeys: [],
              itemPageData: PageHelper.create(),
              editDeviceDataList:[],
              parameters:{},
            }
          })
        }
      });
    }
  },
  effects: {
    // 保存新增领料申请数据
    *save({ payload }, { call, put, select }) {
      const { basicInfos,appPageData, itemPageData, recordId, selectedRowKeys } = yield select(state => state.patrolStandardAdd)
      let standardItemArr = []
      itemPageData.list.forEach(item=> {
        standardItemArr.push(item.name)
      })
      let postData = {
        name: basicInfos.name,    //标准名称
        type: parseInt(basicInfos.type),    //类型
        cateId: basicInfos.cateId,   //分类
        require: basicInfos.require,  //要求
        remark: basicInfos.remark,   //备注
        equipmentIdList : basicInfos.type == 1 ?  selectedRowKeys: [],
        standardItemList : standardItemArr,  //点检项目
        id: recordId  // 记录id，若不为空则说明是修改而不是新增
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/patrolstandard/submit`,
          data: {...postData},
          success: ()=> {
            success()
          }
        }
      })
    },

    // 获取手动添加数据列表
    *getEquipmentData({payload}, {call, put, select}){
      let { parameters } = yield select(state => state.patrolStandardAdd)
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
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: selectDataList,
          ...data
        }
      })

    },

    // 获取类型列表
    *getStandardTypeList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'patrolStandardAdd',
          valueField: 'standardTypeList',
          category: 'patrolStandardType',
        }
      })
    },

    // standardItemType
    // 获取点检类型列表
    *getItemTypeList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'patrolStandardAdd',
          valueField: 'standardItemTypeList',
          category: 'standardItemType',
        }
      })
    },

    // 获取巡检标准详情
    *getDetail({ payload }, { call, put, select }){
      let {id, success} = payload
      let res = {}
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          res = response
        },
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/patrolstandard/getdetail?id=${id}`,
          success: (details)=> {
            success(details)
          }
        }
      })

      yield put({
        type:'setEditData',
        payload:{
          data : res,
        }
      })
    },
    
  },
  reducers: {
    setEditData(state, {payload}){
      let idArr = []
      payload.data.equipmentList.forEach(item=> {
        idArr.push(item.id)
      })
      return {
        ...state,
        editItemPageData: payload.data.standardItemList,
        editDeviceDataList: payload.data.equipmentList,
        selectedRow: payload.data.equipmentList,
        selectedRowKeys: idArr
      }
    }
  }
})
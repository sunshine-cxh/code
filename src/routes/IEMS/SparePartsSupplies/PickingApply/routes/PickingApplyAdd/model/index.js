/*
 * @Descripttion : 新增领料申请页面的model
 * @Author       : caojiarong
 * @Date         : 2020-05-14 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:08:19
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import { PageHeader } from 'antd'

export default modelEnhance({
  namespace: 'pickingApplyAdd',

  state: {
    appPageData: PageHelper.create(),
    filePageData: PageHelper.create(),

    flowSchemes: PageHelper.create(),
    // warehouseList: [{label:'大连仓库',value:1}],
    unitList: [],
    outWarehouseTypeList: [],
    peopleList:[],
    basicInfos: {
      applyId: undefined,  //申请人
      relateid:undefined,  //选择领料申请
      operateId:undefined,  // 选择领料人
      remark: '',  // 备注
      type:'1',
      title:'',
      flowSchemeDataList:undefined, //审批人
    },
    // 采购申请模块要用参数
    applyRow: [],
    applyRowKeys: [],
    applyDataList: PageHelper.create(),
    applyDataList1: PageHelper.create(),
    applyParamters: {},
    selectDataList: PageHelper.create(),
    selectedRow:[],
    addRow: [],
    parameters:{},

    applyParams:{  //关联单号筛选参数
      keyword:undefined, //关键词
      operateTimeStart:undefined,  //出库开始日期
      operateTimeEnd:undefined,    //出库开始日期
      applyType:undefined          //出库类型
    },

    applyTypeList:[],
    selectedRowKeys: [],
    
    pickingTypeList:[],   //领料申请类型
    flowchartList:[], 
    treeData:[],  //搜索树
    
    approvalRow: [],
    approvalRowKeys: [],
    approvalRowLocal: [],
    approvalRowKeysLocal: [],
    organizationTree:[],
    approvalParameters: {},
    approvalDataList: PageHelper.create(),
    approvalDataList1: PageHelper.create(),

    details:{}
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if( pathname === routesPrefix+'/pickingApply/subPickingApplyAdd') {
          dispatch({
            type: '@change',
            payload: { ///-------------需要修改的，待定
              basicInfos: {
                // applyId: undefined,  //申请人
                type: undefined, // 领料申请类型
                relateid:undefined,  //选择领料申请
                operateId:undefined,  // 选择领料人
                remark: '',  // 备注
                type:'1',
                title:'',
              },
              applyRow:[],
              applyRowKeys: [],
              appPageData: PageHelper.create(),
              selectedRowKeys: [],
              filePageData: PageHelper.create(),
              flowSchemeDataList:undefined, //审批人

              approvalParameters: {},
              approvalDataList: PageHelper.create(),
              approvalDataList1: PageHelper.create(),
              approvalRow: [],
              approvalRowKeys: [],
              approvalRowLocal: [],
            }
          })
        }
      });
    }
  },
  effects: {
    // 保存新增领料申请数据
    *save({ payload }, { call, put, select }) {
      const { basicInfos, appPageData, filePageData, applyRow,approvalRowKeysLocal } = yield select(state => state.pickingApplyAdd)
      let {id}=payload
      let postData = {
        id,
        type: parseInt(basicInfos.type),// 申请类型
        relateid:applyRow[0] ? applyRow[0].id : undefined,  //选择领料申请单
        // operateId:basicInfos.operateId,  // 选择领料人
        remark: basicInfos.remark, // 备注
        purchaseDataList: appPageData.list,
        fileDataList:filePageData.list,
        flowSchemeDataList:approvalRowKeysLocal,
        title: basicInfos.title
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/stkpicking/submit`,
          data:{...postData},
          success: ()=> {
            success()
          }
        }
      })
    },

    *edit({ payload }, { call, put, select }) {
      const { basicInfos, appPageData, filePageData, applyRow,approvalRowKeysLocal } = yield select(state => state.pickingApplyAdd)
      let { success,id } = payload
      let postData = {
        id,
        type: parseInt(basicInfos.type),// 申请类型
        relateid:applyRow[0] ? applyRow[0].id : undefined,  //选择领料申请单
        // operateId:basicInfos.operateId,  // 选择领料人
        remark: basicInfos.remark, // 备注
        purchaseDataList: appPageData.list,
        fileDataList:filePageData.list,
        flowSchemeDataList:approvalRowKeysLocal,
        title: basicInfos.title
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/stkpicking/edit`,
          data:{...postData},
          success: ()=> {
            success()
          }
        }
      })
    },

    // 获取领料申请列表 todo------------------------
    *getApplyList({ payload }, { call, put, select }) {
      const { applyParamters } = yield select(state => state.pickingApplyAdd)
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
      let { parameters } = yield select(state => state.pickingApplyAdd)
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

    // 获取领料申请类型列表
    *getPickingTypeList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: response => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'pickingApplyAdd',
          valueField: 'pickingTypeList',
          category: 'pickingType',
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

    // 获取搜索 treeData 用于搜索可选列表
    *getTree({ payload }, { call, put, select }){
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'treeData',
          url: `${apiPrefix}/equipmentcategory/getselectordata?Type=2`,
          success:()=>{
            success && success()
          }
        }
      })
    },

    // 删除附件
    *deleteFile({ payload }, { call, put, select }){
      let postData = {
        id: payload.record.fileId
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/ifss/file/delete`,
          data: postData
        }
      })
    },


    // 领料申请关联单号---维修、养护
    *getRelateList({payload},{call, put, select}){
      let { basicInfos } = yield select(state => state.pickingApplyAdd)
      let {keyword,type,applyDataList} = payload
      if(basicInfos.type == 2){ //养护类型
        yield put.resolve({
          type: '@request',
          payload: {
            valueField: 'applyDataList',
            url: `${apiPrefix}/curingtask/getlistdata`,
            pageInfo:applyDataList,
            keyword,
            entity:{auditStatus:2}
          }
        })
      }else{
        yield put.resolve({  //维修 -》 保修工单
          type: '@request',
          payload: {
            valueField: 'applyDataList',
            url: `${apiPrefix}/warehouseinventory/getlistdata`,
            pageInfo:applyDataList,
            keyword,
            entity:{auditStatus:2}
          }
        })
      }
    },
    // 获取所属部门
    *getAllOrganization({ payload }, { call, put }) {
      let { enterpriseId } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'organizationTree',
          url: `/iams/organization/getselectordata?enterpriseId=${enterpriseId}`
        }
      })
    },
    // 获取用户列表
    *getUserInfos({ payload }, { call, put, select }){
      const { approvalParameters } = yield select(
        (state) => state.pickingApplyAdd
      )
      let { approvalDataList, values } = payload
      let data = {
        ...approvalParameters,
        ...values,
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'approvalDataList',
          url: `/iams/user/getlistdata`,
          pageInfo: approvalDataList,
          ...data,
        },
      })
      
      // yield put({
      //   type: 'getPageInfoSuccess',
      //   payload: {
      //     data: data,
      //   },
      // })
    },

    // 获取领料详情
    *getPickingApplyDetail({ payload }, { call, put, select }){
      const { appPageData, filePageData} = yield select(
        (state) => state.pickingApplyAdd
      )
      let code = payload.id
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/stkpicking/getdetail?id=${code}`
        },
        success:(res)=>{
          appPageData.list = res.basicInfos.purchaseDataList
          filePageData.list = res.basicInfos.fileDataList
          let flowSchemes = res.basicInfos.flowSchemeDataList
          let idArr = [], addRow = []
          res.basicInfos.purchaseDataList.forEach(item=> {
            if(item.id) {
              idArr.push(item.id)
            } else {
              addRow.push(item)
            }
          })
          put({
            type: '@change',
            payload: {
              selectedRow: res.basicInfos.purchaseDataList,
              selectedRowKeys: idArr,
              addRow,
              appPageData,
              filePageData,
              approvalRow:flowSchemes
            },
          })
        }
      })

      // 申请单号赋值
      let { basicInfos } = yield select(state => state.pickingApplyAdd)
      if(basicInfos.type == 2){ //养护类型
        yield put.resolve({
          type: '@request',
          payload: {
            valueField: 'applyDataList1',
            url: `${apiPrefix}/curingtask/getlistdata`,
            pageInfo:PageHelper.create(),
            entity:{auditStatus:2,ids: basicInfos.relateid ? [basicInfos.relateid] : []}
          }
        })
      }else{
        yield put.resolve({  //维修 -》 保修工单
          type: '@request',
          payload: {
            valueField: 'applyDataList1',
            url: `${apiPrefix}/warehouseinventory/getlistdata`,
            pageInfo:PageHelper.create(),
            entity:{
              auditStatus:2,
              ids: basicInfos.relateid ? [basicInfos.relateid] : []
            }
          }
        })
      }
      
      // todo 要使用id数组去查询数据
      const { applyDataList1 } = yield select((state) => state.pickingApplyAdd)
      yield put({
        type: '@change',
        payload: {
          applyRow: applyDataList1.list,
          applyRowKeys: applyDataList1.list.length > 0 ? [applyDataList1.list[0].id] : [],
        },
      })
      
      // 获取审批人，并且赋值
      // const { basicInfos} = yield select((state) => state.pickingApplyAdd)
      if (basicInfos.flowSchemeDataList.length < 1) {
        return
      }
      // 获取用户列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'approvalDataList1',
          url: `/iams/user/getlistdata`,
          pageInfo: PageHelper.create(),
          entity: {
            ids: basicInfos.flowSchemeDataList ? basicInfos.flowSchemeDataList : undefined,
          },
        },
      })
      const { approvalDataList1 } = yield select((state) => state.pickingApplyAdd)
      let approvalRowKeys = []
      approvalDataList1.list.forEach((item) => {
        approvalRowKeys.push(item.id)
      })
      yield put({
        type: '@change',
        payload: { 
          approvalRow: approvalDataList1.list,
          approvalRowLocal: approvalDataList1.list,
          flowchartList: approvalDataList1.list,
          approvalRowKeys,
          approvalRowKeysLocal: approvalRowKeys,
        },
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
          applyId: undefined,  //申请人
          type: undefined, // 领料申请类型
          relateid:undefined,  //选择领料申请
          operateId:undefined,  // 选择领料人
          remark: '',  // 备注
          flowSchemeDataList:undefined, //审批人
          type:'1',
          title:'',
        },
        fileDataList:PageHeader.create(),
        purchaseDataList:PageHeader.create(),
        appPageData:PageHelper.create(),
        applyRow: [],
        applyRowKeys: [],
        selectedRow:[],
      }
    }
  }
})

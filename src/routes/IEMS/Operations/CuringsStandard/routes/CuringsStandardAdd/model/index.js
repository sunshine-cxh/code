/*
 * @Descripttion : 养护标准页面的model
 * @Author       : hezihua
 * @Date         : 2020-06-02 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 08:38:57
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import Format from 'utils/format'
import { PageHeader } from 'antd'

export default modelEnhance({
  namespace: 'curingsStandardAdd',

  state: {
    appPageData: PageHelper.create(),
    curingItemPageData: PageHelper.create(),
    selectDataList: PageHelper.create(),
    patrolStandardDetail: {},
    recordId: '', //记录id，若不为空则说明是修改而不是新增
    basicInfos: {
      name: undefined, //标准名称
      type: undefined, //类型
      cateId: undefined, //分类
      require: undefined, //要求
      remark: undefined, //备注
    },
    standardTypeList: [], //类型列表
    standardItemTypeList: [], //点检类型列表

    selectedRow: [],
    selectedRowKeys: [],
    addRow: [],
    parameters: {},
    editDeviceDataList: [],
    typeList: [],
    details: {cycleUnit: '2'},
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === routesPrefix + '/curingsStandard/subCuringsStandardAdd') {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              details: {cycleUnit: '2'},
              appPageData: PageHelper.create(),
              selectedRowKeys: [],
              curingItemPageData: PageHelper.create(),
              editDeviceDataList: [],
              parameters: {},
            },
          })
        }
      })
    },
  },
  effects: {
    // 保存新增领料申请数据
    *save({ payload }, { call, put, select }) {
      const { basicInfos, curingItemPageData, recordId, selectedRowKeys } = yield select(
        (state) => state.curingsStandardAdd
      )
      let curingItemArr = []
      curingItemPageData.list.forEach((item) => {
        curingItemArr.push(item.name)
      })
      let postData = {
        ...basicInfos,
        equipmentIdList: basicInfos.type == 1 ? selectedRowKeys : [],
        curingItemList: curingItemArr, //点检项目
        id: recordId, // 记录id，若不为空则说明是修改而不是新增
        type: Number(basicInfos.type),
        cycleUnit: Number(basicInfos.cycleUnit),
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/curingstandard/submit`,
          data: { ...postData },
          success: () => {
            success()
          },
        },
      })
    },

    // 获取手动添加数据列表
    *getEquipmentData({ payload }, { call, put, select }) {
      let { parameters } = yield select((state) => state.curingsStandardAdd)
      let { selectDataList, values } = payload
      let data = {
        ...parameters,
        ...values,
      }
      // 产品列表
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'selectDataList',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: selectDataList,
          ...data,
        },
      })
    },

    // 获取类型列表
    *getStandardTypeList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: (response) => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'curingsStandardAdd',
          valueField: 'standardTypeList',
          category: 'patrolStandardType',
        },
      })
    },

    // standardItemType
    // 获取点检类型列表
    *getItemTypeList({ payload }, { call, put, select }) {
      yield put.resolve({
        type: 'global/getMasterDataItem',
        afterResponse: (response) => {
          return Format.selectDictFormat(response, 'dataCode', 'dataName')
        },
        payload: {
          namespace: 'curingsStandardAdd',
          valueField: 'standardItemTypeList',
          category: 'standardItemType',
        },
      })
    },

    // 获取养护标准详情
    *getDetail({ payload }, { call, put, select }) {
      let { id, success } = payload
      let res = {}
      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          res = response
        },
        payload: {
          valueField: 'details',
          url: `${apiPrefix}/curingstandard/getdetail?id=${id}`,
          success: (details) => {
            success(details)
          },
        },
      })

      yield put({
        type: 'setEditData',
        payload: {
          data: res,
        },
      })
    },
  },
  reducers: {
    setEditData(state, { payload }) {
      let idArr = []
      payload.data.equipmentList.forEach((item) => {
        idArr.push(item.id)
      })
      return {
        ...state,
        editDeviceDataList: payload.data.equipmentList,
        selectedRow: payload.data.equipmentList,
        selectedRowKeys: idArr,
      }
    },
  },
})

/*
 * @Descripttion : 新增养护计划页面的model
 * @Author       : hezihua
 * @Date         : 2020-06-02 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 15:14:01
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import { post } from 'fetch-mock'
import Format from 'utils/format'

export default modelEnhance({
  namespace: 'curingsPlanAdd',

  state: {
    deviceDataList: PageHelper.create(), //设备选择list
    recordId: '', //记录id，若不为空则说明是修改而不是新增
    details: {},
    basicInfos: {
      name: undefined, //标准名称
      startTime: undefined, //类型
      endTime: undefined, //分类
      cycle: '', //周期
      cycleUnit: '', //周期单位
    },
    standardTypeList: [], //类型列表
    standardItemTypeList: [], //点检类型列表

    parametersDevice: {},
    selectedDeviceRow: [],
    selectedDeviceRowKeys: [],
    selectedDeviceRowLocal: [],
    selectedDeviceRowKeysLocal: [],

    // 所属部门列表
    organizationTree: [],
    allUserList: [],

    selectStandardRow: [],
    selectStandardRowKeys: [],
    selectStandardRowLocal: [],
    selectStandardRowKeysLocal: [],
    standardParameter: {},

    standardPageData: PageHelper.create(),
    typeList: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === routesPrefix + '/curingsPlan/subCuringsPlanAdd') {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {},
              selectedDeviceRow: [],
              selectedDeviceRowKeys: [],
              selectedDeviceRowLocal: [],
              selectedDeviceRowKeysLocal: [],
              selectStandardRow: [],
              selectStandardRowKeys: [],
              selectStandardRowLocal: [],
              selectStandardRowKeysLocal: [],

              parametersDevice: {},
            },
          })
        }
      })
    },
  },
  effects: {
    // 保存新增领料申请数据
    *save({ payload }, { call, put, select }) {
      const { basicInfos, recordId, selectedDeviceRowKeys, selectStandardRowKeys } = yield select(
        (state) => state.curingsPlanAdd
      )
      let postData = {
        ...basicInfos,
        equipmentId: selectedDeviceRowKeys[0],
        standardId: selectStandardRowKeys[0],
        id: recordId, // 记录id，若不为空则说明是修改而不是新增
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/curingplan/submit`,
          data: { ...postData },
          success: () => {
            success()
          },
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
          namespace: 'curingsPlanAdd',
          valueField: 'standardTypeList',
          category: 'patrolStandardType',
        },
      })
    },
    // 获取标准列表
    *getStandardInfo({ payload }, { call, put, select }) {
      let { pageData, values } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'standardPageData',
          url: `${apiPrefix}/curingstandard/getlistbyequipment`,
          pageInfo: pageData,
          ...values,
        },
      })
    },
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      let res = {}
      yield put.resolve({
        type: '@request',
        afterResponse: (response) => {
          res = response
        },
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/curingplan/getdetail?id=${id}`,
          success: (basicInfos) => {
            success(basicInfos)
          },
        },
      })
      yield put({
        type: 'setEditData',
        payload: res,
      })
    },
    // 获取设备列表
    *getDeviceList({ payload }, { call, put, select }) {
      let { deviceDataList, values } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'deviceDataList',
          url: `${apiPrefix}/equipmentledger/getlistdata`,
          pageInfo: deviceDataList,
          ...values,
        },
      })
    },
  },
  reducers: {
    setEditData(state, { payload }) {
      let deviceRow = [
          {
            name: payload.equipmentName,
            code: payload.equipmentCode,
            id: payload.equipmentId,
          },
        ],
        deviceIdArr = [payload.equipmentId],
        standardRow = [
          {
            cycle: payload.cycle,
            cycleUnit: payload.cycleUnit,
            name: payload.standardName,
            id: payload.standardId,
          },
        ],
        standardIdArr = [payload.standardId]
      return {
        ...state,
        selectedDeviceRow: deviceRow,
        selectedDeviceRowKeys: deviceIdArr,
        selectedDeviceRowLocal: deviceRow,
        selectedDeviceRowKeysLocal: deviceIdArr,
        selectStandardRow: standardRow,
        selectStandardRowKeys: standardIdArr,
        selectStandardRowLocal: standardRow,
        selectStandardRowKeysLocal: standardIdArr,
      }
    },
  },
})

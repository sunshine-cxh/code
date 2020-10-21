/*
 * @Descripttion : 巡检新增计划页面的model
 * @Author       : caojiarong
 * @Date         : 2020-06-02 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:10:29
 */
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import { apiPrefix, routesPrefix } from '../../../../../config'
import { post } from 'fetch-mock';

export default modelEnhance({
  namespace: 'patrolPlanAdd',

  state: {
    responserList: PageHelper.create(), //责任人list
    appPageData: PageHelper.create(),

    selectDataList: PageHelper.create(),//巡检路线list
    deviceDataList: PageHelper.create(),//设备选择list

    patrolPlanDetail: {},
    recordId: '',  //记录id，若不为空则说明是修改而不是新增
    details: {},
    basicInfos: {
      name: undefined,    //标准名称
      startTime: undefined,    //类型
      endTime: undefined,   //分类
      cycle: undefined,  //周期
      cycleUnit: 2,  //周期单位
      expire: undefined,  //有效时间
      expireUnit: 2,  //有效时间单位
      noticeTime: undefined,  //提前提醒时间
      noticeTimeUnit: 2,  //提醒时间单位
      remark: undefined,   //备注
      isStart: true, //是否启用
    },
    standardTypeList: [], //类型列表
    standardItemTypeList: [],  //点检类型列表


    selectedDeviceRow: [],
    selectedDeviceRowKeys: [],

    selectedResponseRow: [],
    selectedResponseRowKeys: [],

    addRow: [],
    parametersDevice: {},
    parametersResponse: {},
    // edit
    editSelectDataList: [],
    editAppPageDataList: [],
    // 所属部门列表
    organizationTree: [],

    patrolLineList: [],
    patrolStandardRow: [],
    patrolStandardRowKeys: [],
    standardParameter: {},
    standardPageData: PageHelper.create(),
    allUserList: [],
    typeList: []
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === routesPrefix + '/patrolPlan/subPatrolPlanAdd') {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {
                name: undefined,    //名称
                startTime: undefined,    //类型
                endTime: undefined,   //分类
                cycle: undefined,  //周期
                cycleUnit: 2,  //周期单位
                expire: undefined,  //有效时间
                expireUnit: 2,  //有效时间单位
                noticeTime: undefined,  //提前提醒时间
                noticeUnit: 2,  //提醒时间单位
              },
              // responserList: PageHelper.create(),
              editResponserList: [],
              selectedDeviceRow: [],
              selectedDeviceRowKeys: [],
              selectedResponseRow: [],
              selectedResponseRowKeys: [],
              selectDataList: PageHelper.create(),

              editSelectDataList: [],

              parametersDevice: {},
              parametersResponse: {}
            }
          })
        }
      });
    }
  },
  effects: {
    // 保存新增领料申请数据
    *save({ payload }, { call, put, select }) {
      const { basicInfos, appPageData, selectDataList, recordId } = yield select(state => state.patrolPlanAdd)
      let postData = {
        name: basicInfos.name,    //名称
        startTime: basicInfos.startTime && basicInfos.startTime.format('YYYY-MM-DD 00:00:00'),   //开始时间
        endTime: basicInfos.endTime && basicInfos.endTime.format('YYYY-MM-DD 00:00:00'),  //结束时间
        cycle: parseInt(basicInfos.cycle),
        cycleUnit: basicInfos.cycleUnit,
        expire: parseInt(basicInfos.expire),
        expireUnit: basicInfos.expireUnit,
        noticeTime: parseInt(basicInfos.noticeTime),
        noticeUnit: basicInfos.noticeUnit,
        remark: basicInfos.remark,
        patrolPlanLines: selectDataList.list,  // 巡检路线
        responseInfos: appPageData.list,  //责任人列表
        id: recordId,  // 记录id，若不为空则说明是修改而不是新增
        isStart: basicInfos.isStart
      }
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/patrolplan/submit`,
          data: { ...postData },
          success: () => {
            success()
          }
        }
      })
    },

    // 获取责任人列表
    *getResponseInfo({ payload }, { call, put, select }) {
      let { keyword, responserList } = payload
      let enterpriseId = JSON.parse(window.localStorage.getItem('user')).enterpriseId
      let postData = {
        enterpriseId
      }
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'responserList',
          url: `/iams/user/getlistdata`,
          pageInfo: responserList,
          data: postData,
          keyword: keyword
        }
      })

    },
    // 获取标准列表
    *getStandardInfo({ payload }, { call, put, select }) {
      let { pageData, values} = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'standardPageData',
          url: `${apiPrefix}/patrolstandard/getlistbyequipment`,
          pageInfo: pageData,
          ...values
        }
      })
    },
    *getDetails({ payload }, { call, put, select }) {
      let { id, success } = payload
      let { appPageData, selectDataList } = yield select(state => state.patrolPlanAdd)
      let res = {}
      yield put.resolve({
        type: '@request',
        afterResponse: response => {
          res = response
        },
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/patrolplan/getdetail?id=${id}`,
          success: (basicInfos) => {
            success(basicInfos)
            appPageData.list = basicInfos.responseInfos ? basicInfos.responseInfos : []
            selectDataList.list = basicInfos.patrolPlanLines ? basicInfos.patrolPlanLines : []
            put({
              type: '@change',
              payload: {
                appPageData,
                selectDataList
              },
            })
          }
        }
      })
      yield put({
        type: 'setEditData',
        payload: res
      })
    },
    // 获取设备列表
    *getDeviceList({ payload }, { call, put, select }) {
      let { parametersDevice } = yield select(state => state.patrolPlanAdd)
      let { deviceDataList, values } = payload
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
          keywords: { ...parametersDevice },
          ...values,
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
    setEditData(state, { payload }) {
      let userIdArr = [], deviceIdArr = []
      payload.patrolPlanLines.forEach(item => {
        deviceIdArr.push(item.id)
      })
      payload.responseInfos.forEach(item => {
        userIdArr.push(item.id)
      })
      return {
        ...state,
        selectedDeviceRow: payload.patrolPlanLines,
        selectedDeviceRowKeys: deviceIdArr,
        selectedResponseRow: payload.responseInfos,
        selectedResponseRowKeys: userIdArr
      }
    }
  }
})
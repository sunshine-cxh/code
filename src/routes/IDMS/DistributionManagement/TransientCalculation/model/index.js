import modelEnhance from 'utils/modelEnhance'
import { dataResult } from '../components/dataResult'
import { dataLinepack } from '../components/dataLinepack'

export default modelEnhance({
  namespace: 'TransientCalculation',

  state: {
    // data: {
    //   SGSolverGateStationList: [], //门站
    //   SGSolverDeviceValveList: [], //阀门设备
    //   SGSolverDeviceRegulatorList: [], //调压器设备
    //   SGSolverGuestList: [], //用户
    // },
    resultData: [],
    linepackData: [],
    resultSeletorValue: '',
    flowAndPressureData: [],
    analysisState: false,
    updateState: false,
  },

  subscriptions: {},

  effects: {
    //初始化模型
    *getInitData({ payload }, { call, put, select }) {
      let { success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'data',
          url: `/sgSolver/SGSolver/TransientAnalysis`,
        },
        success: () => {
          success && success()
        },
      })

      // let {
      //   data: { SGSolverGateStationList },
      // } = yield select((state) => state.SteadyStateCalculation)
      // yield put({
      //   type: '@change',
      //   payload: {
      //     tabsActiveKeyKey:
      //       SGSolverGateStationList && SGSolverGateStationList.length > 0
      //         ? SGSolverGateStationList[0].NodeName
      //         : '',
      //   },
      // })
    },

    //更新模型
    *steadyStateEditForm({ payload }, { call, put, select }) {
      let { data } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `/sgSolver/SGSolver/SteadyStateModelSave`,
          data: data,
        },
      })

      yield put.resolve({
        type: '@change',
        payload: {
          updateState: false,
        },
      })
    },

    //分析
    *transientAnalysis({ payload }, { call, put, select }) {
      // yield put.resolve({
      //   type: '@request',
      //   payload: {
      //     notice: true,
      //     valueField: 'resultData',
      //     url: `/sgSolver/SGSolver/TransientAnalysis`,
      //   },
      // })

      yield put.resolve({
        type: '@change',
        payload: {
          resultData: dataResult,
          linepackData: dataLinepack,
        },
      })

      yield put.resolve({
        type: '@change',
        payload: {
          analysisState: false,
        },
      })

      let { resultData } = yield select((state) => state.TransientCalculation)
      yield put({
        type: '@change',
        payload: {
          resultSeletorValue:
            resultData && resultData.length > 0 ? resultData[0].NodeId : '',
        },
      })

      yield put({
        type: '@change',
        payload: {
          flowAndPressureData:
            resultData && resultData.length > 0
              ? resultData[0].SGSolverProfileList[0].NodeProfileList
              : [],
        },
      })
    },
  },

  reducers: {},
})

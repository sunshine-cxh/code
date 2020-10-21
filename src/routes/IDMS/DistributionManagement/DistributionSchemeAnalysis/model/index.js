
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from '../../../config'
import { getData } from '../service'
import { simulationData } from '../components/data.js'

export default modelEnhance({
  namespace: 'SteadyStateCalculation',

  state: {
    data: {
      SGSolverGateStationList: [], //门站
      SGSolverDeviceValveList: [], //阀门设备
      SGSolverDeviceRegulatorList: [], //调压器设备
     
    },
    tabsActiveKeyKey: '',
    analysisState: false,
    updateState: false,
  },

  subscriptions: {},

  effects: {
    //初始化模型
    *getInitData({ payload }, { call, put, select }) {
      let { success } = payload
      

      yield put.resolve({
        type: '@change',
        payload: {
          data: simulationData,
        },
      })

      let {
        data: { SGSolverGateStationList },
      } = yield select((state) => state.SteadyStateCalculation)

      console.log("*getInitData -> SGSolverGateStationList", SGSolverGateStationList)
      
      yield put({
        type: '@change',
        payload: {
          tabsActiveKeyKey:
            SGSolverGateStationList && SGSolverGateStationList.length > 0
              ? SGSolverGateStationList[0].NodeName
              : '',
        },
      })
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
    *steadyStateAnalysis({ payload }, { call, put, select }) {
      let { data, success } = payload
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          valueField: 'data',
          url: `/sgSolver/SGSolver/SteadyStateAnalysis`,
          data: data,
        },
        success: () => {
          success && success()
        },
      })

      yield put({
        type: '@change',
        payload: {
          data: simulationData,
        },
      })

      yield put.resolve({
        type: '@change',
        payload: {
          analysisState: false,
        },
      })

      let {
        data: { SGSolverGateStationList },
      } = yield select((state) => state.SteadyStateCalculation)
      yield put({
        type: '@change',
        payload: {
          tabsActiveKeyKey:
            SGSolverGateStationList && SGSolverGateStationList.length > 0
              ? SGSolverGateStationList[0].NodeName
              : '',
        },
      })
    },
  },

  reducers: {},
})

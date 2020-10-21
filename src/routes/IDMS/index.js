/*
 * @Descripttion : 
 * @Author       : gujitao
 * @Date         : 2020-08-07 15:42:02
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-08 16:32:17
 */

import { dynamicWrapper, createRoute } from 'utils/core'
import BasicLayout from '@/layouts/BasicLayout'
import { routePrefix } from './config'
import model from './model'

import Home from './Home'

//demo 模块
import ForecastLoad from './Forecast/Load'
import ConditionHeatCalculation from './Condition/HeatCalculation'
import ConditionSteadyStateCalculation from './Condition/SteadyStateCalculation'
import ConditionTransientCalculation from './Condition/TransientCalculation'
import ConditionNEOsteadyStateCalculation from './Condition/NEOsteadyStateCalculation'
import GateStation from './BaseInfo/GateStation'
import PressureStation from './BaseInfo/PressureStation'
import GateStationExit from './BaseInfo/GateStationExit'
import GateStationResult from './GateStation/GateStationResult'
import PressureStationResult from './GateStation/PressureStationResult'
import PressureStationExit from './BaseInfo/PressureStationExit'
import LineManage from './LineInfo/LineManage'
import PointManage from './LineInfo/PointManage'
import PipLineManage from './LineInfo/PipLineManage'
import GasDeclare from './LoadManagement/Declare/GasDeclare'
import ModelHouse from './ModelWarehouse/ModelHouse'
import KeyUserApproval from './LoadManagement/Declare/KeyUserApproval'
import ContractInfo from './GasManage/purchasePlan/ContractInfo'
import DistributionSchemeAnalysis from './DistributionManagement/DistributionSchemeAnalysis'

const childRoutes = (app) => [
  Home(app),
  ForecastLoad(app),
  ConditionHeatCalculation(app),
  ConditionSteadyStateCalculation(app),
  ConditionTransientCalculation(app),
  GateStation(app),
  PressureStation(app),
  GateStationExit(app),
  PressureStationExit(app),
  GateStationResult(app),
  LineManage(app),
  PointManage(app),
  PipLineManage(app),
  ModelHouse(app),
  PressureStationResult(app),
  ConditionNEOsteadyStateCalculation(app),
  GasDeclare(app),
  KeyUserApproval(app),
  ContractInfo(app),
  DistributionSchemeAnalysis(app)


]

/*
 * @path        : 路由地址
 * @component   : 组件
 * @indexRoute  : 默认显示路由
 * @childRoutes : 所有子路由
 * @NotFound    : 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = (app) => [
  {
    path: routePrefix,
    title: '智能运营管理系统',
    component: dynamicWrapper(app, [model], () => BasicLayout),
    indexRoute: `${routePrefix}/steadyStateCalculation`,
    childRoutes: childRoutes(app),
  },
]

export default routesConfig

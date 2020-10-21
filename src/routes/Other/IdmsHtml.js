/*
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @Descripttion : 燃气输配管理系统
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-18 19:11:39
 */

import BasicLayout from '@/layouts/BasicLayout'
import { routePrefix } from './Idmshtml/config'

import FlowRegulation from './Idmshtml/equipment/flowRegulation'
import Valve from './Idmshtml/equipment/valve'
import VoltageRegulator from './Idmshtml/equipment/voltageRegulator'
import ContractDelivery from './Idmshtml/gasSource/contractDelivery'
import ProcurementPlan from './Idmshtml/gasSource/procurementPlan'
import Settlement from './Idmshtml/gasSource/settlement'
import KnowledgeWarehouse from './Idmshtml/kpi/knowledgeWarehouse'
import ProductionOperation from './Idmshtml/kpi/productionOperation'
import Modal from './Idmshtml/modal/modal'
import AccidentConditions from './Idmshtml/SafetyEmergency/accidentConditions'
import AccidentReport from './Idmshtml/SafetyEmergency/accidentReport'
import PersonnelEquipment from './Idmshtml/SafetyEmergency/personnelEquipment'
import ReleaseManagement from './Idmshtml/SafetyEmergency/releaseManagement'
import SafetyEmergency from './Idmshtml/SafetyEmergency/safetyEmergency'
import WorkOrder from './Idmshtml/SafetyEmergency/workOrder'
import CallPliceManage from './Idmshtml/transportation/callPliceManage'
import CallPliceSetting from './Idmshtml/transportation/callPliceSetting'
import ChangeShifts from './Idmshtml/transportation/changeShifts'
import DispatchingManagement from './Idmshtml/transportation/dispatchingManagement'
import ImportantUser from './Idmshtml/transportation/importantUser'
import Monitor from './Idmshtml/transportation/monitor'
import WorkingConditionAnalysis from './Idmshtml/transportation/workingConditionAnalysis'
import WorkingManage from './Idmshtml/transportation/workingManage'
import Workbench from './Idmshtml/workbench/workbench'

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
    title: '输配运营管理平台',
    component: BasicLayout,
    indexRoute: `${routePrefix}/procurementPlan`,
    childRoutes: [
      FlowRegulation(app),
      Valve(app),
      VoltageRegulator(app),
      ContractDelivery(app),
      ProcurementPlan(app),
      Settlement(app),
      KnowledgeWarehouse(app),
      ProductionOperation(app),
      Modal(app),
      AccidentConditions(app),
      PersonnelEquipment(app),
      AccidentReport(app),
      ReleaseManagement(app),
      SafetyEmergency(app),
      WorkOrder(app),
      CallPliceManage(app),
      CallPliceSetting(app),
      ChangeShifts(app),
      DispatchingManagement(app),
      ImportantUser(app),
      Monitor(app),
      WorkingConditionAnalysis(app),
      WorkingManage(app),
      Workbench(app),
    ],
  },
]

export default routesConfig

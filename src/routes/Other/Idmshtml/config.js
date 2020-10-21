/*
 * @Descripttion : 智能输配管理系统
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-18 19:56:35
 */

const API_PREFIX = ''
const ROUTE_PREFIX = '/idmshtml'
const ROUTES = {
  procurementPlan: {
    title: `采购计划及优化`,
    path: `${ROUTE_PREFIX}/procurementPlan`,
  },
  contractDelivery: {
    title: `合同及交付`,
    path: `${ROUTE_PREFIX}/contractDelivery`,
  },
  settlement: {
    title: `结算管理`,
    path: `${ROUTE_PREFIX}/settlement`,
  },
  workingConditionAnalysis: {
    title: `当前工况分析`,
    path: `${ROUTE_PREFIX}/workingConditionAnalysis`,
  },
  dispatchingManagement: {
    title: `调度令管理`,
    path: `${ROUTE_PREFIX}/dispatchingManagement`,
  },
  importantUser: {
    title: `重点用户管理`,
    path: `${ROUTE_PREFIX}/importantUser`,
  },
  monitor: {
    title: `监控管理`,
    path: `${ROUTE_PREFIX}/monitor`,
  },
  workingManage: {
    title: `值班管理`,
    path: `${ROUTE_PREFIX}/workingManage`,
  },
  changeShifts: {
    title: `交接班管理`,
    path: `${ROUTE_PREFIX}/changeShifts`,
  },
  callPliceSetting: {
    title: `报警设置`,
    path: `${ROUTE_PREFIX}/callPliceSetting`,
  },
  callPliceManage: {
    title: `报警信息管理`,
    path: `${ROUTE_PREFIX}/callPliceManage`,
  },
  safetyEmergency: {
    title: `安全应急预案`,
    path: `${ROUTE_PREFIX}/safetyEmergency`,
  },
  accidentConditions: {
    title: `事故工况分析`,
    path: `${ROUTE_PREFIX}/accidentConditions`,
  },
  personnelEquipment: {
    title: `人员及设备管理`,
    path: `${ROUTE_PREFIX}/personnelEquipment`,
  },
  releaseManagement: {
    title: `放散管理`,
    path: `${ROUTE_PREFIX}/releaseManagement`,
  },
  workOrder: {
    title: `工单管理`,
    path: `${ROUTE_PREFIX}/workOrder`,
  },
  accidentReport: {
    title: `事故报告`,
    path: `${ROUTE_PREFIX}/accidentReport`,
  },
  valve: {
    title: `阀门`,
    path: `${ROUTE_PREFIX}/valve`,
  },
  flowRegulation: {
    title: `流量调压阀`,
    path: `${ROUTE_PREFIX}/flowRegulation`,
  },
  voltageRegulator: {
    title: `调压器`,
    path: `${ROUTE_PREFIX}/voltageRegulator`,
  },
  model: {
    title: `模型仓`,
    path: `${ROUTE_PREFIX}/model`,
  },
  productionOperation: {
    title: `生产经营报表`,
    path: `${ROUTE_PREFIX}/productionOperation`,
  },
  knowledgeWarehouse: {
    title: `知识仓`,
    path: `${ROUTE_PREFIX}/knowledgeWarehouse`,
  },
  workbench: {
    title: `仿真共享工作台`,
    path: `${ROUTE_PREFIX}/workbench`,
  },
}

export { API_PREFIX as apiPrefix, ROUTE_PREFIX as routePrefix, ROUTES as routes }

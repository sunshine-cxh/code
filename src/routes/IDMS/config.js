/*
 * @Descripttion : 子系统配置文件
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:13:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 18:50:10
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-02 09:00:05
 */

const API_PREFIX = '/idms'
const ROUTE_PREFIX = '/idms'
const ROUTES = {
  home: {
    path: `${ROUTE_PREFIX}/home`,
    title: '首页',
  },
  load: {
    path: `${ROUTE_PREFIX}/load`,
    title: '负荷管理',
  },
  heatCalculation: {
    path: `${ROUTE_PREFIX}/heatCalculation`,
    title: '热值计算',
  },
  steadyStateCalculation: {
    path: `${ROUTE_PREFIX}/steadyStateCalculation`,
    title: '稳态工况分析',
  },
  transientCalculation: {
    path: `${ROUTE_PREFIX}/transientCalculation`,
    title: '瞬态工况分析',
  },
  NEOsteadyStateCalculation: {
    path: `${ROUTE_PREFIX}/NEOsteadyStateCalculation`,
    title: '新奥工况分析',
  },
 
  Gasdelcare: {
    path: `${ROUTE_PREFIX}/gasdeclare`,
    title: '重点用户申报',
  },
  
  gateStation: {
    path: `${ROUTE_PREFIX}/gateStation`,
    title: '门站信息',
  },
  pressureStation: {
    path: `${ROUTE_PREFIX}/pressureStation`,
    title: '调压站信息',
  },
  gateStationExit: {
    path: `${ROUTE_PREFIX}/gateStationExit`,
    title: '门站出口信息',
  },
  pressureStationExit: {
    path: `${ROUTE_PREFIX}/pressureStationExit`,
    title: '调压站出口信息',
  },
  gateStationResult: {
    path: `${ROUTE_PREFIX}/gateStationResult`,
    title: '门站输出',
  },
  pressureStationResult: {
    path: `${ROUTE_PREFIX}/pressureStationResult`,
    title: '调压站输出',
  },
  lineManage: {
    path: `${ROUTE_PREFIX}/lineManage`,
    title: '路线管理',
  },
  subLineAdd: {
    path: `${ROUTE_PREFIX}/lineManage/subLineAdd`,
    title: '新增路线',
  },
  subLineDetail: {
    path: `${ROUTE_PREFIX}/lineManage/subLineDetail`,
    title: '路线详情',
  },
  pipLineManage: {
    path: `${ROUTE_PREFIX}/pipLineManage`,
    title: '管段管理',
  },
  subPipLineAdd: {
    path: `${ROUTE_PREFIX}/pipLineManage/subPipLineAdd`,
    title: '新增管段',
  },
  subPipLineDetail: {
    path: `${ROUTE_PREFIX}/pipLineManage/subPipLineDetail`,
    title: '管段详情',
  },
  pointManage: {
    path: `${ROUTE_PREFIX}/spectionPointMange`,
    title: '巡检点管理',
  },
  modelHouse: {
    path: `${ROUTE_PREFIX}/modelWarehouse`,
    title: '模型仓管理',
  },
  subModelAdd: {
    path: `${ROUTE_PREFIX}/modelWarehouse/subModelAdd`,
    title: '模型仓添加',
  },
  subModelDetail: {
    path: `${ROUTE_PREFIX}/modelWarehouse/subModelDetail`,
    title: '模型仓详情',
  },
  keyUserApproval: {
    path: `${ROUTE_PREFIX}/keyUserApproval`,
    title: '重点用户申报',
  },
  subCaculate: {
    path: `${ROUTE_PREFIX}/keyUserApproval/subCaculate`,
    title: '重点用户计算',
  },
  subDeclareAdd:{
    path:`${ROUTE_PREFIX}/gasdeclare/subDeclareAdd`,
    title:'重点用户申报新增'
  },
  subDeclareDetail:{
    path:`${ROUTE_PREFIX}/gasdeclare/subDeclareDetail`,            
    title:'重点用户申报详情'
  },

  subApprovalDetail: {
    path: `${ROUTE_PREFIX}/keyUserApproval/subApprovalDetail`,
    title: '申报审批详情',
  },

  contractInfo:{
    path: `${ROUTE_PREFIX}/gasPurchasePlan/contractInfo`,
    title: '合同信息'
  },
  subContractAdd:{
    path: `${ROUTE_PREFIX}/gasPurchasePlan/contractInfo/subContractAdd`,
    title: '新建合同'
  },
  DistributionManagement:{
    path: `${ROUTE_PREFIX}/DistributionManagement`,
    title: '分配优化管理'
  },
  ProjecAnalysis:{
    path: `${ROUTE_PREFIX}/DistributionManagement/DistributionSchemeAnalysis`,
    title: '分配方案分析'
  }

}

const FILETYPES = ['.MDB','.mdb','.xls','.LOC','.loc','.sto']
const FILETYPES2 = ['.xls','.xlsx','.doc','.docx','.pdf',]
export { API_PREFIX as apiPrefix, ROUTE_PREFIX as routePrefix,FILETYPES as filetypes,FILETYPES2 as filetypes2, ROUTES as routes }

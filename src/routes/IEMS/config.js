/*
 * @Descripttion : 子系统配置文件
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 16:29:23
 */

const API_PREFIX = '/iems'
const ROUTE_PREFIX = '/iems'
const ROUTES = {
  brand: {
    title: '品牌信息管理',
    path: `${ROUTE_PREFIX}/brand`,
  },
  equipmentCategory: {
    title: '设备类别管理',
    path: `${ROUTE_PREFIX}/equipmentCategory`,
  },
  implementer: {
    title: '实施人员管理',
    path: `${ROUTE_PREFIX}/implementer`,
  },
  location: {
    title: '存放位置管理',
    path: `${ROUTE_PREFIX}/location`,
  },
  supplier: {
    title: '供应商管理',
    path: `${ROUTE_PREFIX}/supplier`,
  },
  unit: {
    title: '单位管理',
    path: `${ROUTE_PREFIX}/unit`,
  },
  warehouse: {
    title: '仓库管理',
    path: `${ROUTE_PREFIX}/warehouse`,
  },
  gasStation: {
    title: '气化站管理',
    path: `${ROUTE_PREFIX}/gasstation`,
  },
  gasStationAdd: {
    title: '气化站管理',
    path: `${ROUTE_PREFIX}/gasstation/subGasstationAdd`,
  },
  gasuser: {
    title: '用气用户管理',
    path: `${ROUTE_PREFIX}/gasuser`,
  },
  gasuserAdd: {
    title: '用气用户管理',
    path: `${ROUTE_PREFIX}/gasuser/subGasUserAdd`,
  },
  procurementPlan: {
    title: '采购计划',
    path: `${ROUTE_PREFIX}/procurementPlan`
  },
  procurementPlanAdd: {
    title: '新增采购计划',
    path: `${ROUTE_PREFIX}/procurementPlan/subProcurementPlanAdd`
  },
  procurementPlanDetail: {
    title: '采购计划详情',
    path: `${ROUTE_PREFIX}/procurementPlan/subProcurementPlanDetail`
  },
  procurementApply: {
    title: '采购申请',
    path: `${ROUTE_PREFIX}/procurementApply`
  },
  procurementApplyEquipment: {
    title: '设备新增',
    path: `${ROUTE_PREFIX}/procurementApply/subProcurementApplyEquipment`
  },
  procurementApplyConsumables: {
    title: '备件耗材新增',
    path: `${ROUTE_PREFIX}/procurementApply/subProcurementApplyConsumables`
  },
  procurementApplyDetail: {
    title: '采购申请详情',
    path: `${ROUTE_PREFIX}/procurementApply/subProcurementApplyDetail`
  },
  procurementTest: {
    title: '设备验收',
    path: `${ROUTE_PREFIX}/procurementTest`
  },
  procurementTestAdd: {
    title: '设备验收添加',
    path: `${ROUTE_PREFIX}/procurementTest/subProcurementTestAdd`
  },
  procurementTestDetail: {
    title: '设备验收详情',
    path: `${ROUTE_PREFIX}/procurementTest/subProcurementTestDetail`
  },
  standingBook: {
    title: '设备台账',
    path: `${ROUTE_PREFIX}/standingBook`
  },
  standingBookAdd: {
    title: '设备台账新增',
    path: `${ROUTE_PREFIX}/standingBook/substandingBookAdd`
  },
  standingBookDetail: {
    title: '设备台账详情',
    path: `${ROUTE_PREFIX}/standingBook/substandingBookDetail`
  },
  inventory: {
    title: '设备盘点',
    path: `${ROUTE_PREFIX}/inventory`
  },
  inventoryAdd: {
    title: '设备盘点新增',
    path: `${ROUTE_PREFIX}/inventory/subInventoryAdd`
  },
  inventoryDetail: {
    title: '设备盘点详情',
    path: `${ROUTE_PREFIX}/inventory/subInventoryDetail`
  },
  inventoryOperat: {
    title: '设备盘点操作',
    path: `${ROUTE_PREFIX}/inventory/subInventoryOperat`
  },
  basicData: {
    title: '耗材管理',
    path: `${ROUTE_PREFIX}/Comsumables`
  },
  basicDataAdd: {
    title: '耗材管理新增',
    path: `${ROUTE_PREFIX}/Comsumables/subBasicDataAdd`
  },
  
  inWarehouse: {
    title: '入库管理',
    path: `${ROUTE_PREFIX}/inWarehouse`
  },
  inWarehouseAdd:{
    title: '入库添加',
    path: `${ROUTE_PREFIX}/inWarehouse/subWarehouseAdd`
  },
  inWarehouseDetail: {
    title: '入库详情',
    path: `${ROUTE_PREFIX}/inWarehouse/subWarehouseDetail`
  },
  outWarehouse: {
    title: '出库管理',
    path: `${ROUTE_PREFIX}/outWarehouse`
  },
  outWarehouseAdd:{
    title: '出库添加',
    path: `${ROUTE_PREFIX}/outWarehouse/subOutWarehouseAdd`
  },
  outWarehouseDetail: {
    title: '出库详情',
    path: `${ROUTE_PREFIX}/outWarehouse/subOutWarehouseDetail`
  },
  pickingApply: {
    title: '领料申请',
    path: `${ROUTE_PREFIX}/pickingApply`
  },
  pickingApplyAdd:{
    title: '领料申请新增',
    path: `${ROUTE_PREFIX}/pickingApply/subPickingApplyAdd`
  },
  pickingApplyDetail: {
    title: '领料申请详情',
    path: `${ROUTE_PREFIX}/pickingApply/subPickingApplyDetail`
  },
  inventoryLedger: {
    title: '库存台账',
    path: `${ROUTE_PREFIX}/inventoryLedger`
  },
  inventoryLedgerDetail: {
    title: '库存台账详情',
    path: `${ROUTE_PREFIX}/inventoryLedger/subInventoryLedgerDetail`
  },
  warehouseInventory: {
    title: '仓库盘点',
    path: `${ROUTE_PREFIX}/warehouseInventory`
  },
  warehouseInventoryAdd:{
    title: '仓库盘点新增',
    path: `${ROUTE_PREFIX}/warehouseInventory/subWarehouseInventoryAdd`
  },
  warehouseInventoryDetail: {
    title: '仓库盘点详情',
    path: `${ROUTE_PREFIX}/warehouseInventory/subWarehouseInventoryDetail`
  },
  patrolStandard: {
    title: '巡检标准',
    path: `${ROUTE_PREFIX}/patrolStandard`
  },
  patrolStandardDetail: {
    title: '巡检标准详情',
    path: `${ROUTE_PREFIX}/patrolStandard/subPatrolStandardDetail`
  },
  patrolStandardAdd: {
    title: '新增巡检标准',
    path: `${ROUTE_PREFIX}/patrolStandard/subPatrolStandardAdd`
  },
  curingsStandard: {
    title: '养护标准',
    path: `${ROUTE_PREFIX}/curingsStandard`
  },
  curingsStandarddDetail: {
    title: '养护标准详情',
    path: `${ROUTE_PREFIX}/curingsStandard/subCuringsStandardDetail`
  },
  curingsStandardAdd: {
    title: '新增养护标准',
    path: `${ROUTE_PREFIX}/curingsStandard/subCuringsStandardAdd`
  },
  curingsPlan: {
    title: '养护计划',
    path: `${ROUTE_PREFIX}/curingsPlan`
  },
  curingsPlanDetail: {
    title: '养护标准详情',
    path: `${ROUTE_PREFIX}/curingsPlan/subCuringsPlanDetail`
  },
  curingsPlanAdd: {
    title: '新增养护计划',
    path: `${ROUTE_PREFIX}/curingsPlan/subCuringsPlanAdd`
  },
  curingsTask: {
    title: '养护任务',
    path: `${ROUTE_PREFIX}/curingsTask`
  },
  curingsTaskDetail: {
    title: '养护任务详情',
    path: `${ROUTE_PREFIX}/curingsTask/subCuringsTaskDetail`
  },
  curingsTaskOperate: {
    title: '新增养护任务',
    path: `${ROUTE_PREFIX}/curingsTask/subCuringsTaskOperate`
  },
  patrolStandardEdit: {
    title: '编辑巡检标准',
    path: `${ROUTE_PREFIX}/patrolStandard/subPatrolStandardEdit`
  },
  patrolTask: {
    title: '巡检任务',
    path: `${ROUTE_PREFIX}/patrolTask`
  },
  patrolTaskDetail: {
    title: '巡检任务详情',
    path: `${ROUTE_PREFIX}/patrolTask/subPatrolTaskDetail`
  },
  patrolTaskOperate: {
    title: '巡检任务详情',
    path: `${ROUTE_PREFIX}/patrolTask/subPatrolTaskOperate`
  },
  patrolTaskSubmit: {
    title: '巡检任务详情',
    path: `${ROUTE_PREFIX}/patrolTask/subPatrolTaskSubmit`
  },
  patrolPlan: {
    title: '巡检计划',
    path: `${ROUTE_PREFIX}/patrolPlan`
  },
  patrolPlanDetail: {
    title: '巡检计划详情',
    path: `${ROUTE_PREFIX}/patrolPlan/subPatrolPlanDetail`
  },
  patrolPlanAdd: {
    title: '新增巡检计划',
    path: `${ROUTE_PREFIX}/patrolPlan/subPatrolPlanAdd`
  },
  patrolPlanEdit: {
    title: '编辑巡检计划',
    path: `${ROUTE_PREFIX}/patrolPlan/subPatrolPlanEdit`
  },
  move: {
    title: '调拨转移',
    path: `${ROUTE_PREFIX}/move`
  },
  moveAdd: {
    title: '调拨转移新增',
    path: `${ROUTE_PREFIX}/move/subMoveAdd`
  },
  moveDetail: {
    title: '调拨转移详情',
    path: `${ROUTE_PREFIX}/move/subMoveDetail`
  },
  scrap: {
    title: '设备报废',
    path: `${ROUTE_PREFIX}/scrap`
  },
  scrapAdd: {
    title: '报废新增',
    path: `${ROUTE_PREFIX}/scrap/subScrapAdd`
  },
  scrapDetail: {
    title: '报废详情',
    path: `${ROUTE_PREFIX}/scrap/subScrapDetail`
  },
  sell: {
    title: '设备变卖',
    path: `${ROUTE_PREFIX}/sell`
  },
  sellAdd: {
    title: '变卖新增',
    path: `${ROUTE_PREFIX}/sell/subSellAdd`
  },
  sellDetail: {
    title: '变卖详情',
    path: `${ROUTE_PREFIX}/sell/subSellDetail`
  },
  recipients: {
    title: '设备领用',
    path: `${ROUTE_PREFIX}/recipients`
  },
  recipientsAdd: {
    title: '领用新增',
    path: `${ROUTE_PREFIX}/recipients/subRecipientsAdd`
  },
  recipientsDetail: {
    title: '领用详情',
    path: `${ROUTE_PREFIX}/recipients/subRecipientsDetail`
  },
  recipientsReturn: {
    title: '领用归还',
    path: `${ROUTE_PREFIX}/recipients/subRecipientsReturn`
  },
  repairOrder: {
    title: '报修工单',
    path: `${ROUTE_PREFIX}/repairOrder`
  },
  repairOrderDetail: {
    title: '报修工单详情',
    path: `${ROUTE_PREFIX}/repairOrder/subRepairOrderDetail`
  },
  repairOrderAdd: {
    title: '新增报修工单',
    path: `${ROUTE_PREFIX}/repairOrder/subRepairOrderAdd`
  },
  external: {
    title: '外委维修',
    path: `${ROUTE_PREFIX}/external`
  },
  externalDetail: {
    title: '外委维修详情',
    path: `${ROUTE_PREFIX}/external/subExternalDetail`
  },
  externalAdd: {
    title: '外委维修工单',
    path: `${ROUTE_PREFIX}/external/subExternalAdd`
  },
}
const FILETYPES = ['.doc','.docx','.pdf','.xls','.xlsx','.pptx','.ppt','.txt','.rar','.zip','.7z']
const IMAGETYPES = ['.png','.jpg','.jpeg','.bmp','.gif','.ico']
export {
  API_PREFIX as apiPrefix,
  ROUTE_PREFIX as routesPrefix,
  ROUTES as routes,
  FILETYPES as filetypes,
  IMAGETYPES as imagetypes
}

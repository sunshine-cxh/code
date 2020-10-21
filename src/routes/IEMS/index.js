/*
 * @Descripttion : 设备管理子系统
 * @Author       : wuhaidong
 * @Date         : 2020-03-09 10:13:17
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-01 09:06:01
 */
import { dynamicWrapper, createRoute } from 'utils/core'
import BasicLayout from '@/layouts/BasicLayout'
import { routesPrefix } from './config'

//一级导航 设备管理
import model from './model'
import EquipmentBrand from './basicData/Brand'
import EquipmentCategory from './basicData/EquipmentCategory'
import EquipmentImplementer from './basicData/Implementer'
import EquipmentLocation from './basicData/Location'
import EquipmentSupplier from './basicData/Supplier'
import EquipmentUnit from './basicData/Unit'
import EquipmentWarehouse from './basicData/Warehouse'
import EquipmentGasStation from './basicData/GasStation'
import EquipmentGasUser from './basicData/GasUser'
import EquipmentProcurementPlan from './purchase/ProcurementPlan'
import EquipmentProcurementApply from './purchase/ProcurementApply'
import EquipmentProcurementTest from './purchase/ProcurementTest'
import EquipmentComsumables from './SparePartsSupplies/Comsumables'
import EquipmentStandingBook from './equipment/standingBook'
import EquipmentInventory from './equipment/inventory'
import EquipmentInWarehouse from './SparePartsSupplies/InWarehouse'
import EquipmentOutWarehouse from './SparePartsSupplies/OutWarehouse'
import EquipmentPickingApply from './SparePartsSupplies/PickingApply'
import EquipmentInventoryLedger from './SparePartsSupplies/InventoryLedger'
import EquipmentWarehouseInventory from './SparePartsSupplies/WarehouseInventory'
import EquipmentPatrolStandard from './Patrol/PatrolStandard'
import EquipmentPatrolPlan from './Patrol/PatrolPlan'
import EquipmentPatrolTask from './Patrol/PatrolTask'
import EquipmentCuringsStandard from './Operations/CuringsStandard'
import EquipmentCuringsPlan from './Operations/CuringsPlan'
import EquipmentCuringsTask from './Operations/CuringsTask'
import EquipmentRepairOrder from './maintain/RepairOrder'
import EquipmentMove from './disposition/Move'
import EquipmentScrap from './disposition/Scrap'
import EquipmentSell from './disposition/Sell'
import EquipmentRecipients from './disposition/Recipients'
import EquipmentExternal from './maintain/External'
/*
 * @path        : 路由地址
 * @component   : 组件
 * @indexRoute  : 默认显示路由
 * @childRoutes : 所有子路由
 * @NotFound    : 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = (app) => [
  {
    path: routesPrefix,
    title: '设备管理系统',
    component: dynamicWrapper(app, [model], () => BasicLayout),
    indexRoute: `${routesPrefix}/brand`,
    childRoutes: [
      EquipmentBrand(app),
      EquipmentCategory(app),
      EquipmentImplementer(app),
      EquipmentLocation(app),
      EquipmentSupplier(app),
      EquipmentUnit(app),
      EquipmentWarehouse(app),
      EquipmentProcurementPlan(app),
      EquipmentProcurementApply(app),
      EquipmentProcurementTest(app),
      EquipmentStandingBook(app),
      EquipmentComsumables(app),
      EquipmentInWarehouse(app),
      EquipmentOutWarehouse(app),
      EquipmentPickingApply(app),
      EquipmentInventoryLedger(app),
      EquipmentWarehouseInventory(app),
      EquipmentInventory(app),
      EquipmentPatrolStandard(app),
      EquipmentPatrolPlan(app),
      EquipmentPatrolTask(app),
      EquipmentRepairOrder(app),
      EquipmentMove(app),
      EquipmentScrap(app),
      EquipmentSell(app),
      EquipmentRecipients(app),
      EquipmentExternal(app),
      EquipmentGasStation(app),
      EquipmentGasUser(app),
      EquipmentCuringsStandard(app),
      EquipmentCuringsPlan(app),
      EquipmentCuringsTask(app)
    ],
  },
]

export default routesConfig

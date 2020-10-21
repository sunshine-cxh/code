/*
 * @Descripttion : 
 * @Author       : caojiarong
 * @Date         : 2020-05-11 16:50:20
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 12:50:13
 */
import React from 'react'
function getTypeName(type){
  switch (type) {
    case 1:
      return '普通入库'
    case 2:
      return '采购入库'
    case 3:
      return '领用归还'
    case 4:
      return '盘盈入库'
    case 5:
      return '生产出库'
    case 6:
      return '发货出库'
    case 7:
      return '盘亏出库'
    default:
      return ''
  }
}
// 存在归还人
export const baseInfoReturnColumns = (self) =>{
  return [
    {
      title: '入库仓库',
      name: 'warehouseName',
    },
    {
      title: '入库时间',
      name: 'operateTime'
    },
    {  
      title: '入库类型',
      name: 'outInType',
      render:(text,record)=>{
        return (<span>{getTypeName(record.outInType)}</span>)
      }
    },
    {
      title: '采购申请',
      isShow: self.props.inWarehouseDetail.details.outInType && self.props.inWarehouseDetail.details.outInType == 2,
      name: 'relateCode'
    },
    {
      title: '归还人',
      isShow:  self.props.inWarehouseDetail.details.outInType && self.props.inWarehouseDetail.details.outInType == 3,
      name: 'receiveUserName'
    },
    {
      title: '备注',
      name: 'remark'
    }
  ]
}

// 不存在归还人
export const baseInfoColumns = (self) =>{
  return [
    {
      title: '入库仓库',
      name: 'warehouseName',
    },
    {
      title: '入库时间',
      name: 'operateTime'
    },
    {  
      title: '入库类型',
      name: 'outInType',
      render:(text,record)=>{
        return (<span>{getTypeName(record.outInType)}</span>)
      }
    },
    {
      title: '采购申请',
      isShow: self.props.inWarehouseDetail.details.outInType && self.props.inWarehouseDetail.details.outInType == 2,
      name: 'relateCode'
    },
    {
      title: '归还人',
      isShow:  self.props.inWarehouseDetail.details.outInType && self.props.inWarehouseDetail.details.outInType == 3,
      name: 'receiveUserName'
    },
    {
      title: '备注',
      name: 'remark'
    }
  ]
}
export const createColumnsApp = (self, expand, props) => {
  return [
    {
      title: '产品编号',
      name: 'productCode',
      tableItem: {
        width: 80,
      }
    },
    {
      title: '产品名称',
      name: `productName`,
      tableItem: {
        width: 80,
      }
    },
    { 
      title: '单位',  
      name: 'unitName',
      tableItem: {
        width: 80
      }
    },
    {
      title: '规格',
      name: 'standard',
      tableItem: {
        width: 80
      }
    },
    { 
      title: '品牌',
      name: 'brandName',
      tableItem: {
        width: 80
      }
    },
    {
      title: '入库数量',
      name: 'amount',
      tableItem: {
        width: 80
      }
    },
    {
      title: '单价',
      name: 'price',
      tableItem: {
        width: 80
      }
    },
    {
      title: '总价',  
      name: 'totalPrice',
      tableItem: {
        width: 80
      }
    }
  ]
}

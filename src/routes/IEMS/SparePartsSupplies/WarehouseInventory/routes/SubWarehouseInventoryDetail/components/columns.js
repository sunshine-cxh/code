/*
 * @Descripttion : 仓库盘点列表表头
 * @Author       : caojiarong
 * @Date         : 2020-05-25 16:50:20
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-08 10:18:18
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import DataTable, { EditableOper } from 'components/DataTable'

export const baseInfoColumns = (self) =>{
  
  return [
    {
      title: '盘点仓库',
      name: 'warehouseName',
    },
    {
      title: '盘点日期',
      name: 'operateTime'
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
      // formItem:{
      //   disabled:true,
      // },
      tableItem: {}
    },
    {
      title: '产品名称',
      name: `productName`,
      // formItem:{
      //   disabled:true,
      // },
      tableItem: {}
    },
    { //-----------todo unitName 修改单位名称字段
      title: '单位',  
      name: 'unitName',
      // formItem: {
      //   disabled:true,
      //   type: 'select',
      //   dict: props.warehouseInventoryAdd.unitList,
      // },
      tableItem: {
        render:(text,record)=><span>{record.unitName}</span>
      }
    },
    {
      title: '规格',
      name: 'standard',
      // formItem:{
      //   disabled:true,
      // },
      tableItem: {}
    },
    { 
      title: '品牌',
      name: 'brandName',
      // formItem: {
      //   disabled:true,
      //   type: 'select',
      //   dict: props.warehouseInventoryAdd.brandList,
      // },
      tableItem: {
        render:(text,record)=><span>{record.brandName}</span>
      }
    },
    {
      title: '库存数量',
      name: 'totalAmount',
      // formItem:{
      //   type: 'number', 
      //   disabled:'true'
      // },
      tableItem: {
        
      }
    },
    {
      title: '盘点数量',
      name: 'InventoryAmount',
      // formItem:{
      //   type: 'number'
      // },
      tableItem: {
      }
    },
    {
      title: '盘点差异',  
      name: 'totalPrice',
      tableItem: {
        width: 80,
        type: 'number',
        setIdToName: true,
      }
    },
  ]
}

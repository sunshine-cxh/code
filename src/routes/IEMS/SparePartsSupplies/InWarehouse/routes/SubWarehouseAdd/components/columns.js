import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import DataTable, { EditableOper } from 'components/DataTable'


export const createColumnsApp = (self, expand, props) => {
  return [
    {
      title: '产品编号',
      name: 'productCode',
      formItem:{
        disabled:true,
      },
      tableItem: {}
    },
    {
      title: '产品名称',
      name: `productName`,
      formItem:{
        disabled:true,
      },
      tableItem: {}
    },
    { //-----------todo unitName 修改单位名称字段
      title: '单位',  
      name: 'unitId',
      formItem: {
        disabled:true,
        type: 'select',
        dict: props.inWarehouseAdd.unitList,
      },
      tableItem: {
        render:(text,record)=><span>{record.unitName}</span>
      }
    },
    {
      title: '规格',
      name: 'standard',
      formItem:{
        disabled:true,
      },
      tableItem: {}
    },
    { 
      title: '品牌',
      name: 'brandId',
      formItem: {
        disabled:true,
        type: 'select',
        dict: props.inWarehouseAdd.brandList,
      },
      tableItem: {
        render:(text,record)=><span>{record.brandName}</span>
      }
    },
    {
      title: '入库数量',
      name: 'amount',
      formItem:{
        type: 'number'
      },
      tableItem: {}
    },
    {
      title: '单价(元)',
      name: 'price',
      formItem:{ 
        disabled:true,
      },
      tableItem: {
      }
    },
    {
      title: '总价（元）',  
      name: 'totalPrice',
      tableItem: {
        width: 80,
        type: 'number',
        setIdToName: true,
      }
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip="编辑" onClick={e => self.handleEdit(record)}>
                    <Icon type="edit" />
                  </Button>
                  <Button tooltip="删除" onClick={e => self.handleDelete(record)}>
                    <Icon type="delete" />
                  </Button>
                </>
              )
            }
          </EditableOper>
        )
      }
    }
  ]
}

export const createColumnsApply = (self)=> {
  return [
    {
      title: '申请单号',
      name: 'sn',
      tableItem: {
        
      }
    },
    {
      title: '标题',
      name: `title`,
      tableItem: {
        
      }
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {
        
      }
    },
    {
      title: '申请人',
      name: `createdName`,
      tableItem: {
 
      }
    }
  ]
}

export const createColumnsProduct = (self, expand) => {
  return [
    {
      title: '产品编号',
      name: 'code',
      tableItem: {
        
      }
    },
    {
      title: '产品名称',
      name: `name`,
      tableItem: {
        
      }
    },
    {
      title: '单位',
      name: 'unitDesc',
      tableItem: {
        
      }
    },
    {
      title: '规格',
      name: `standard`,
      tableItem: {
        
      }
    },
    {
      title: '品牌',
      name: 'brandDesc',
      tableItem: {
        
      }
    }
  ]
}
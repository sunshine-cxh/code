import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import Popconfirm from 'components/Popconfirm'
import DataTable, { EditableOper } from 'components/DataTable'
import { func } from 'prop-types'

function getType(type){
  switch(type){
    case 1:
      return '维修'
    case 2:
      return '养护'
    case 3:
      return '其他'
    default:
      return '未知状态'
  }
}
// 规范化文件大小 
// params：fileSize 文件大小，默认byte
function convertStandard(fileSize){
  if(fileSize < 1024 * 1024){
    let newStandard = (fileSize / 1024 ).toFixed(2)
    return newStandard + ' KB'
  }else if(fileSize > 1024 * 1024){
    let newStandard = (fileSize / ( 1024 * 1024 )).toFixed(2)
    return newStandard + ' MB'
  }
}
export const createColumnsApp = (self, expand, props) => {
  return [
    {
      title: '产品编号',
      name: 'productCode',
      formItem: {
        disabled:true,
      },
      tableItem: {
      }
    },
    {
      title: '产品名称',
      name: `productName`,
      formItem: {
        disabled:true,
      },
      tableItem: {
      }
    },
    { 
      title: '单位',  
      name: 'unitId',
      formItem: {
        disabled:true,
        type: 'select',
        dict: props.outWarehouseAdd.unitList,
      },
      tableItem: {
        render: (text,record)=><span>{record.unitName}</span>
      }
    },
    {
      title: '规格',
      name: 'standard',
      formItem: {
        disabled:true,
      },
      tableItem: {
      }
    },
    {
      title: '品牌',
      name: 'brandId',
      formItem: {
        disabled:true,
        type: 'select',
        dict: props.outWarehouseAdd.brandList,
      },
      tableItem: {
        render: (text,record)=><span>{record.brandName}</span>
      }
    },
    {
      title: '库存数量',
      name: 'totalAmount',
      formItem:{
        disabled:true,
        type: 'number'
      },
      tableItem: {
        
      }
    },
    {
      title: '出库数量',
      name: 'amount',
      formItem:{
        type: 'number'
      },
      tableItem: {
        
      }
    },
    {
      title: '单价（元）',
      name: 'price',
      formItem:{
        type: 'number'
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
                  <Button tooltip="删除" onClick={e => self.handleDelete(record, 'detail')}>
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
      tableItem: {}
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {}
    },
    {
      title: '申请人',
      name: `createdName`,
      tableItem: {}
    },
    {
      title: '申请类型',
      name: `type`,
      tableItem: {
        render:(text,record)=>(<span>{getType(record.type)}</span>)
      },
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
    },
    {
      title: '库存数量',
      name: `totalAmount`,
      tableItem: {
        
      }
    }
  ]
}

export const createColumnsFile = (self, expand) => {
  return [
    {
      title: '文件名称',
      name: 'fileName',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
              <Button tooltip="下载" type='text' style={{color: 'rgba(52, 132, 254, 1)'}} onClick={
                ()=> {
                  self.handleDownload(record)
                }
              }>{record.fileName}</Button>
              )
            }
          </EditableOper>
        )
      }
    },
    {
      title: '文件大小',
      name: 'fileSize',
      tableItem: {
        render:(text,record)=>{
          return (
            <>
              <span>{convertStandard(record.fileSize)}</span>
            </>
          )
        }
      }
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {}
    },
    {
      title: '操作',
      name: 'operate',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <Button tooltip="删除" onClick={e => self.handleDelete(record, 'file')}>
                  <Icon type="delete" />
                </Button>
              )
            }
          </EditableOper>
        )
      }
    }
  ]
}
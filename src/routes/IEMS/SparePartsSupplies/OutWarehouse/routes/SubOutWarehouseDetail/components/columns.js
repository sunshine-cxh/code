/*
 * @Descripttion : 出库管理列表参数
 * @Author       : caojiarong
 * @Date         : 2020-05-14 10:50:20
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-30 15:31:19
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import DataTable, { EditableOper } from 'components/DataTable'

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
export const baseInfoColumns = (self) =>{
  
  return [
    {
      title: '出库仓库',
      name: 'warehouseName',
    },
    {
      title: '出库时间',
      name: 'operateTime'
    },
    {  
      title: '出库类型',
      name: 'outInType',
      render:(text,record)=>{
        return (<span>{getTypeName(record.outInType)}</span>)
      }
    },
    {
      title: '领料人',
      name: 'receiveUserName'
    },
    {
      title: '领料单',
      name: 'relateCode'
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
    //todo
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
      title: '出库数量',
      name: 'amount',
      tableItem: {
        width: 80,
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
          <span>{convertStandard(record.fileSize)}</span>
          )
        }
      }
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {}
    }
  ]
}

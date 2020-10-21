/*
 * @Descripttion : 领料申请列表参数
 * @Author       : caojiarong
 * @Date         : 2020-05-14 10:50:20
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-30 16:57:00
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

function filterName(list = []){
  let nameString = ''
  for(let i = 0; i < list.length; i++){
    nameString = nameString +list[i].auditorName
  }
  return nameString
}
export const baseInfoColumns = (self) =>{
  return [
    {
      title: '标题',
      name: 'title',
    },
    {
      title: '申请人',
      name: 'createdName',
    },
    {
      title: '申请类型',
      name: 'type',
    },
    {  
      title: '关联单号',
      name: 'relateid'
    },
    {  //TODO ---名称才对，不应该是id-list
      title: '审批人',
      name: 'flowSchemeDataList',
      render:(text,record)=>{
        return (
        <span>{filterName(record.identityUsers)}</span>
        )
      }
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
      name: 'sn',
      tableItem: {}
    },
    {
      title: '产品名称',
      name: `name`,
      formItem: {
      },
      tableItem: {}
    },
    { 
      title: '单位',  
      name: 'unitDesc',
      tableItem: {
      }
    },
    {
      title: '申请数量',
      name: 'num',
      tableItem: {}
    },
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
      name: 'size',
      tableItem: {render:(text,record)=>{
        return (
        <span>{convertStandard(record.fileSize)}</span>
        )
      }}
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {}
    }
  ]
}

export const createCheckColumns = (self) => {
  return [
    {
      title: '审批人',
      name: 'auditorName',
      tableItem: {},
    },
    {
      title: '审批时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      //TODO ---分类名称才对
      title: '审批意见',
      name: 'description',
      tableItem: {},
    },
    {
      //TODO ---分类名称才对
      title: '审批结果',
      name: 'resultAction',
      tableItem: {},
    },
  ]
}
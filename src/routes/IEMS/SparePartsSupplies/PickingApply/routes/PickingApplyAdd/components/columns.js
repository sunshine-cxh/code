import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import Popconfirm from 'components/Popconfirm'
import DataTable, { EditableOper } from 'components/DataTable'
import { func } from 'prop-types'

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
      formItem: {disabled:true,},
      tableItem: {}
    },
    {
      title: '产品名称',
      name: `productName`,
      formItem: {
        disabled:true,
      },
      tableItem: {}
    },
    { 
      title: '单位',  
      name: 'unitId',
      formItem: {
        disabled:true,
        type: 'select',
        dict: props.pickingApplyAdd.unitList,
      },
      tableItem: {
        render:(text,record)=><span>{record.unitName}</span>
      }
    },
    
    {
      title: '申请数量',
      name: 'num',
      formItem:{
        type: 'number'
      },
      tableItem: {}
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
                (<>
                  <Button tooltip="编辑" onClick={e => {self.handleEdit(record)}}>
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

// 养护类型的列表表头
export const createColumnsApplyConserve = (self)=> {
  return [
    {
      title: '序号',
      name: 'id'
    },
    {
      title: '任务单号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '计划名称',
      name: 'planName',
      tableItem: {}
    },
    {
      title: '设备名称',
      name: `deviceName`,
      tableItem: {}
    },
    {   // ----------- todo 应该是地址名称才对---------------
      title: '存放地址',
      name: `locationtreeId`,
      tableItem: {},
    },
    {
      title: '开始日期',
      name: `startTime`,
      tableItem: {},
    },
    {
      title: '截止日期',
      name: `endTime`,
      tableItem: {},
    }
  ]
}

// 维修类型的列表表头
export const createColumnsApplyService = (self)=> {
  return [
    {
      title: '序号',
      name: 'id'
    },
    {
      title: '单号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '设备名称',
      name: `ledgerName`,
      tableItem: {}
    },
    {
      title: '设备编号',
      name: `ledgerCode`,
      tableItem: {},
    },
    {
      title: '报障时间',
      name: `reportTime`,
      tableItem: {},
    },
    {
      title: '状态',
      name: `stateStr`,
      tableItem: {},
    },
    {  //---------- todo 需要确认的字段名是否正确-------------
      title: '处理人',
      name: `createdName`,
      tableItem: {},
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
      title: '分类',
      name: `categoryDesc`,
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
export const createColumnsApproval = (self) => {
  return [
    {
      title: '姓名',
      name: 'realName',
      tableItem: {},
    },
    {
      title: '账号',
      name: 'account',
      tableItem: {},
    },
    {
      title: '邮箱',
      name: `email`,
      tableItem: {},
    },
    {
      title: '职位',
      name: 'birthday',
      tableItem: {},
    },
  ]
}

/*
 * @Descripttion : 领料申请的列表表头参数
 * @Author       : caojiarong
 * @Date         : 2020-05-18 14:00:01
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 10:06:01
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

// 根据typeId转换类型名称
function getTypeName(type) {
  switch (type) {
    case 1:
      return '维修'
    case 2:
      return '养护'
    case 3:
      return '其他'
    default:
      return '-'
  }
}

// 根据statusId转换状态名称
function getStatusName(type) {
  switch (type) {
    case 0:
      return <span className='noStart'>未开始</span>
    case 1:
      return <span className='working'>进行中</span>
    case 2:
      return <span className='finished'>已完成</span>
    default:
      return <span>-</span>
  }
}
let dict=[{code:'1',codeName:'1'}]

export const createColumns = (self, expand) => {
  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: '申请单号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {}
    },
    {
      title: '申请类型',
      name: 'receiveUserName',
      tableItem: {
        render: (text, record) => {
          return getTypeName(record.type)
        }
      }
    },
    {
      title: '备注',
      name: 'remark',
      tableItem: {},
    },
    // {
    //   title: '当前节点',
    //   name: 'currentNodeName',
    //   tableItem: {
    //     render: (text, record) => (
    //       <EditableOper>
    //         {form =>
    //           (
    //           <Button tooltip="查看审批进度" type='text' style={{color: 'rgba(52, 132, 254, 1)'}} onClick={
    //             ()=> {
    //               self.handleCheck(record)
    //             }
    //           }>{record.nodeName}</Button>
    //           )
    //         }
    //       </EditableOper>
    //     )
    //   },
    // },
    {
      title: '审批状态',
      name: 'isCommit',
      tableItem: {
        render: (text, record) => {
          return <span tooltip="查看审批进度" 
                    type='text' 
                    style={{color: 'rgba(52, 132, 254, 1)', cursor:'pointer'}} 
                  onClick={()=> {self.handleCheck(record)}}>
            {getStatusName(record.isCommit)}
            </span>
        }
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 80,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
                  </Button>
                {
                  record.isCommit==0 ? 
                  <Button tooltip='编辑' onClick={e => self.handleEdit(record)}>
                    <Icon type='edit' />
                  </Button>:''
                }
                  
                  
                </>
              )
            }
          </EditableOper>
        )
      },
    },
  ]
}


export const createFormColumns = (self, approveStatusList, pickingTypeList) => {
  return [
    {
      title: '领料单号',
      name: 'sn',
      tableItem: {},
      formItem:{
        type:'input'
      }
    },
    {
      title: '领料类型',
      name: 'type',
      tableItem: {},
      searchItem: {
      },
      formItem: {
        type: 'select',
        dict: pickingTypeList,
        allowClear: true
      }
    },
    {
      title: '审批状态',
      name: 'auditStatus',
      tableItem: {},
      searchItem: {
      },
      formItem: {
        type: 'select',
        dict: approveStatusList,
        allowClear: true
      }
    },
    {
      title: '领料日期',
      name: 'operateTime',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
        allowClear: true
      }
    }
  ]
}
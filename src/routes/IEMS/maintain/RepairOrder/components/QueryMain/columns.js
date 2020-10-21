/*
 * @Descripttion : 报修工单列表表头参数
 * @Author       : caojiarong
 * @Date         : 2020-06-17 11:30:01
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 17:14:00
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  return [
    {
      title: '报修编号',
      name: 'code',
      tableItem: {},
      formItem:{
        disabled:true,
        type:'input'
      }
    },
    {
      title: '设备编号',
      name: 'ledgerCode',
      tableItem: {
        render:(text, record)=>{
          return (
          <span style={{color:'#2599D7',cursor:'pointer'}} onClick={()=>{ self.toDeviceDetail(record.ledgerId) }}>{record.ledgerCode}</span>
          )
        }
      },
    },
    {
      title: '设备名称',
      name: 'ledgerName',
      tableItem: {}
    },
    {
      title: '设备所属部门',
      name: 'reportDepartment',
      tableItem: {},
    },
    {
      title: '报障人',
      name: 'reportUser',
      tableItem: {
      },
      formItem:{
        disabled:true,
        type:'input'
      }
    },
    {
      title: '报障时间',
      name: 'reportTime',
      tableItem: {},
      formItem:{
        disabled:true,
        type:'input'
      }
    },
    {
      title: '故障类型',
      name: 'faultTypeStr',
      tableItem: {},
    },
    {
      title: '故障等级',
      name: 'faultLevelStr',
      tableItem: {},
      formItem:{
        disabled:true,
        type:'input'
      }
    },
    {
      title: '故障内容',
      name: 'content',
      tableItem: {},
    },
    {
      title: '状态',
      name: 'stateStr',
      tableItem: {},
    },
    {
      title: '处理人',
      name: 'processorName',
      tableItem: {},
    },
    {
      title: '故障描述',
      name: 'content',
      formItem:{
        disabled:true,
        type:'input'
      }
    },
    {
      title: '撤销原因',
      name: 'result',
      formItem:{
        type:'textarea',
      },
    },

    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 180,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip='分派' onClick={e => self.assign(record,'分派维修任务')}>
                    <Icon type='dispatch' />
                  </Button>
                  <Button tooltip='重新分派' onClick={e => self.assign(record, '重新分派维修任务')}>
                    <Icon type='redispatch' />
                  </Button>
                  <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
                  </Button>
                  <Button tooltip='撤销' onClick={e => self.handleRevoke(record)}>
                    <Icon type='revoke' />
                  </Button>
                </>
              )
            }
          </EditableOper>
        )
      },
    },
  ]
}


export const createFormColumns = (self, typeList) => {
  return [
    // {
    //   title: '所属公司',
    //   name: 'name',
    //   tableItem: {},
    //   formItem:{
    //     type:'select',
    //     dict: self.props.repairOrder.companyList
    //   }
    // },
    {
      title: '维修单号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input'
      }
    },
    {
      title: '设备名称',
      name: 'ledgerName',
      tableItem: {},
      formItem: {}
    },
    {
      title: '设备编号',
      name: 'ledgerCode',
      tableItem: {},
      formItem: {
        type: 'input'
      }
    },
    {
      title: '处理人',
      name: 'processor',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear:true,
        dict: self.props.repairOrder.peopleList
      }
    },
    {
      title: '报障人',
      name: 'reportUserId',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear:true,
        dict: self.props.repairOrder.peopleList
      }
    },
    {
      title: '状态',
      name: 'state',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear:true,
        dict: self.props.repairOrder.repairOrderList
      }
    },
    {
      title: '报障时间',
      name: 'reportTime',
      tableItem: {},
      formItem: {
        type: 'date~'
      }
    }
  ]
}

export const assignColumns = (self, expand, props) => {
  return [
    {
      title: '维修员姓名',
      name: 'realName',
      tableItem: {}
    },
    {
      title: '性别',
      name: `gender`,
      tableItem: {}
    },
    { 
      title: '资质证书',  
      name: 'certificate',
      tableItem: {}
    },
    {
      title: '未完成工单数',
      name: 'undoOrder',
      tableItem: {}
    }
  ]
}
/*
 * @Descripttion : 巡检计划列表表头参数
 * @Author       : caojiarong
 * @Date         : 2020-06-08 11:30:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 11:56:17
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  let warntransfer = {
    1: '天',
    2: '周',
    3: '月'
  }
  let cycletransfer = {
    4: '时',
    1: '天',
    2: '周',
    3: '月'
  }
  let statusTransfer = {
    1: '未开始',
    2: '进行中',
    3: '已结束',
    4: '已停止'
  }
  return [
    {
      title: '计划编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '计划名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '责任人',
      name: 'responseString',
      tableItem: {}
    },
    {
      title: '巡检周期',
      name: 'cycle',
      tableItem: {
        render: (text, record) => {
          return <span>{`${record.cycle}${cycletransfer[record.cycleUnit]}`}</span>
        }
      },
    },
    {
      title: '提前提醒时间',
      name: 'noticeTime',
      tableItem: {
        render: (text, record) => {
          
          return <span>{record.noticeTime ? `${record.noticeTime}${warntransfer[record.noticeUnit]}` : null}</span>
        }
      },
    },
    {
      title: '开始执行时间',
      name: 'startTime',
      tableItem: {
        render: (text, record) => {
          return record.startTime && record.startTime.slice(0, 10)
        }
      },
    },
    {
      title: '结束执行时间',
      name: 'endTime',
      tableItem: {
        render: (text, record) => {
          return record.endTime && record.endTime.slice(0, 10)
        }
      },
    },
    {
      title: '计划状态',
      name: 'planStatus',
      tableItem: {
        render: (text, record) => {
          return <span>{`${statusTransfer[record.planStatus]}`}</span>
        }
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 160,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
                  </Button>
                  {record.planStatus == 1 ? <Button tooltip='编辑' onClick={e => self.handleEdit(record)}>
                    <Icon type='edit' />
                  </Button> : null}
                  {record.planStatus == 2 ? <Button tooltip='停止' onClick={e => { self.handleStop(record) }}>
                    <Icon type='pause' />
                  </Button> : null}
                  {/* <Button tooltip='删除' onClick={e => self.handleDelete(record, 'delete', '是否要删除这1项？')}>
                    <Icon type='delete' />
                  </Button> */}
                </>
              )
            }
          </EditableOper>
        )
      },
    },
  ]
}


export const createFormColumns = (self) => {
  let statusList = [
    {
      code: 1,
      codeName: '未开始'
    },
    {
      code: 2,
      codeName: '进行中'
    },
    {
      code: 3,
      codeName: '已结束'
    },
    {
      code: 4,
      codeName: '已停止'
    },
  ]
  let { patrolPlan: { allUserList } } = self.props
  return [
    {
      title: '计划编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true
      }
    },
    {
      title: '计划名称',
      name: 'name',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true
      }
    },
    {
      title: '责任人',
      name: 'responserIds',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: allUserList,
        allowClear: true
      }
    },
    {
      title: '计划状态',
      name: 'planStatus',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: statusList,
        allowClear: true

      }
    },

  ]
}
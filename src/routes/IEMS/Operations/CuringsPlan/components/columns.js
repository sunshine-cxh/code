/*
 * @Descripttion : 养护计划列表表头参数
 * @Author       : hezihua
 * @Date         : 2020-06-08 11:30:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 15:55:04
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  let { curingsPlan: { allUserList }} = self.props
  let warntransfer = {
    1: '时',
    2: '天',
    3: '周',
    4: '月',
    5: '年'
  }
  let cycletransfer = {
    1: '天',
    2: '月',
    3: '年'
  }
  let statusTransfer = {
    1: '未开始',
    2: '进行中',
    3: '已完成',
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
      name: 'planName',
      tableItem: {},
    },
    {
      title: '设备编号',
      name: 'equipmentCode',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: 'equipmentName',
      tableItem: {},
    },
    {
      title: '责任人',
      name: 'personLiableId',
      tableItem: {
        render: (text, record) => {
          let name = ''
          allUserList.forEach(item => {
            if (item.code === record.personLiableId) {
              name = item.codeName
            }
          })
          return name
        }
      }
    },
    {
      title: '养护周期',
      name: 'cycle',
      tableItem: {
        render: (text, record) => {
          return <span>{`${record.cycle}${cycletransfer[record.cycleUnit]}`}</span>
        }
      },
    },
    {
      title: '提前提醒',
      name: 'remindAdvance',
      tableItem: {
        render: (text, record) => {
          return <span>{`${record.remindAdvance}${warntransfer[record.remindAdvanceUnit]}`}</span>
        }
      },
    },
    {
      title: '计划开始时间',
      name: 'startTime',
      tableItem: {
        render: (text, record) => {
          return record.startTime && record.startTime.slice(0, 10)
        }
      },
    },
    {
      title: '计划结束时间',
      name: 'endTime',
      tableItem: {
        render: (text, record) => {
          return record.endTime && record.endTime.slice(0, 10)
        }
      },
    },
    {
      title: '计划状态',
      name: 'status',
      tableItem: {
        render: (text, record) => {
          return <span>{`${statusTransfer[record.status]}`}</span>
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
                  {record.status == 1 ? <Button tooltip='编辑' onClick={e => self.handleEdit(record)}>
                    <Icon type='edit' />
                  </Button> : null}
                  {record.status == 2 ? <Button tooltip='停止' onClick={e => { self.handleStop(record) }}>
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
      codeName: '已完成'
    },
    {
      code: 4,
      codeName: '已停止'
    },
  ]
  let { curingsPlan: { allUserList } } = self.props
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
      name: 'planName',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true
      }
    },
    {
      title: '责任人',
      name: 'personLiableId',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: allUserList,
        allowClear: true
      }
    },
    {
      title: '计划状态',
      name: 'status',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: statusList,
        allowClear: true

      }
    },

  ]
}
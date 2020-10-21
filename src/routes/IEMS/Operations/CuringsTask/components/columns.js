/*
 * @Descripttion : 养护任务的表头配置数据
 * @Author       : hezihua
 * @Date         : 2020-05-22 14:24:59
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 11:00:25
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'

export const createColumns = (self) => {
  let statusTransfer = {
    1: '未开始',
    2: '进行中',
    3: '已完成',
    4: '已停止',
    5: '已过期',
    
  }
  return [
    {
      title: '任务编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '计划名称',
      name: 'curingPlanName',
      tableItem: {
      }
    },
    {
      title: '计划编号',
      name: 'curingPlanCode',
      tableItem: {
      }
    },
    {
      title: '设备名称',
      name: 'equipmentName',
      tableItem: {
      }
    },
    {
      title: '责任人',
      name: 'personLiableName',
      tableItem: {}
    },
    
    
    {
      title: '任务开始日期',
      name: 'startTime',
      tableItem: {
        render: (text, record) => {
          return record.startTime && record.startTime.slice(0, 10)
        }
      },
    },
    {
      title: '任务结束日期',
      name: 'endTime',
      tableItem: {
        render: (text, record) => {
          return record.endTime && record.endTime.slice(0, 10)
        }
      },
    },
    {
      title: '任务状态',
      name: 'status',
      tableItem: {
        render: (text, record) => {
          return statusTransfer[record.status]
        }
      },
    },
    {
      title: '养护费用',
      name: 'curingMoney',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 200,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={(e) => self.handleDetail(record)}>
                  <Icon type="detail" />
                </Button>
                {record.status === 1 || record.status === 2 ? <Button tooltip="转派" onClick={(e) => self.handleDispatch(record)}>
                  <Icon ilng type="redispatch" className="icon-item"></Icon>
                </Button> : null}
                {record.status === 2 ? <Button tooltip="执行" onClick={(e) => self.handleOperate(record)}>
                  <Icon type="implement" />
                </Button> : null}
                {record.status === 1 || record.status === 2 ? <Button tooltip="停止" onClick={(e) => self.handleStop(record)}>
                  <Icon type="pause" />
                </Button> : null}
              </>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}


export const createFormColumns = (self) => {
  let { curingsTask: { taskStateList, allUserList } } = self.props
  return [
    {
      title: '任务编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true
      }
    },
    {
      title: '计划名称',
      name: 'curingPlanName',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear:true
      }
    },
    {
      title: '责任人',
      name: 'personLiableId',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear: true,
        dict: allUserList
      },
      searchItem: {}
    },
    {
      title: '任务状态',
      name: 'status',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear: true,
        dict: taskStateList
      },
      searchItem: {}
    },
    {
      title: '任务日期',
      name: 'queryTime',
      tableItem: {},
      formItem: {
        type: 'date',
        format: 'YYYY-MM-DD',
        allowClear: true
      }
    }
  ]
}

export const createLayoutColumns = (self) => {
  let { curingsTask: { organizationTree } } = self.props
  return [
    {
      title: '姓名',
      name: 'realName',
      tableItem: {},
    },
    {
      title: '部门',
      name: 'orgId',
      tableItem: {
        render: (text, record) => {
          let result = ''
          if (record.orgId) {
            result = Format.getNameById(organizationTree, record.orgId, 'value')
          }
          return result && result.title
        },
      },
    },
  ]
}
/*
 * @Descripttion : 巡检任务的表头配置数据
 * @Author       : caojiarong
 * @Date         : 2020-05-22 14:24:59
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 10:25:43
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'

export const createColumns = (self) => {
  let statusTransfer = {
    '0': '未开始',
    '1': '进行中',
    '2': '已完成',
    '3': '已过期',
    '4': '已停止',
  }
  return [
    {
      title: '任务编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '责任人',
      name: 'responseString',
      tableItem: {}
    },
    {
      title: '计划编号',
      name: 'planCode',
      tableItem: {
      }
    },
    {
      title: '计划名称',
      name: 'planName',
      tableItem: {
      }
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
      name: 'state',
      tableItem: {
        render: (text, record) => {
          return statusTransfer[record.state]
        }
      },
    },
    {
      title: '应检设备数',
      name: 'checkableNum',
      tableItem: {},
    },
    {
      title: '已检设备数',
      name: 'checkedNum',
      tableItem: {},
    },
    {
      title: '异常设备数',
      name: 'abnormalNum',
      tableItem: {},
    },
    {
      title: '已整改设备数',
      name: 'rectificationNum',
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
                {record.state === 1 || record.state === 0 ? <Button tooltip="转派" onClick={(e) => self.handleDispatch(record)}>
                  <Icon ilng type="redispatch" className="icon-item"></Icon>
                </Button> : null}
                {record.state === 1 ? <Button tooltip="执行" onClick={(e) => self.handleOperate(record)}>
                  <Icon type="implement" />
                </Button> : null}
                {record.state === 2 || record.state === 3 || record.state === 4 ? <Button tooltip="上报" onClick={(e) => self.handleSubmit(record)}>
                  <Icon type="reporting" />
                </Button> : null}
                {record.state === 1 || record.state === 0 ? <Button tooltip="停止" onClick={(e) => self.handleStop(record)}>
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
  let { patrolTask: { taskStateList, allUserList } } = self.props
  return [
    {
      title: '任务编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input'
      }
    },
    {
      title: '计划名称',
      name: 'planName',
      tableItem: {},
      formItem: {
        type: 'input'
      }
    },
    {
      title: '责任人',
      name: 'responser',
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
      name: 'state',
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
      name: 'taskTime',
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
  let { patrolTask: { organizationTree } } = self.props
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
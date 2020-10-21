import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import Radio from 'components/Radio'
import { EditableOper } from 'components/DataTable'

export const createCuringColumns = (self) => {
  let { curingsTaskDetail: { curingPageInfo } } = self.props
  return [
    {
      title: '养护项',
      name: `inspectionContents`,
      tableItem: {},
    },
    {
      title: '养护结果',
      name: 'inspectionResult',
      tableItem: {
        render: (text, record) => {
          return <EditableOper>
            {(form) => {
              return <>
              <Radio.Group value={record.inspectionResult}>
                <Radio value={1} key={Math.random()}>已完成</Radio>
                <Radio value={0} key={Math.random()}>未完成</Radio>
              </Radio.Group>
            </>
            }}
          </EditableOper>
        }
      },
    }
  ]
}

export const createBasicinfoColumns = (self) => {
  let { curingsTaskDetail: { curingPageInfo } } = self.props
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
      name: `personLiableName`,
      tableItem: {},
    },
    {
      title: '设备编号',
      name: 'equipmentCode',
      tableItem: {
      },
    },
    {
      title: '设备名称',
      name: 'equipmentName',
      tableItem: {},
    },
    {
      title: '计划编号',
      name: 'curingPlanCode',
      tableItem: {
      },
    },
    {
      title: '计划名称',
      name: 'curingPlanName',
      tableItem: {},
    },
    {
      title: '任务开始日期',
      name: `startTime`,
      render: (text, record)=> {
        return record.startTime && record.startTime.slice(0,10)
      }
    },
    {
      title: '任务结束日期',
      name: 'endTime',
      render: (text, record)=> {
        return record.endTime && record.endTime.slice(0,10)
      }
    },
    {
      title: '任务状态',
      name: 'status',
      render: (text, record)=> {
        return statusTransfer[record.status]
      }
    },
    {
      title: '任务执行日期',
      name: 'excuteTime',
      render: (text, record)=> {
        return record.excuteTime && record.excuteTime.slice(0,10)
      }
    },
  ]
}
export const createColumns = (self) => {
  let { curingsTaskDetail: { curingPageInfo } } = self.props
  return [
    {
      title: '耗材编号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '耗材名称',
      name: `name`,
      tableItem: {},
    },
    {
      title: '数量',
      name: 'num',
      tableItem: {
      },
    },
    {
      title: '单价',
      name: 'price',
      tableItem: {},
    },
    {
      title: '合计',
      name: `amountMoney`,
      tableItem: {},
    }
  ]
}


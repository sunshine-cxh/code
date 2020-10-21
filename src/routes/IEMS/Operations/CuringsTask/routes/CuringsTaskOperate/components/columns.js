import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import Radio from 'components/Radio'
import { EditableOper } from 'components/DataTable'

export const createCuringColumns = (self) => {
  let { curingsTaskOperate: { curingPageInfo } } = self.props
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
              <Radio.Group value={record.inspectionResult} onChange={(e)=> {self.onChange(e, record)}}>
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
  let { curingsTaskOperate: { curingPageInfo } } = self.props
  return [
    {
      title: '任务编号',
      name: 'code',
    },
    {
      title: '责任人',
      name: `responseString`,
    },
    {
      title: '设备编号',
      name: 'equipmentCode',
    },
    {
      title: '设备名称',
      name: 'equipmentName',
    },
    {
      title: '计划编号',
      name: 'curingPlanCode',
    },
    {
      title: '计划名称',
      name: 'curingPlanName',
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
    }
  ]
}
export const createComsumablesApp = (self) => {
  let { curingsTaskOperate: { curingPageInfo } } = self.props
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
      tableItem: {}
    }
  ]
}
export const createComsumablesColumns = (self)=> {
  return [
    {
      title: '领料单号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '标题',
      name: `title`,
      tableItem: {},
    },
    {
      title: '申请类型',
      name: 'type',
      tableItem: {
      },
    },
    {
      title: '关联单号',
      name: 'relateid',
      tableItem: {},
    },
    {
      title: '审批状态',
      name: `isCommitDesc`,
      tableItem: {}
    }
  ]
}

import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import Radio from 'components/Radio'
import { EditableOper } from 'components/DataTable'

export const createPatrolColumns = (self) => {
  let { patrolTaskOperate: { patrolLinePageInfo } } = self.props
  return [
    {
      title: '设备信息(应检/已检)',
      name: 'name',
      tableItem: {
        width:'300px'
      },
    },
    {
      title: '巡查项',
      name: `inspectionContents`,
      tableItem: {},
    },
    {
      title: '巡查结果',
      name: 'inspectionResult',
      tableItem: {
        render: (text, record) => {
          return <EditableOper>
            {(form) => {
              let result
              record.inspectionContents ? result =  <>
                <Radio.Group value={record.inspectionResult} onChange={(e)=> {self.onChange(e, record)}}>
                  <Radio value={1} key={Math.random()}>正常</Radio>
                  <Radio value={2} key={Math.random()}>异常</Radio>
                </Radio.Group>
              </> : result = null
              return result
            }}
          </EditableOper>
        }
      },
    }
  ]
}

export const createBasicinfoColumns = (self) => {
  let { patrolTaskOperate: { patrolLinePageInfo } } = self.props
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
      title: '计划编号',
      name: 'planCode',
    },
    {
      title: '计划名称',
      name: 'planName',
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
export const createColumns = (self) => {
  let { patrolTaskOperate: { patrolLinePageInfo } } = self.props
  return [
    {
      title: '维修单号',
      name: 'name',
      tableItem: {},
    },
    {
      title: '保障时间',
      name: `age`,
      tableItem: {},
    },
    {
      title: '故障类型',
      name: 'address',
      tableItem: {
      },
    },
    {
      title: '故障等级',
      name: 'name1',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: `age1`,
      tableItem: {},
    },
    {
      title: '报修人',
      name: 'address1',
      tableItem: {
      },
    },
    {
      title: '处理人',
      name: 'address2',
      tableItem: {
      },
    },
    {
      title: '状态',
      name: 'address3',
      tableItem: {
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={(e) => self.handleDetail(record)}>
                  <Icon type="detail" />
                </Button>
                {/* <Button tooltip="编辑" onClick={(e) => self.handleEdit(record)}>
                  <Icon type="edit" />
                </Button>
                <Button tooltip="删除" onClick={(e) => self.handleDelete(record)}>
                  <Icon type="delete" />
                </Button> */}
              </>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}
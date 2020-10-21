/*
 * @Descripttion : 养护标准列表参数
 * @Author       : hezihua
 * @Date         : 2020-06-02 10:50:20
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 15:57:29
 */
import React from 'react'
import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'
import Format from 'utils/format'

export const baseInfoColumns = (self) => {
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
  return [
    {
      title: '计划编号',
      name: 'code',
    },
    {
      title: '计划名称',
      name: 'planName',
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
      title: '养护标准',
      name: 'standardName',
    },
    {
      title: '养护周期',
      name: 'cycleValue',
      render: (text, record)=> {
        return `${record.cycle}${cycletransfer[record.cycleUnit]}`
      }
    },
    {
      title: '计划开始日期',
      name: 'startTime',
      render: (text, record)=> {
        return record.startTime && record.startTime.slice(0,10)
      }
    },
    {  //TODO ---分类名称才对
      title: '计划结束日期',
      name: 'endTime',
      render: (text, record)=> {
        return record.endTime && record.endTime.slice(0,10)
      }
    },
    {
      title: '负责人',
      name: 'personLiableName',
    },
    {
      title: '提前提醒时间',
      name: 'remindAdvance',
      render: (text, record) => {
        return (
          <>{record.remindAdvance}{warntransfer[record.remindAdvanceUnit]}</>
        )
      }
    },
    {
      title: '备注',
      name: 'curingExplain'
    }
  ]
}
// 责任人
export const createColumnsApp = (self) => {
  let { curingsPlanDetail: { organizationTree } } = self.props
  return [
    {
      title: '姓名',
      name: 'realName',
      tableItem: {
        width: 120
      }
    },
    {
      title: '性别',
      name: `gender`,
      tableItem: {
        width: 100,
        render: (text, record) => {
          if(record.gender == 1) {
            return '男'
          } else if( record.gender == 0) {
            return '女'
          }
        },
      }
    },
    {
      title: '所属部门',
      name: 'orgId',
      tableItem: {
        render: (text, record) => {
          let result = ''
          if (record.orgId) {
            result = Format.getNameById(organizationTree, record.orgId, 'value')
          }
          return result && result.title
        },
      }
    },
    {
      title: '联系电话',
      name: 'phone',
      tableItem: {
      }
    }
  ]
}


export const createColumnsTask = (self) => {
  const taskTransfer = {
    1: '未开始',
    2: '进行中',
    3: '已完成',
    4: '已停止',
    5: '已过期'
  }
  return [
    {
      title: '任务编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '设备名称',
      name: 'equipmentName',
      tableItem: {}
    },
    {
      title: '责任人',
      name: `personLiableName`,
      tableItem: {}
    },
    {
      title: '任务开始日期',
      name: 'startTime',
      tableItem: {}
    },
    {
      title: '任务结束日期',
      name: 'endTime',
      tableItem: {}
    },
    {
      title: '任务执行日期',
      name: 'excuteTime',
      tableItem: {}
    },
    {
      title: '任务状态',
      name: 'status',
      tableItem: {
        render: (text, record)=> {
          return taskTransfer[record.status]
        }
      }
    },
    {
      title: '操作',
      width: 65,
      align: 'center',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {form =>
              (<>
                <Button tooltip="删除" onClick={e => self.handleDetail(record)}>
                  <Icon type="detail" />
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
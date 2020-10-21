/*
 * @Descripttion : 巡检标准列表参数
 * @Author       : caojiarong
 * @Date         : 2020-06-02 10:50:20
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 15:30:10
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
    3: '月', 
    4: '年'
  }
  let cycletransfer = {
    1: '时',
    2: '天',
    3: '周', 
    4: '月'
  }
  return [
    {
      title: '计划编号',
      name: 'code',
    },
    {
      title: '计划名称',
      name: 'name',
    },
    {
      title: '开始执行时间',
      name: 'startTime',
      render: (text, record)=> {
        return record.startTime && record.startTime.slice(0,10)
      }
    },
    {  //TODO ---分类名称才对
      title: '结束执行时间',
      name: 'endTime',
      render: (text, record)=> {
        return record.endTime && record.endTime.slice(0,10)
      }
    },
    {
      title: '巡检周期',
      name: 'cycle',
      render: (text, record) => {
        return (
          <>{record.cycle}{cycletransfer[record.cycleUnit]}</>
        )
      }
    },
    {
      title: '提前提醒时间',
      name: 'noticeTime',
      render: (text, record) => {
        return (
          <>{record.noticeTime}{warntransfer[record.noticeUnit]}</>
        )
      }
    },
    {
      title: '备注',
      name: 'remark'
    }
  ]
}
// 责任人
export const createColumnsApp = (self) => {
  let { patrolPlanDetail: { organizationTree } } = self.props
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


// 巡检路线
export const createColumnsPatrolLine = (self) => {
  let { patrolPlanDetail: { allUserList, organizationTree } } = self.props
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '设备名称',
      name: `name`,
      tableItem: {}
    },
    {
      title: '设备所属',
      name: 'hhh',
      tableItem: {
        render: (text, record) => {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
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
      title: '负责人',
      name: 'managerId',
      tableItem: {
        render: (text, record) => {
          let name = ''
          allUserList.forEach(item => {
            if (item.code === record.managerId) {
              name = item.codeName
            }
          })
          return name
        }
      }
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {}
    },
    {
      title: '安装位置',
      name: 'installationSite',
      tableItem: {}
    },
    {
      title: '巡检标准',
      name: 'standardName',
      tableItem: {}
    }
  ]
}
export const createColumnsTask = (self) => {
  let stateTransfer = ['未开始','进行中', '已完成', '已过期', '已停止']
  return [
    {
      title: '任务编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '责任人',
      name: `responseString`,
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
      title: '任务状态',
      name: 'state',
      tableItem: {
        render: (text, record)=>{
          return stateTransfer[record.state]
        }
      }
    },
    {
      title: '应检设备数',
      name: 'checkableNum',
      tableItem: {}
    },
    {
      title: '已检设备数',
      name: 'checkedNum',
      tableItem: {}
    },
    {
      title: '异常设备数',
      name: 'abnormalNum',
      tableItem: {}
    },
    {
      title: '已整改设备数',
      name: 'rectificationNum',
      tableItem: {}
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
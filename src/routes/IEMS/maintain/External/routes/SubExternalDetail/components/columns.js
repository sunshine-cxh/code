/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:56:28
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-03 14:26:28
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'

function convertStandard(fileSize){
  if(fileSize < 1024 * 1024){
    let newStandard = (fileSize / 1024 ).toFixed(2)
    return newStandard + ' KB'
  }else if(fileSize > 1024 * 1024){
    let newStandard = (fileSize / ( 1024 * 1024 )).toFixed(2)
    return newStandard + ' MB'
  }
}
export const createOrderColumns = (self) => {
  return [
    {
      title: '维修单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '报修人',
      name: `reportUser`,
      tableItem: {},
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
    },
    {
      title: '保修时间',
      name: 'reportTime',
      tableItem: {},
    },
  ]
}

export const createFileColumns = (self) => {
  return [
    {
      title: '文件名称',
      name: 'fileName',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button
                tooltip="下载"
                type="text"
                style={{ color: 'rgba(52, 132, 254, 1)' }}
                onClick={() => {
                  self.handleDownload(record)
                }}
              >
                {record.fileName}
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
    {
      title: '文件大小',
      name: 'fileSize',
      tableItem: {
        render: (text, record)=> {
          return (
            <>
              <span>{convertStandard(record.fileSize)}</span>
            </>
          )
        }
      },
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {},
    },
  ]
}

export const baseInfoColumns = (self) => {
  return [
    {
      title: '申请单号',
      name: 'code',
    },
    {
      title: '申请人',
      name: 'creatorName',
    },
    {
      title: '设备编号',
      name: 'devicedCode',
    },
    {
      title: '设备名称',
      name: 'ledgerName',
    },
    {
      title: '外委单位',
      name: 'commissionDept',
    },
    {
      title: '申请日期',
      name: 'createdOn',
    },
    {
      title: '预计金额',
      name: 'estimateAmount',
    },
    {
      title: '工期要求',
      name: 'require',
    },
    {
      title: '外委理由',
      name: 'reason',
    },
  ]
}

export const baseInfoColumns1 = (self) => {
  return [
    {
      title: '验收日期',
      name: 'code',
    },
    {
      title: '总费用',
      name: 'repairFee',
    },
    {
      title: '维修内容',
      name: 'remark',
    }
  ]
}

export const createCheckColumns = (self) => {
  return [
    {
      title: '审批人',
      name: 'auditorName',
      tableItem: {},
    },
    {
      title: '审批时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      //TODO ---分类名称才对
      title: '审批意见',
      name: 'description',
      tableItem: {},
    },
    {
      //TODO ---分类名称才对
      title: '审批结果',
      name: 'resultAction',
      tableItem: {},
    },
  ]
}

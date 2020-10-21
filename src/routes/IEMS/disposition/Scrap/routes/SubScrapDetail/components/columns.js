/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:56:28
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-17 14:51:43
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'

function convertStandard(fileSize) {
  if (fileSize < 1024 * 1024) {
    let newStandard = (fileSize / 1024).toFixed(2)
    return newStandard + ' KB'
  } else if (fileSize > 1024 * 1024) {
    let newStandard = (fileSize / (1024 * 1024)).toFixed(2)
    return newStandard + ' MB'
  }
}

export const createMoveColumns = (self) => {
  let {
    scrapDetail: { allUserList },
  } = self.props
  return [
    {
      title: '设备编号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: `name`,
      tableItem: {},
    },
    {
      title: '设备所属',
      name: 'owner',
      tableItem: {},
    },
    {
      title: '购置日期',
      name: 'purchaseDate',
      tableItem: {},
    },
    {
      title: '购置金额',
      name: 'amountMoney',
      tableItem: {},
    },
    {
      title: '预计报废日期',
      name: 'scrapDate',
      tableItem: {
      },
    },
    {
      title: '报废原因',
      name: 'scrapReason',
      tableItem: {},
    },
  ]
}

export const baseInfoColumns = (self) => {
  let typeTransfer = {
    '0': '设备采购',
    '1': '备件耗材采购',
  }
  return [
    {
      title: '申请人',
      name: 'createdName',
    },
    {
      title: '申请日期',
      name: 'registerDate',
    },
    {
      title: '报废单号',
      name: 'code',
    },
    {
      title: '标题',
      name: 'title',
    },
    {
      title: '审批人',
      name: 'title',
    },
    {
      title: '备注',
      name: 'remark',
    },
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
        render: (text, record) => {
          return (
            <>
              <span>{convertStandard(record.fileSize)}</span>
            </>
          )
        },
      },
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {},
    },
  ]
}
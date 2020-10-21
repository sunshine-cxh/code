/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:56:28
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 14:42:27
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

export const baseInfoColumns = (self) => {
  const rangeTransfer = {
    1: '所有',
    2: '负责人负责设备',
    3: '指定设备'
  }
  return [
    {
      title: '盘点单号',
      name: 'code',
    },
    {
      title: '创建时间',
      name: 'createdOn',
    },
    {
      //TODO ---分类名称才对
      title: '盘点单号',
      name: 'code',
    },
    {
      title: '盘点范围',
      name: 'scopeType',
      render: (text, record) => {
        return rangeTransfer[record.scopeType]
      },
    },
    {
      title: '计划盘点时间',
      name: 'planTime',
      render: (text, record) => {
        return `${record.planTimeStart}-${record.planTimeEnd}`
      },
    },
    {
      title: '盘点时间',
      name: 'inventoryTime',
    },
    {
      title: '责任单位',
      name: 'organizationName',
    },
    {
      title: '责任人',
      name: 'operatorName',
    },
    {
      title: '备注',
      name: 'remark',
    },
  ]
}

export const createOperateColumns = (self) => {
  let typeTransfer = {
    '0': '设备采购',
    '1': '备件耗材采购',
  }
  return [
    {
      title: '设备编号',
      name: 'sn',
      tableItem: {},
      formItem: {
        disabled: true,
      },
    },
    {
      title: '设备名称',
      name: 'name',
      tableItem: {},
      formItem: {
        disabled: true,
      },
    },
    {
      //TODO ---分类名称才对
      title: '设备所属',
      name: 'foreignName',
      tableItem: {},
      formItem: {
        disabled: true,
      },
    },
    {
      title: '规格型号',
      name: 'planTime',
      tableItem: {
        disabled: true,
      },
    },
    {
      title: '所属部门',
      name: 'organizationName',
      tableItem: {},
      formItem: {
        disabled: true,
      },
    },
    {
      title: '负责人',
      name: 'operatorName',
      tableItem: {},
      formItem: {
        disabled: true,
      },
    },
    {
      title: '安装位置',
      name: 'installationSite',
      tableItem: {},
      formItem: {
        disabled: true,
      },
    },
    {
      title: '盘存位置',
      name: 'inventoryLocation',
      tableItem: {},
      formItem: {},
    },
    {
      title: '盘存状态',
      name: 'detailStateDesc',
      tableItem: {},
      formItem: {
        disabled: true,
      },
    },
    {
      title: '说明',
      name: 'detailRemark',
      tableItem: {},
      formItem: {
        type: 'textarea',
        disabled: true,
      },
    },
    {
      title: '操作',
      name: 'operate',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                {(record.detailStateDesc === '已盘点' && record.inventoryLocation) ? (
                  <Button tooltip="编辑" onClick={(e) => self.handleEdit(record)}>
                    <Icon type="reload" />
                  </Button>
                ) : null}
              </>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}

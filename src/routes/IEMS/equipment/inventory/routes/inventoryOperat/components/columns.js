/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 18:01:14
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 14:39:08
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'


export const createInventoryColumns = (self) => {
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
        disabled: true
      }
    },
    {
      title: '设备名称',
      name: 'name',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      //TODO ---分类名称才对
      title: '设备所属',
      name: 'foreignName',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {
        disabled: true
      },
    },
    {
      title: '所属部门',
      name: 'organizationName',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '负责人',
      name: 'operatorName',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '安装位置',
      name: 'installationSite',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '盘存位置',
      name: 'inventoryLocation',
      tableItem: {},
      formItem: {}
    },
    {
      title: '盘存状态',
      name: 'detailStateDesc',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '说明',
      name: 'detailRemark',
      tableItem: {},
      formItem: {
        type: 'textarea',
      }
    },
    {
      title: '操作',
      name: 'operate',
      tableItem: {
        render: (text, record) =>(
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="编辑" onClick={(e) => self.handleEdit(record)}>
                  <Icon type="edit" />
                </Button>
              </>
            )}
          </EditableOper>
        )
      },
    },
  ]
}

export const baseInfoColumns = (self) => {
  const rangeTransfer = {
    1: '所有',
    2: '负责人负责设备',
    3: '指定设备'
  }
  return [
    {
      title: '创建人',
      name: 'createdName',
    },
    {
      title: '创建日期',
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
      //TODO ---分类名称才对
      title: '计划盘点时间',
      name: 'planTimeStart',
      render: (text, record) => {
        return `${record.planTimeStart}-${record.planTimeEnd}`
      },
    },
    {
      title: '责任单位',
      name: 'organizationName',
    },
    {
      //TODO ---分类名称才对
      title: '责任人',
      name: 'operatorName',
    },
    {
      title: '备注',
      name: 'remark',
    },
  ]
}

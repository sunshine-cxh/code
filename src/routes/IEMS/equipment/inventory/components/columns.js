/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 09:06:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 09:49:57
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'
import $$ from 'cmn-utils'
export const createColumns = (self) => {
  let rangeTransfer = {
    1: '所有',
    2: '负责人',
    3: '指定设备',
  }
  let statusTransfer = {
    1: '待执行',
    2: '执行中',
    3: '已盘点',
    4: '已过期',
  }
  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '盘点编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '创建人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '创建日期',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '盘点日期',
      name: 'inventoryTime',
      tableItem: {},
    },
    {
      title: '盘点范围',
      name: 'scopeType',
      tableItem: {
        render: (text, record) => {
          return rangeTransfer[record.scopeType]
        },
      },
    },
    {
      title: '计划盘点时间',
      name: 'planTime',
      tableItem: {
        render: (text, record) => {
          return `${record.planTimeStart}-${record.planTimeEnd}`
        },
      },
    },
    {
      title: '责任人',
      name: 'operatorName',
      tableItem: {},
    },
    {
      title: '状态',
      name: 'state',
      tableItem: {
        render: (text, record) => {
          return statusTransfer[record.state]
        },
      },
    },
    {
      title: '应盘/已盘',
      name: 'inventoryNum',
      tableItem: {
        render: (text, record) => {
          return `${record.inventoryNum}/${record.aInventoryNum}`
        },
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => {
          let userAccount = $$.getStore('user').userAccount
          return (
            <EditableOper>
              {(form) => (
                <>
                  <Button tooltip="详情" onClick={(e) => self.handleDetail(record)}>
                    <Icon type="detail" />
                  </Button>

                  {(record.state === 1 || record.state === 2) &&
                  (record.operatorName === userAccount || record.createdName === userAccount) ? (
                    <Button tooltip="重新分派" onClick={(e) => self.handleDispatch(record)}>
                      <Icon ilng type="redispatch" className="icon-item"></Icon>
                    </Button>
                  ) : null}
                  {(record.state === 1 || record.state === 2) &&
                  record.operatorName === userAccount ? (
                    <Button tooltip="盘点" onClick={(e) => self.handleInventory(record)}>
                      <Icon type="inventory" />
                    </Button>
                  ) : null}
                </>
              )}
            </EditableOper>
          )
        },
      },
    },
  ]
}

export const createFormColumns = (self) => {
  let { allUserList } = self.props.inventory
  const inventoryRange = [
    {
      codeName: '所有',
      code: 1,
    },
    {
      codeName: '负责人负责设备',
      code: 2,
    },
    {
      codeName: '指定设备',
      code: 3,
    },
  ]
  const statusList = [
    {
      codeName: '待执行',
      code: 1,
    },
    {
      codeName: '执行中',
      code: 2,
    },
    {
      codeName: '已盘点',
      code: 3,
    },
    {
      codeName: '已过期',
      code: 4,
    },
  ]
  return [
    {
      title: '盘点单号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '责任人',
      name: 'operatorId',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: allUserList,
        allowClear: true,
      },
    },
    {
      title: '状态',
      name: 'state',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: statusList,
        allowClear: true,
        showSearch: true,
      },
    },
    {
      title: '盘点范围',
      name: 'scopeType',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: inventoryRange,
        allowClear: true,
      },
    },

    {
      title: '盘点日期',
      name: 'planTime',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
        allowClear: true,
      },
    },
  ]
}

export const createLayoutColumns = (self) => {
  let {
    inventory: { organizationTree },
  } = self.props
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

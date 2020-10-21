/*
 * @Descripttion : columns data
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 15:35:15
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-11 18:17:43
 */

import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  let { codeRuleEntity, functionAuthority } = expand
  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '当前编码',
      name: 'currentNumber',
      tableItem: {},
    },
    {
      title: '规则名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '对应模块',
      name: 'enCode',
      dict: codeRuleEntity,
      tableItem: {},
      formItem: {
        type: 'select',
      },
    },
    {
      title: '当前流水号',
      name: 'seedValue',
      tableItem: {},
    },
    {
      title: '创建人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '创建时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '备注',
      name: 'remark',
      tableItem: {},
    },
    {
      title: '操作',
      tableItem: {
        width: 120,
        align: 'center',
        render: (text, record) => (
          <DataTable.Oper>
            <Button display={functionAuthority.indexOf('btnCopy') > -1} tooltip="复制" onClick={(e) => self.handleCopy(record)}>
              <Icon type="copy" />
            </Button>
            <Button display={functionAuthority.indexOf('btnUpdate') > -1} tooltip="修改" onClick={(e) => self.handleEdit(record)}>
              <Icon type="edit" />
            </Button>
            <Button display={functionAuthority.indexOf('btnDelete') > -1} tooltip="删除" onClick={(e) => self.onDelete(record)}>
              <Icon type="delete" />
            </Button>
          </DataTable.Oper>
        ),
      },
    },
  ]
}

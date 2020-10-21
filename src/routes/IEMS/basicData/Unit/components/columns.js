/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-08 14:15:54
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-06 11:41:08
 */
import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  const { functionAuthority } = expand

  return [
    {
      title: 'ID',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '单位编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'disabled',
        initialValue: '系统自动生成',
      },
    },
    {
      title: '单位名称',
      name: 'name',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入单位名称',
          },
        ],
      },
    },
    {
      title: '排序',
      name: 'sortId',
      tableItem: {},
      formItem: {
        type: 'number',
      },
    },
    {
      title: '备注',
      name: 'remark',
      tableItem: {},
      formItem: {
        type: 'textarea',
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <DataTable.Oper>
            <Button
              display={functionAuthority.indexOf('btnUpdate') > -1}
              tooltip="修改"
              onClick={(e) => self.onUpdate(record)}
            >
              <Icon type="edit" />
            </Button>
            <Button
              display={functionAuthority.indexOf('btnDelete') > -1}
              tooltip="删除"
              onClick={(e) => self.onDelete(record)}
            >
              <Icon type="delete" />
            </Button>
          </DataTable.Oper>
        ),
      },
    },
  ]
}

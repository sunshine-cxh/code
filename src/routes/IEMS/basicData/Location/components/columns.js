/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-08 14:15:54
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-06 11:39:34
 */
import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'

export default (self, expand) => {
  let { locationType, record, functionAuthority } = expand
  locationType = Format.selectTreeFormat(locationType, 'id', 'title')
  locationType = [
    {
      value: '0',
      title: '无',
    },
  ].concat(locationType)
  let locationDict = Format.selectDictFormat(locationType, true)
  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '地点编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'disabled',
        initialValue: '系统自动生成'
      },
    },
    {
      title: '上级地点',
      name: 'parentId',
      dict: locationDict,
      formItem: {
        type: 'treeSelect',
        initialValue: locationType.length ? locationType[0].value : '',
        treeData: locationType,
      },
    },
    {
      title: '地点名称',
      name: 'name',
      tableItem: {
        width: 300,
        align: 'left',
        className: 'table-tree-cell',
      },
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入地点名称',
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

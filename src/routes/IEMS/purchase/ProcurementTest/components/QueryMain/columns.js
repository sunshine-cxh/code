/*
 * @Descripttion : columns data
 * @Author       : 贺子华
 * @Date         : 2020-04-16 14:09:14
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-19 12:00:15
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  let checkType = {
    '10': '到货验收',
    '20': '开箱验收',
    '30': '试运行验收',
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
      title: '编号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '标题',
      name: 'title',
      tableItem: {},
    },
    {
      title: '创建人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '验收类别',
      name: 'acceptType',
      tableItem: {
        render: (text, record) => <>{checkType[record.acceptType]}</>,
      },
    },
    {
      title: '验收人',
      name: 'acceptUserID',
      tableItem: {},
    },
    {
      title: '验收时间',
      name: 'acceptEndDate',
      tableItem: {},
    },
    // {
    //   title: '验收状态',
    //   name: 'acceptStatus',
    //   tableItem: {},
    // },
    {
      title: '备注',
      name: 'remark',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button
                  tooltip="详情"
                  onClick={(e) => self.handleDetails(record)}
                >
                  <Icon type="detail" />
                </Button>
                <Button
                  tooltip="删除"
                  onClick={(e) => self.handleDelete(record)}
                >
                  <Icon type="delete" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}

export const createFormColumns = (self) => {
  return [
    {
      title: '编号',
      name: 'sn',
      tableItem: {},
      searchItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '标题',
      name: 'title',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
      searchItem: {},
    },
    {
      title: '验收时间',
      name: 'ApprovalTime',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
        allowClear: true,
      },
    },
  ]
}

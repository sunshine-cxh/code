/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-01 15:15:07
 */
import React from 'react'
import { Tag } from 'antd'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '留言内容',
      name: 'message',
      tableItem: {},
    },
    {
      title: '留言时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '电话',
      name: 'phone',
      tableItem: {},
    },
    {
      title: '姓名',
      name: 'name',
      tableItem: {},
    },
    {
      title: '备注',
      name: 'remark',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
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
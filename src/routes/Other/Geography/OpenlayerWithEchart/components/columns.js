/*
 * @Author       : xuqiufeng
 * @Date         : 2020-07-01 16:44:21
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-07 18:09:52
 * @FilePath     : \ilng.iomp.web\src\routes\IGIS\Home\components\columns.js
 */ 

import React from 'react'
import { Tag } from 'antd'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, contentTypes) => {
  let approvalTypes = {
    '0': '未发布 ',
    '1': '已发布',
  }
  let Types = {
    '0': '否',
    '1': '是',
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
      title: '对象标识',
      name: 'title',
      tableItem: {},
    },
    {
      title: 'M值',
      name: 'publishDate',
      tableItem: {},
    },
    {
      title: '开始日期',
      name: 'contentType',
      dict: contentTypes,
      tableItem: {},
      formItem: {
        type: 'select',
        initialValue: '',
      },
    },
    {
      title: '结束日期',
      name: 'isPublic',
      tableItem: {
        render: (text, record) => (
          <Tag color={record.isPublic == 1 ? 'green' : 'blue'}>
            {Types[record.isPublic]}{' '}
          </Tag>
        ),
      },
    },
    {
      title: '路由',
      name: 'isDisplay',
      tableItem: {
        render: (text, record) => (
          <Tag color={record.isDisplay == 1 ? 'green' : 'blue'}>
            {Types[record.isDisplay]}{' '}
          </Tag>
        ),
      },
    },
    {
      title: '网络标识',
      name: 'isApproval',
      tableItem: {
        render: (text, record) => (
          <Tag color={record.isApproval == 1 ? 'green' : 'blue'}>
            {approvalTypes[record.isApproval]}{' '}
          </Tag>
        ),
      },
    },
    {
      title: '创建者',
      name: 'aa',
      tableItem: {},
    },
    {
      title: '创建日期',
      name: 'bb',
      tableItem: {},
    },
    {
      title: '更新者',
      name: 'cc',
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
                  tooltip="修改"
                  onClick={(e) => self.handleUpdate(record)}
                >
                  <Icon type="edit" />
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

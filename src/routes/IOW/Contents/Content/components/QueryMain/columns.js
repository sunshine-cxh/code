/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-09 09:20:28
 */
import React from 'react'
import { Tag } from 'antd'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, contentTypes) => {
  let approvalTypes = {
    '0': '未发布',
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
      title: '标题',
      name: 'title',
      tableItem: {},
    },
    {
      title: '发表时间',
      name: 'publishDate',
      tableItem: {},
    },
    {
      title: '内容类型',
      name: 'contentType',
      dict: contentTypes,
      tableItem: {},
      formItem: {
        type: 'select',
        initialValue: contentTypes.length > 0 ? contentTypes[0].code : '',
      },
    },
    {
      title: '是否公开',
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
      title: '是否在首页显示',
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
      title: '状态',
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

export const createFormColumns = (self, contentType) => {
  let isApproval = [
    {
      codeName: '未发布',
      code: 0,
    },
    {
      codeName: '已发布',
      code: 1,
    },
  ]
  let isDisplay = [
    {
      codeName: '否',
      code: 0,
    },
    {
      codeName: '是',
      code: 1,
    },
  ]
  let isPublic = [
    {
      codeName: '否',
      code: 0,
    },
    {
      codeName: '是',
      code: 1,
    },
  ]
  return [
    {
      title: '内容类型',
      name: 'contentType',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: contentType,
        allowClear: true
      },
    },
    {
      title: '标题',
      name: 'title',
      tableItem: {},
      formItem: {
        type: 'input',
      },
      searchItem: {},
    },
    {
      title: '公开',
      name: 'isPublic',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: isPublic,
        allowClear: true
      },
      searchItem: {},
    },
    {
      title: '首页显示',
      name: 'isDisplay',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: isDisplay,
        allowClear: true
      },
      searchItem: {},
    },
    {
      title: '状态',
      name: 'isApproval',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: isApproval,
        allowClear: true
      },
      searchItem: {},
    },
    {
      title: '发布时间',
      name: 'createTime',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
      },
    },
  ]
}

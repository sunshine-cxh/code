/*
 * @Descripttion : columns data
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 16:44:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-07 16:06:52
 */

import React from 'react'
import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'
import app from '@/index.js'

const TYPE = [
  { code: 0, codeName: '自定义' },
  { code: 1, codeName: '日期' },
  { code: 2, codeName: '流水号' },
]

export const createColumns = (self, expand) => {
  let { ruleDetailTypeValue } = expand

  return [
    {
      title: '类型',
      name: `itemType`,
      dict: TYPE,
      formItem: {
        type: 'select',
        initialValue: ruleDetailTypeValue,
        onChange: (form, value, record) => {
          app.dispatch({
            type: 'codeRuleAdd/@change',
            payload: {
              ruleDetailTypeValue: value,
            },
          })
        },
      },
      tableItem: {},
    },
    {
      title: '名称',
      name: 'itemTypeName',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入名称',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '规则',
      name: `formatStr`,
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入规则',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '初始值',
      name: `initValue`,
      formItem: {
        type: ruleDetailTypeValue === 2 ? 'input' : 'disabled',
        initialValue: 1,
      },
      tableItem: {},
    },
    {
      title: '步长',
      name: `stepValue`,
      formItem: {
        type: ruleDetailTypeValue === 2 ? 'input' : 'disabled',
        initialValue: 1,
      },
      tableItem: {},
    },

    {
      title: '排序',
      name: 'sortId',
      formItem: {
        type: 'number',
        rules: [
          {
            required: true,
            message: '请输入排序',
          },
        ],
      },
      tableItem: {},
    },

    {
      title: '备注',
      name: 'description',
      formItem: {},
      tableItem: {},
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <div>
                <Button tooltip="修改" onClick={(e) => self.handleEdit(record)}>
                  <Icon type="edit" />
                </Button>
                <Button tooltip="删除" onClick={(e) => self.handleDelete(record)}>
                  <Icon type="delete" />
                </Button>
              </div>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}

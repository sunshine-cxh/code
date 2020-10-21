/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-29 08:57:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-16 10:34:31
 */ 
import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'

export const createColumns1 = (self, expand) => {

  return [
    {
      title: '用户id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '标题',
      name: 'processName',
      tableItem: {},
    },
    {
      title: '审批类型',
      name: 'processTypeDesc',
      tableItem: {},
    },
    {
      title: '提交人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '提交时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '当时节点',
      name: 'userNodeName',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
              <Button tooltip="查看审批进度" type='text' style={{color: 'rgba(52, 132, 254, 1)'}} onClick={
                ()=> {
                  self.handleCheck(record)
                }
              }>{record.userNodeName}</Button>
              )
            }
          </EditableOper>
        )
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 120,
        align: 'center',
        render: (text, record) => (
          <DataTable.Oper>
            <Button
              tooltip="审批"
              onClick={(e) => self.handleApproval(record)}
            >
              <Icon type="approval" />
            </Button>
          </DataTable.Oper>
        ),
      },
    },
  ]
}

export const columns2 = [
  {
    title: '用户账户',
    name: 'account',
    formItem: {
      type: 'disabled',
    },
  },
  {
    title: '用户名称',
    name: 'realName',
    formItem: {
      type: 'disabled',
    },
  },
  {
    title: '密码',
    name: 'password',
    formItem: {
      type: 'password',
      repeat: true,
    },
  },
  //hidden
  {
    title: '用户id',
    name: 'id',
    formItem: {
      type: 'hidden',
    },
  },
]

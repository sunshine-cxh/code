/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-27 18:52:37
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-05 15:26:46
 */

import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createFormColumns = (self) => {
  let {
    gasstation: { addressList },
  } = self.props
  return [
    {
      title: '气化站编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '气化站名称',
      name: 'name',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '气化站型号',
      name: 'gasModel',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '所属区域',
      name: 'districtId',
      tableItem: {},
      formItem: {
        type: 'cascade',
        allowClear: true,
        options: addressList,
        fieldNames: {label: 'title'},
        changeOnSelect: true
      },
    },
  ]
}

export const createColumns = (self) => {
  return [
    {
      title: 'ID',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '气化站编号',
      name: 'code',
      tableItem: {},
      searchItem: {},
    },
    {
      title: '气化站名称',
      name: 'name',
      tableItem: {},
      searchItem: {},
    },
    {
      title: '所属区域',
      name: 'districtName',
      tableItem: {},
    },
    {
      title: '储罐容积(m3)',
      name: 'tankVolume',
      tableItem: {},
    },
    {
      title: '气化器型号(台/m3/h)',
      name: 'gasModel',
      tableItem: {},
      searchItem: {},
    },
    {
      title: '气化站运行压力(Mpa)',
      name: 'operatingPressure',
      tableItem: {},
      searchItem: {},
    },
    {
      title: '气化站总输出压力(Mpa)',
      name: 'outputPressure',
      tableItem: {},
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <DataTable.Oper>
            <Button tooltip="修改" onClick={(e) => self.handleUpdate(record)}>
              <Icon type="edit" />
            </Button>
            <Button tooltip="删除" onClick={(e) => self.handleDelete(record)}>
              <Icon type="delete" />
            </Button>
          </DataTable.Oper>
        ),
      },
    },
  ]
}

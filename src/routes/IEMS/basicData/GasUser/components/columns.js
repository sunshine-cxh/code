/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-27 18:52:37
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 17:12:07
 */

import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createFormColumns = (self) => {
  let {
    gasuser: { addressList, gasUserTypeList, gasStationList },
  } = self.props
  return [
    {
      title: '用气用户编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '用气用户名称',
      name: 'name',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '用气用户类型',
      name: 'type',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear: true,
        dict: gasUserTypeList,
      },
    },
    {
      title: '供气气化站',
      name: 'gasStationId',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: gasStationList,
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
        fieldNames: { label: 'title' },
        changeOnSelect: true,
      },
    },
  ]
}

export const createColumns = (self) => {
  let {
    gasuser: { gasStationList, gasUserTypeList },
  } = self.props
  return [
    {
      title: 'ID',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '用气用户编号',
      name: 'code',
      tableItem: {},
      searchItem: {},
    },
    {
      title: '用气用户名称',
      name: 'name',
      tableItem: {},
      searchItem: {},
    },
    {
      title: '用气用户类型',
      name: 'type',
      tableItem: {
        render: (text, record) => {
          let result
          gasUserTypeList.map((item) => {
            if (record.type === Number(item.code)) {
              result = item.codeName
            }
          })
          return result
        }
      },
      searchItem: {
        
      },
    },
    {
      title: '所属区域',
      name: 'districtName',
      tableItem: {},
    },
    {
      title: '供气气化站',
      name: 'gasStationList',
      tableItem: {
        render: (text, record) => {
          let arr = []
          if(!record.gasStationList) return
          gasStationList.map((item) => {
            if (record.gasStationList.includes(item.code)) {
              arr.push(item.codeName)
            }
          })
          return arr.join(',')
        },
      },
    },
    {
      title: '联系人',
      name: 'linkman',
      tableItem: {},
      searchItem: {},
    },
    {
      title: '联系电话',
      name: 'phone',
      tableItem: {},
      searchItem: {},
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

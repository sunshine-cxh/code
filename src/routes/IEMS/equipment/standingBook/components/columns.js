/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 14:24:59
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 15:21:34
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '设备编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '设备类别',
      name: 'cateName',
      tableItem: {},
    },
    {
      title: '所属区域',
      name: 'gasStationAddr',
      tableItem: {},
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {},
    },
    {
      title: '供应商',
      name: 'supplierDesc',
      tableItem: {},
    },
    {
      title: '设备所属',
      name: 'brandName',
      tableItem: {
        render: (text, record)=> {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '状态',
      name: 'statusDesc',
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
                <Button tooltip="详情" onClick={(e) => self.handleDetail(record)}>
                  <Icon type="detail" />
                </Button>
                <Button tooltip="编辑" onClick={(e) => self.handleEdit(record)}>
                  <Icon type="edit" />
                </Button>
                <Button tooltip="删除" onClick={(e) => self.handleDelete(record)}>
                  <Icon type="delete" />
                </Button>
                {/* <Button tooltip="查看二维码" onClick={e => self.handleDetails(record)}>
                    <Icon type="edit" />
                  </Button> */}
              </>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}

export const createFormColumns = (self) => {
  const { treeData, addressList } = self.props.standingBook
  const belongType = [
    {
      code: 1,
      codeName: '气化站',
    },
    {
      code: 2,
      codeName: '用气用户',
    },
  ]
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {},
      searchItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '设备名称',
      name: 'name',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
      searchItem: {},
    },
    {
      title: '设备类别',
      name: 'cateId',
      tableItem: {},
      formItem: {
        type: 'treeselect',
        treeData: treeData,
        allowClear: true,
      },
      searchItem: {},
    },
    {
      title: '所属区域',
      name: 'gasStationDistrictId',
      tableItem: {},
      formItem: {
        type: 'cascade',
        allowClear: true,
        options: addressList,
        fieldNames: {label: 'title'},
        changeOnSelect: true
      },
      searchItem: {},
    },

    {
      title: '设备所属',
      name: 'foreignType',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear: true,
        dict: belongType
      },
      searchItem: {},
    },
  ]
}

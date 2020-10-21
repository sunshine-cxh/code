/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 11:36:12
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
      title: '领用单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '标题',
      name: 'title',
      tableItem: {
      },
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {
      },
    },
    {
      title: '领用日期',
      name: 'leadtime',
      tableItem: {
      },
    },
    {
      title: '涉及设备',
      name: 'name',
      tableItem: {
        render: (text, record) => {
          let arr = []
          if(record.equipmentDataList) {
            record.equipmentDataList.forEach(item=> {
              arr.push(item.name)
            })
          }
          
          return arr.join(',')
        },
      },
    },
    {
      title: '领用部门',
      name: 'depart',
      tableItem: {
      },
    },
    {
      title: '领用人',
      name: 'user',
      tableItem: {},
    },
    {
      title: '归还/领用',
      name: 'collar',
      tableItem: {
        render: (text, record) => {
          return `${record.receiveNum}/${record.remandNum}`
        }
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={(e) => self.handleDetails(record)}>
                  <Icon type="detail" />
                </Button>
                <Button tooltip="归还" onClick={(e) => self.handleReturn(record)}>
                  <Icon type="lingyongguihuan" />
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
      title: '领用单号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '领用人',
      name: 'user',
      tableItem: {},
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
        allowClear: true,
      },
    },
    {
      title: '领用时间',
      name: 'leadtime',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
        allowClear: true,
      },
    },
  ]
}

import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'

export const createColumnsApp = (self) => {
  return [
    {
      title: '养护项',
      name: 'name',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入养护项',
          },
        ],
      },
      tableItem: {}
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
                (<>
                  <Button tooltip="编辑" onClick={e => {self.handleEdit(record)}}>
                    <Icon type="edit" />
                  </Button>
                  <Button tooltip="删除" onClick={e => self.handleDelete(record, 'detail')}>
                    <Icon type="delete" />
                  </Button>
                </>
              )
            }
          </EditableOper>
        )
      }
    }
  ]
}

export const createColumnsDevice = (self) => {
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '设备名称',
      name: `name`,
      tableItem: {}
    },
    { 
      title: '设备所属',  
      name: 'brandId',
      tableItem: {
        render: (text, record)=> {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {}
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
                (<>
                  <Button tooltip="删除" onClick={e => self.handleDelete(record, 'detail')}>
                    <Icon type="delete" />
                  </Button>
                </>
              )
            }
          </EditableOper>
        )
      }
    }
  ]
}

export const createColumnsProduct = (self) => {
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {
        
      }
    },
    {
      title: '设备名称',
      name: `name`,
      tableItem: {
        
      }
    },
    {
      title: '设备所属',
      name: 'unitDesc',
      tableItem: {
        render: (text, record)=> {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '规格型号',
      name: `modelCn`,
      tableItem: {
        
      }
    }
  ]
}


/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:30:12
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 16:00:32
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

function convertStandard(fileSize) {
  if (fileSize < 1024 * 1024) {
    let newStandard = (fileSize / 1024).toFixed(2)
    return newStandard + ' KB'
  } else if (fileSize > 1024 * 1024) {
    let newStandard = (fileSize / (1024 * 1024)).toFixed(2)
    return newStandard + ' MB'
  }
}
export const createColumnsFile = (self) => {
  return [
    {
      title: '文件名称',
      name: 'fileName',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button
                tooltip="下载"
                type="text"
                style={{ color: 'rgba(52, 132, 254, 1)' }}
                onClick={() => {
                  self.handleDownload(record)
                }}
              >
                {record.fileName}
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
    // {
    //   title: '文件类型',
    //   name: 'type',
    //   tableItem: {}
    // },
    {
      title: '文件大小',
      name: 'fileSize',
      tableItem: {
        render: (text, record) => {
          return (
            <>
              <span>{convertStandard(record.fileSize)}</span>
            </>
          )
        },
      },
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'operate',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button tooltip="删除" onClick={(e) => self.handleFileDelete(record)}>
                <Icon type="delete" />
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}

export const createChildColumns = (self) => {
  return [
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
      title: '设备所属',
      name: 'owner',
      tableItem: {
        render: (text, record)=> {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'operate',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button tooltip="删除" onClick={(e) => self.handleDelete(record)}>
                <Icon type="delete" />
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}

export const createConnectColumns = (self) => {
  let { record } = self.state
  return [
    {
      title: '耗材编号',
      name: 'code',
      tableItem: {},
      formItem: {
        disabled: true
      },
    },
    {
      title: '耗材名称',
      name: 'name',
      tableItem: {},
      formItem: {
        disabled: true
      },
    },
    {
      title: '类别',
      name: 'categoryDesc',
      tableItem: {},
      formItem: {
        disabled: true
      },
    },
    {
      title: '品牌',
      name: 'brandDesc',
      tableItem: {},
      formItem: {
        type: 'select',
        disabled: true
      },
    },

    {
      title: '计量单位',
      name: 'unitDesc',
      tableItem: {},
      formItem: {
        type: 'select',
        disabled: true
      },
    },
    {
      title: '库存',
      name: 'totalAmount',
      tableItem: {},
      formItem: {
        disabled: true
      },
    },
    {
      title: '需求量',
      name: 'needNum',
      tableItem: {},
      formItem: {
        type: 'number',
        max: record.totalAmount
      },
    },
    {
      title: '操作',
      name: 'operate',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="编辑" onClick={(e) => self.handleEdit(record)}>
                  <Icon type="edit" />
                </Button>
                <Button tooltip="删除" onClick={(e) => self.handleDelete(record)}>
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

export const createChildAddColumns = (self) => {
  return [
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
      title: '设备所属',
      name: 'brandName',
      tableItem: {
        render: (text, record)=> {
          return `${record.foreignTypeDesc}/${record.foreignName}`
        }
      },
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {},
    },
  ]
}
export const createConnectAddColumns = (self) => {
  return [
    {
      title: '产品编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '产品名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '单位',
      name: 'unitDesc',
      tableItem: {},
    },
    {
      title: '分类',
      name: 'categoryDesc',
      tableItem: {},
    },
  ]
}

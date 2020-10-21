/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 16:39:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:13:25
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


export const createMoveColumns = (self) => {
  let { scrapAdd: { allUserList }} = self.props
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '设备名称',
      name: 'name',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '设备所属',
      name: 'owner',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '购置日期',
      name: 'purchaseDate',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '购置金额',
      name: 'amountMoney',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '预计报废日期',
      name: 'scrapDate',
      tableItem: {},
      formItem: {
        disabled: true
      }
    },
    {
      title: '报废原因',
      name: 'scrapReason',
      tableItem: {},
      formItem: {
        type: 'textarea'
      }
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

export const createscrapAddColumns = (self) => {
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
    {
      title: '设备状态',
      name: 'statusDesc',
      tableItem: {},
    },
    {
      title: '所属部门',
      name: 'orgName',
      tableItem: {},
    },
    
  ]
}

export const createColumnsApproval = (self) => {
  return [
    {
      title: '姓名',
      name: 'realName',
      tableItem: {},
    },
    {
      title: '账号',
      name: 'account',
      tableItem: {},
    },
    {
      title: '邮箱',
      name: `email`,
      tableItem: {},
    },
    {
      title: '职位',
      name: 'birthday',
      tableItem: {},
    },
  ]
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
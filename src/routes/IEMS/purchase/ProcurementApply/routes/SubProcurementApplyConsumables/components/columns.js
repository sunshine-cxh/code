/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 15:45:04
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'

function convertStandard(fileSize) {
  if (fileSize < 1024 * 1024) {
    let newStandard = (fileSize / 1024).toFixed(2)
    return newStandard + ' KB'
  } else if (fileSize > 1024 * 1024) {
    let newStandard = (fileSize / (1024 * 1024)).toFixed(2)
    return newStandard + ' MB'
  }
}
export const createColumnsApp = (self) => {
  let {
    procurementApplyConsumables: { unitList, supplyList },
  } = self.props
  return [
    {
      title: '产品编号',
      name: 'code',
      formItem: {},
      tableItem: {},
    },
    {
      title: '产品名称',
      name: `name`,
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入产品名称',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '单位',
      name: 'unitId',
      formItem: {
        type: 'select',
        dict: unitList,
        rules: [
          {
            required: true,
            message: '请输入单位',
          },
        ],
      },
      tableItem: {
        render: (text, record) => {
          let result = ''
          unitList.forEach((item) => {
            if (item.code === record.unitId) {
              result = item.codeName
            }
          })
          return result
        },
      },
    },
    {
      title: '申请数量',
      name: 'num',
      formItem: {
        type: 'number',
        rules: [
          {
            required: true,
            message: '请输入申请数量',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '供应商',
      name: 'supplier',
      formItem: {
        type: 'select',
        dict: supplyList,
      },
      tableItem: {
        render: (text, record) => {
          let result = ''
          supplyList.forEach((item) => {
            if (item.code === record.supplier) {
              result = item.codeName
            }
          })
          return result
        },
      },
    },
    {
      title: '价格',
      name: 'price',
      formItem: {
        type: 'number',
        rules: [
          {
            required: true,
            message: '请输入价格',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '小计',
      name: 'amountMoney',
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

export const createColumnsProduct = (self) => {
  return [
    {
      title: '产品编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '产品名称',
      name: `name`,
      tableItem: {},
    },
    {
      title: '单位',
      name: 'unitDesc',
      tableItem: {},
    },
    {
      title: '分类',
      name: `categoryDesc`,
      tableItem: {},
    },
    {
      title: '库存',
      name: 'totalAmount',
      tableItem: {},
    },
  ]
}

export const createColumnsPlan = (self) => {
  return [
    {
      title: '计划单号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '标题',
      name: `title`,
      tableItem: {},
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '申请人',
      name: `createdName`,
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

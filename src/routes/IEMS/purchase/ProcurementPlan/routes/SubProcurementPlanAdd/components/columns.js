/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-19 09:11:55
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'
import { number } from 'prop-types'

function convertStandard(fileSize){
  if(fileSize < 1024 * 1024){
    let newStandard = (fileSize / 1024 ).toFixed(2)
    return newStandard + ' KB'
  }else if(fileSize > 1024 * 1024){
    let newStandard = (fileSize / ( 1024 * 1024 )).toFixed(2)
    return newStandard + ' MB'
  }
}
export const createColumnsApp = (self) => {
  let { props } = self
  let {
    procurementPlanAdd: { brandList, unitList, supplyList },
  } = self.props
  return [
    {
      title: '名称',
      name: 'name',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入名称',
          },
          {
            max: 255,
            message: '不能大于255个字符',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '规格',
      name: `standard`,
      formItem: {},
      tableItem: {},
    },
    {
      title: '数量',
      name: 'num',
      formItem: {
        type: 'number',
        rules: [
          {
            required: true,
            message: '请输入数量',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '预计单价',
      name: 'price',
      formItem: {
        type: 'number',
        rules: [
          {
            required: true,
            message: '请输入预计单价',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '品牌',
      name: 'brand',
      formItem: {
        type: 'select',
        dict: brandList,
      },
      tableItem: {
        render: (text, record) => {
          let result = ''
          brandList.forEach((item) => {
            if (item.code === record.brand) {
              result = item.codeName
            }
          })
          return result
        },
      },
    },
    {
      title: '单位',
      name: 'unit',
      formItem: {
        type: 'select',
        dict: unitList,
      },
      tableItem: {
        render: (text, record) => {
          let result = ''
          unitList.forEach((item) => {
            if (item.code === record.unit) {
              result = item.codeName
            }
          })
          return result
        },
      },
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
      title: '备注',
      name: 'remark',
      formItem: {},
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
              <div>
                <Button tooltip="编辑" onClick={(e) => self.handleEdit(record)}>
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
        render: (text, record)=> {
          return (
            <>
              <span>{convertStandard(record.fileSize)}</span>
            </>
          )
        }
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

/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:56:28
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 09:45:13
 */

import React from 'react'

import Format from 'utils/format'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'

function convertStandard(fileSize){
  if(fileSize < 1024 * 1024){
    let newStandard = (fileSize / 1024 ).toFixed(2)
    return newStandard + ' KB'
  }else if(fileSize > 1024 * 1024){
    let newStandard = (fileSize / ( 1024 * 1024 )).toFixed(2)
    return newStandard + ' MB'
  }
}
export const createOrderColumns = (self) => {
  let {
    procurementApplyDetail: { unitList, supplyList },
  } = self.props
  return [
    {
      title: '产品编号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '产品名称',
      name: `name`,
      tableItem: {},
    },
    {
      title: '单位',
      name: 'unit',
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
      title: '申请数量',
      name: 'num',
      tableItem: {},
    },
    {
      title: '供应商',
      name: 'supplier',
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
      tableItem: {},
    },
    {
      title: '小计',
      name: 'amountMoney',
      tableItem: {},
    },
  ]
}
export const createEquipmentColumns = (self) => {
  let {
    procurementApplyDetail: { brandList, supplyList, typeList },
  } = self.props
  return [
    {
      title: '产品名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '类别',
      name: `type`,
      tableItem: {
        render: (text, record) => {
          let result = ''
          if(record.type){
            result = Format.getNameById(typeList, record.type, 'value')
          }
          return result && result.title
        },
      },
    },
    {
      title: '品牌',
      name: 'brand',
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
      title: '型号',
      name: 'model',
      formItem: {},
      tableItem: {},
    },
    {
      title: '规格',
      name: 'standard',
      tableItem: {},
    },
    {
      title: '数量',
      name: 'num',
      tableItem: {},
    },
    {
      title: '供应商',
      name: 'supplier',
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
      title: '单价',
      name: 'price',
      tableItem: {},
    },
    {
      title: '小计',
      name: 'amountMoney',
      tableItem: {},
    },
  ]
}
export const createFileColumns = (self) => {
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
  ]
}

export const baseInfoColumns = (self) => {
  let typeTransfer = {
    '0': '设备采购',
    '1': '备件耗材采购',
  }
  return [
    {
      title: '申请单号',
      name: 'sn',
    },
    {
      title: '计划单号',
      name: 'sourceCode',
    },
    {
      //TODO ---分类名称才对
      title: '申请人',
      name: 'createdName',
    },
    {
      title: '申请日期',
      name: 'createdOn',
    },
    {
      title: '申请类型',
      name: 'type',
      render: (text, record) => {
        return typeTransfer[record.type]
      },
    },
    {
      title: '期望供货时间',
      name: 'dlivertyDate',
    },
    {
      title: '采购标题',
      name: 'title',
    },
    {
      title: '购置理由',
      name: 'reason',
    },
    {
      title: '备注',
      name: 'remark',
    },
  ]
}

export const createCheckColumns = (self) => {
  return [
    {
      title: '审批人',
      name: 'auditorName',
      tableItem: {},
    },
    {
      title: '审批时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      //TODO ---分类名称才对
      title: '审批意见',
      name: 'description',
      tableItem: {},
    },
    {
      //TODO ---分类名称才对
      title: '审批结果',
      name: 'resultAction',
      tableItem: {},
    },
  ]
}

/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:56:28
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 15:36:01
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
    procurementTestDetail: { unitList, supplyList, locationList, typeList },
  } = self.props
  return [
    {
      title: '设备编号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '资产编号',
      name: `assetSn`,
      tableItem: {},
    },
    {
      title: '设备名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '电子标签码',
      name: 'tid',
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
      title: '规格',
      name: 'standard',
      tableItem: {},
    },
    {
      title: '出厂编号',
      name: 'factorySn',
      tableItem: {},
    },
    {
      title: '类别',
      name: 'type',
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
      title: '存放位置',
      name: 'locationtreeId',
      tableItem: {
        render: (text, record) => {
          let result = ''
          if(record.type){
            result = Format.getNameById(locationList, record.locationtreeId, 'id')
          }
          return result && result.title
        },
      },
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
      title: '购置日期',
      name: 'purchaseDate',
      tableItem: {},
    },
    {
      title: '购置金额',
      name: 'amountMoney',
      tableItem: {},
    },
    {
      title: '是否验收',
      name: 'isAccept',
      tableItem: {
        render: (text, record)=> {
          if(record.isAccept) {
            return '是'
          } else {
             return '否'
          }
        }
      },
    },
    {
      title: '备注',
      name: 'remark',
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
    '30': '试运行验收',
    '10': '到货验收',
    '20': '开箱验收',
  }
  return [
    {
      title: '标题',
      name: 'title',
    },
    {
      title: '验收人',
      name: 'createdName',
    },
    {
      //TODO ---分类名称才对
      title: '申请时间',
      name: 'acceptEndDate',
    },
    {
      title: '验收类别',
      name: 'acceptType',
      render: (text, record) => {
        return typeTransfer[record.acceptType]
      },
    },
    {
      title: '采购申请',
      name: 'purchaseCode',
    },
    {
      title: '采购计划',
      name: 'purchasePlanCode',
    },
    {
      title: '验收结果',
      name: 'acceptResult',
    },
    {
      title: '备注',
      name: 'remark',
    },
  ]
}

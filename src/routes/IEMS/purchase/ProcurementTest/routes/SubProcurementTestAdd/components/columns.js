/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 16:04:37
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'
import Format from 'utils/format'
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
  let {
    procurementTestAdd: { unitList, supplyList, locationList, typeList },
  } = self.props
  let testList = [
    {
      code: false,
      codeName: '未验收',
    },
    {
      code: true,
      codeName: '已验收',
    },
  ]
  return [
    {
      title: '设备编号',
      name: 'code',
      formItem: {},
      tableItem: {},
    },
    {
      title: '资产编号',
      name: `assetSn`,
      formItem: {},
      tableItem: {},
    },
    {
      title: '设备名称',
      name: 'name',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入设备名称',
          },
        ],
      },
      tableItem: {},
    },
    {
      title: '电子标签码',
      name: 'tid',
      formItem: {
        type: 'number',
      },
      tableItem: {},
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
      title: '规格',
      name: 'standard',
      formItem: {},
      tableItem: {},
    },
    {
      title: '出厂编号',
      name: 'factorySn',
      formItem: {},
      tableItem: {},
    },
    {
      title: '类别',
      name: `type`,
      formItem: {
        type: 'treeselect',
        treeData: typeList,
      },
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
      formItem: {
        type: 'treeselect',
        treeData: locationList,
      },
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
      title: '购置日期',
      name: 'purchaseDate',
      formItem: {
        type: 'date',
      },
      tableItem: {},
    },
    {
      title: '购置金额',
      name: 'amountMoney',
      formItem: {
        type: 'number',
      },
      tableItem: {},
    },
    {
      title: '是否验收',
      name: 'isAccept',
      formItem: {
        type: 'select',
        dict: testList,
      },
      tableItem: {
        render: (text, record) => {
          if(record.isAccept){
            return '是'
          } else {
            return '否'
          }
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
                <Button
                  tooltip="删除"
                  onClick={(e) => self.handleDelete(record)}
                >
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
              <Button
                tooltip="删除"
                onClick={(e) => self.handleFileDelete(record)}
              >
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
      title: '设备编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: `name`,
      tableItem: {},
    },
    {
      title: '设备品牌',
      name: 'brandName',
      tableItem: {},
    },
    {
      title: '设备型号',
      name: `modelCn`,
      tableItem: {},
    },
    {
      title: '所属部门',
      name: `orgName`,
      tableItem: {},
    },
    {
      title: '状态',
      name: 'statusDesc',
      tableItem: {},
    },
  ]
}

export const createColumnsApply = (self) => {
  return [
    {
      title: '申请单号',
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

export const createFormColumns = (self) => {
  const {
    procurementTestAdd: { organizationTree },
  } = self.props
  const statusList = [
    {
      codeName: '保养',
      code: 1,
    },
    {
      codeName: '闲置',
      code: 2,
    },
    {
      codeName: '停用',
      code: 3,
    },
    {
      codeName: '在用',
      code: 4,
    },
    {
      codeName: '预转固',
      code: 5,
    },
    {
      codeName: '故障',
      code: 6,
    },
    {
      codeName: '正常',
      code: 7,
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
      title: '设备状态',
      name: 'status',
      tableItem: {},
      formItem: {
        dict: statusList,
        type: 'select',
        allowClear: true,
      },
    },
    {
      title: '所属部门',
      name: 'orgId',
      tableItem: {},
      formItem: {
        type: 'treeselect',
        treeData: organizationTree,
        allowClear: true,
      },
    },
  ]
}

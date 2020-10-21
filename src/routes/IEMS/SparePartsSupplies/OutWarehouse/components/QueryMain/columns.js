/*
 * @Descripttion : 出库管理的列表表头参数
 * @Author       : caojiarong
 * @Date         : 2020-05-14 14:34:01
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-16 08:59:08
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

// 根据typeId转换类型名称
function getTypeName(type) {
  switch (type) {
    case 1:
      return '普通入库'
    case 2:
      return '采购入库'
    case 3:
      return '领用归还'
    case 4:
      return '盘盈入库'
    case 5:
      return '生产出库'
    case 6:
      return '发货出库'
    case 7:
      return '盘亏出库'
    default:
      return ''
  }
}

let dict=[{code:'1',codeName:'1'}]

export const createColumns = (self, expand) => {
  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: '出库编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '出库产品',
      name: 'name',
    },
    {
      title: '出库人',
      name: 'operatorName',
      tableItem: {}
    },
    {
      title: '领料人',
      name: 'receiveUserName',
      tableItem: {}
    },
    {
      title: '出库时间',
      name: 'operateTime',
      tableItem: {},
    },
    {
      title: '出库仓库',
      name: 'warehouseName',
      tableItem: {},
    },
    {
      title: '出库类型',
      tableItem: {
        render: (text, record) => {
          return <span>{getTypeName(record.outInType)}</span>
        }
      },
    },
    
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 80,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
                  </Button>
                  <Button tooltip='撤销' onClick={e => self.handleDelete(record)}>
                    <Icon type='revoke' />
                  </Button>
                </>
              )
            }
          </EditableOper>
        )
      },
    },
  ]
}


export const createFormColumns = (self, warehouseList) => {
  return [
    {
      title: '出库仓库',
      name: 'warehouseId',
      tableItem: {},
      formItem:{
        type:'select',
        dict: warehouseList,
        allowClear: true
      }
    },
    {
      title: '出库单号',
      name: 'code',
      tableItem: {},
      searchItem: {
      },
      formItem: {
        type: 'input'
      }
    },
    {
      title: '出库日期',
      name: 'operateTime',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
        allowClear: true
      }
    }
  ]
}
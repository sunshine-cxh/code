/*
 * @Descripttion : 入库管理的列表组件
 * @Author       : caojiarong
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-12 16:37:32
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
      return '-'
  }
}

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
      title: '入库单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '入库时间',
      name: 'operateTime',
      tableItem: {},
    },
    {
      title: '入库人',
      name: 'operatorName',
      tableItem: {}
    },
    {
      title: '入库类型',
      tableItem: {
        render: (text, record) => {
          return <span>{getTypeName(record.outInType)}</span>
        }
      }
    },
    {
      title: '入库仓库',
      name: 'warehouseName',
      tableItem: {},
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 120,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
                  </Button>
                  <Button tooltip='撤销' onClick={e => self.handleDelete(record.id)}>
                    <Icon type='revoke' />
                  </Button>
                  {/* todo -----打印功能注释，后续版本进行开发 */}
                  {/* <Button tooltip='打印' onClick={e => self.handlePrint(record)}>
                    <Icon type='print' />
                  </Button> */}
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
      title: '入库仓库',
      name: 'warehouseId',
      tableItem: {},
      formItem: {
        type: 'select',
        dict:warehouseList,
        allowClear: true
      },
    },
    {
      title: '入库单号',
      name: 'code',
      tableItem: {},
      searchItem: {
      },
      formItem: {
        type: 'input'
      }
    },
    {
      title: '入库日期',
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
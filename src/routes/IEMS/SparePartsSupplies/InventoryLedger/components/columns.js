/*
 * @Descripttion : 库存台账的表头配置数据
 * @Author       : caojiarong
 * @Date         : 2020-05-22 14:24:59
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-16 11:12:10
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  
  return [
    {
      title: '产品编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '产品名称',
      name: 'name',
      tableItem: {}
    },
    {
      title: '产品分类',
      name: 'categoryName',
      tableItem: {
      }
    },
    {
      title: '品牌',
      name: 'brandName',
      tableItem: {
      },
    },
    {
      title: '产品规格',
      name: 'standard',
      tableItem: {},
    },
    {
      title: '所在仓库',
      name: 'warehouseName',
      tableItem: {},
    },
    {
      title: '单位',
      name: 'unitDesc',
      tableItem: {},
    },
    {
      title: '价格',
      name: 'price',
      tableItem: {},
    },
    {
      title: '平均价',
      name: 'avgPrice',
      tableItem: {},
    },
    {
      title: '数量',
      name: 'totalAmount',
      tableItem: {},
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  {/* <Button tooltip="删除" onClick={e => self.handleDelete(record)}>
                    <Icon type="delete" />
                  </Button> */}
                  {/* <Button tooltip="编辑" onClick={e => self.handleEdit(record)}>
                    <Icon type="edit" />
                  </Button> */}
                  <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
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
      title: '所在仓库',
      name: 'warehouseId',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear: true,
        dict: warehouseList
      }
    },
    {
      title: '产品编号',
      name: 'productCode',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true
      },
      searchItem: {}
    },
    {
      title: '产品名称',
      name: 'productName',
      tableItem: {},
      formItem: {
        allowClear: true
      },
      searchItem: {}
    },
    {
      title: '产品规格',
      name: 'standard',
      tableItem: {},
      formItem: {
        allowClear: true
      }
    }
  ]
}
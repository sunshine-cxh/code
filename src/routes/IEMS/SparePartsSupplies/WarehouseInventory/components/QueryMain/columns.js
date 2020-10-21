/*
 * @Descripttion : 仓库盘点的列表组件
 * @Author       : caojiarong
 * @Date         : 2020-05-25 12:34:01
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-17 15:19:19
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

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
      title: '盘点单号',
      name: 'code',
      tableItem: {
        width:150
      },
    },
    {
      title: '盘点日期',
      name: 'operateTime',
      tableItem: {
        width:170
      },
    },
    {
      title: '盘点仓库',
      name: 'warehouseName',
      tableItem: {
        width:140
      }
    },
    {
      title: '盘点人',
      name: 'operatorName',
      tableItem: {
        width:100
      }
    },
    {
      title: '盘点结果',
      name: 'result',
      tableItem: {
        render:(text, record)=>{
          return <>
            {record.inResult ? <span>盘盈入库项：{record.inResult};</span>:''}
            {record.inCode ? <span>入库单号：<span className='toPage' onClick={e => self.handleToPage('in',record)}>{record.inCode}</span>,</span>:''}
            {record.outResult ? <span>盘亏出库项：{record.outResult};</span>:''}
            {record.outCode ? <span>出库单号：<span className='toPage' onClick={e => self.handleToPage('out',record)}>{record.outCode}</span></span>:''}
          </>
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
                  {/* <Button tooltip='撤销' onClick={e => self.handleDelete(record.id)}>
                    <Icon type='revoke' />
                  </Button> */}
                  <Button tooltip='详情' onClick={e => self.handleDetails(record)}>
                    <Icon type='detail' />
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
      title: '盘点仓库',
      name: 'warehouseId',
      tableItem: {},
      formItem: {
        type: 'select', 
        dict:warehouseList,
        allowClear: true
      },
    },
    {
      title: '盘点单号',
      name: 'code',
      tableItem: {},
      searchItem: {
      },
      formItem: {
        type: 'input'
      }
    },
    {
      title: '盘点日期',
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
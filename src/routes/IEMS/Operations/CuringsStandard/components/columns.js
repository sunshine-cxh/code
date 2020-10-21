/*
 * @Descripttion : 养护标准列表表头参数
 * @Author       : hezihua
 * @Date         : 2020-06-02 11:30:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:11:35
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'

export const createColumns = (self) => {
  let cycletransfer = {
    1: '天',
    2: '月',
    3: '年'
  }
  let { curingsStandard: { typeList, curingsStandardList }} = self.props
  return [
    {
      title: '标准编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '标准名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '类型',
      name: 'type',
      tableItem: {
        render: (text, record)=> {
          let name = ''
          curingsStandardList.forEach(item=> {
            if(item.code == record.type) {
              name = item.codeName
            }
          })
          return name
        }
      }
    },
    {
      title: '设备类别',
      name: 'cateId',
      tableItem: {
        render: (text, record) => {
          let result = ''
          if (record.cateId) {
            result = Format.getNameById(typeList, record.cateId, 'value')
          }
          return result && result.title
        },
      }
    },
    {
      title: '养护周期',
      name: 'cycle',
      tableItem: {
        render: (text, record) => {
          return <span>{`${record.cycle}${cycletransfer[record.cycleUnit]}`}</span>
        }
      },
    },
    {
      title: '要求',
      name: 'require',
      tableItem: {},
    },
    {
      title: '创建人',
      name: 'createdName',
      tableItem: {
        
      },
    },
    {
      title: '创建时间',
      name: 'createdOn',
      tableItem: {
        render: (text, record) => {
          return record.createdOn && record.createdOn.slice(0,10)
        }
      },
    },
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 160,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {form =>
              (
                <>
                  <Button tooltip='修改' onClick={e => self.handleEdit(record)}>
                    <Icon type='edit' />
                  </Button>
                  <Button tooltip='删除' onClick={e => self.handleDelete(record)}>
                    <Icon type='delete' />
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


export const createFormColumns = (self) => {
  let { curingsStandard: { curingsStandardList }} = self.props
  return [
    {
      title: '标准编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true
      }
    },
    {
      title: '标准名称',
      name: 'name',
      tableItem: {},
      formItem:{
        type:'input',
        allowClear: true
      }
    },
    
    {
      title: '类型',
      name: 'type',
      tableItem: {},
      formItem: {
        type: 'select',
        allowClear: true,
        dict: curingsStandardList
      }
    },
    {
      title: '创建时间',
      name: 'createdOn',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
        allowClear: true
      }
    },
  ]
}
/*
 * @Descripttion : 巡检标准列表表头参数
 * @Author       : caojiarong
 * @Date         : 2020-06-02 11:30:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 14:23:51
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'


export const createColumns = (self) => {
  let { patrolStandard: { typeList }} = self.props
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
      name: 'typeDesc',
      tableItem: {}
    },
    {
      title: '设备分类',
      name: 'cateId',
      tableItem: {
        render:(text, record)=> {
          let result
          typeList.forEach(item=> {
            if(item.id === record.cateId) {
              result = item.title
            }
          })
          return result
        }
      }
    },
    {
      title: '要求',
      name: 'require',
      tableItem: {},
    },
    {
      title: '创建人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '创建时间',
      name: 'createdOn',
      tableItem: {
        render:(text, record)=> {
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
  let { patrolStandard: { patrolStandardList }} = self.props
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
        type: 'treeselect',
        treeData: patrolStandardList,
        allowClear: true
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
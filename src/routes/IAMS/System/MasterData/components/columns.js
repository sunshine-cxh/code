import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'

export default (self, expand) => {
  let { masterDataType, record, functionAuthority } = expand
  masterDataType = Format.selectTreeFormat(masterDataType, 'id', 'title')
  let masterDataDict = Format.selectDictFormat(masterDataType, true)
  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: '上级类别',
      name: 'parentId',
      dict: masterDataDict,
      formItem: {
        type: 'treeSelect',
        initialValue: masterDataType.length ? masterDataType[0].value : '',
        treeData: masterDataType,
      },
    },
    {
      title: '类别名称',
      name: 'categoryName',
      tableItem: {
        width: 300,
      },
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入类别名称'
          },
          {
            max: 25,
            message: '不能大于25个字符',
          }
        ]
      },
    },
    {
      title: '类别编码',
      name: 'categoryCode',
      tableItem: {
      },
      formItem: {
        type: !record ? 'input' : 'disabled',
        rules: [
          {
            required: true,
            message: '请输入类别编码'
          },
          {
            max: 25,
            message: '不能大于25个字符',
          }
        ]
      }
    },
    {
      title: '排序',
      name: 'sortId',
      tableItem: {},
      formItem: {
        type: 'number',
        initialValue: !record && 0
      }
    },
    {
      title: '备注',
      name: 'remark',
      formItem: {
        type: 'textarea',
        rules: [
          {
            max: 500,
            message: '不能大于500个字符',
          }
        ]
      },
      tableItem: {
        width: '20%',
        render: (text) => <span className='ellipsis-2'>{text}</span>,
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <DataTable.Oper>
            <Button
              display={functionAuthority.indexOf('btnUpdate') > -1}
              tooltip="修改"
              onClick={e => self.onUpdate(record)}
            >
              <Icon type="edit" />
            </Button>
            <Button
              display={functionAuthority.indexOf('btnDelete') > -1}
              tooltip="删除"
              onClick={e => self.onDelete(record)}
            >
              <Icon type="delete" />
            </Button>
          </DataTable.Oper>
        )
      }
    }
  ]
}

import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'

export default (self, expand) => {
  const { masterDataType, record, masterDataTreeActiveValue, functionAuthority } = expand
  let masterDataTypeDict = Format.multiToOneFormat(masterDataType,)
  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: '数据类别',
      name: 'categoryCode',
      dict: masterDataTypeDict,
      formItem: {
        type: 'treeSelect',
        initialValue:  masterDataTreeActiveValue,
        treeData: masterDataType,
      },
    },
    {
      title: '数据名称',
      name: 'dataName',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入数据名称'
          },
          {
            max: 25,
            message: '不能大于25个字符',
          }
        ]
      }
    },
    {
      title: '数据代码',
      name: 'dataCode',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入数据代码'
          },
          {
            max: 25,
            message: '不能大于25个字符',
          }
        ]
      },
    },
    {
      title: '排序',
      name: 'sortId',
      tableItem: {},
      formItem: {
        type: 'number',
        initialValue: !record && 0
      },
    },
    {
      title: '备注',
      name: 'remark',
      tableItem: {},
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

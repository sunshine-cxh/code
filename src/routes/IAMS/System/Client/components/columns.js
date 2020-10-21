import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export default (self, expand) => {
  let { clientType, record, functionAuthority } = expand
  return [
    {
      title: '客户端Id',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: '客户端名称',
      name: 'clientName',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入客户端名称'
          },
          // {
          //   max: 50,
          //   message: '不能大于50个字符',
          // }
        ]
      }
    },
    {
      title: '客户端简称',
      name: 'clientAbbreviation',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入客户端简称'
          },
          {
            max: 50,
            message: '不能大于50个字符',
          }
        ]
      }
    },
    {
      title: '客户端类型',
      name: 'clientType',
      dict: expand.clientType,
      tableItem: {},
      formItem: {
        initialValue: clientType.length > 0 ? clientType[0].code : '',
        type: 'select'
      }
    },
    {
      title: 'URL',
      name: 'url',
      tableItem: {},
      formItem: {}
    },
    {
      title: '排序',
      name: 'sortId',
      tableItem: {
        width: 100
      },
      formItem: {
        initialValue: !record && 0,
        type: 'number',
      }
    },
    {
      title: '图标',
      name: 'icon',
      tableItem: {
        width: 100
      },
      formItem: {}
    },
    {
      title: '是否公开',
      name: 'isPublic',
      tableItem: {
        width: 100,
      },
      dict: [
        {
          code: 0,
          codeName: '否'
        },
        {
          code: 1,
          codeName: '是'
        }
      ],
      formItem: {
        type: 'switch',
        initialValue: record ? record.isPublic : false,
        onChange: (checked, value) => {
          // TODO fix
        }
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
              // display={functionAuthority.indexOf('btnUpdate') > -1}
              tooltip="修改"
              onClick={e => self.onUpdate(record)}
            >
              <Icon type="edit" />
            </Button>
            <Button
              // display={functionAuthority.indexOf('btnDelete') > -1}
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

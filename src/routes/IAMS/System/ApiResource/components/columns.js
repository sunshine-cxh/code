import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export default (self, expand) => {
  let { functionAuthority } = expand
  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: 'API名称',
      name: 'apiName',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入API名称'
          },
          {
            max: 255,
            message: '不能大于255个字符',
          }
        ]
      }
    },
    {
      title: '展示名称',
      name: 'displayName',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入展示名称'
          },
          {
            max: 255,
            message: '不能大于255个字符',
          }
        ]
      }
    },
    {
      title: '备注',
      name: 'remark',
      tableItem: {
        width: '30%',
        render: (text) => <span className='ellipsis-2'>{text}</span>,
      },
      formItem: {
        type: 'textarea',
        rules: [
          {
            max: 500,
            message: '不能大于500个字符',
          }
        ],
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
  ];
};

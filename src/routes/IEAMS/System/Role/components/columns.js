import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  let {
    roleType,
    record,
    functionAuthority,
    enterpriseList,
    toolbarSelectorValue,
  } = expand
  return [
    {
      title: '角色Id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '公司',
      name: 'enterpriseId',
      dict: enterpriseList,
      formItem: {
        type: 'select',
        disabled: !!record,
        initialValue: toolbarSelectorValue,
      },
    },
    {
      title: '角色类型',
      name: 'roleType',
      dict: roleType,
      tableItem: {},
      formItem: {
        type: 'select',
        initialValue: roleType.length > 0 ? roleType[0].code : '',
      },
    },
    {
      title: '角色名称',
      name: 'roleName',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入角色名称',
          }
        ],
      },
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
          },
        ],
      },
      tableItem: {
        width: '30%',
        render: (text) => <span className="ellipsis-2">{text}</span>,
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 120,
        align: 'center',
        render: (text, record) => (
          <DataTable.Oper>
            <Button
              display={functionAuthority.indexOf('btnPermissionSetting') > -1}
              tooltip="权限设置"
              onClick={(e) => self.handlePermissionVisible(record)}
            >
              <Icon type="user-authority" />
            </Button>
            <Button
              display={functionAuthority.indexOf('btnUpdate') > -1}
              tooltip="修改"
              onClick={(e) => self.onUpdate(record)}
            >
              <Icon type="edit" />
            </Button>
            <Button
              display={functionAuthority.indexOf('btnDelete') > -1}
              tooltip="删除"
              onClick={(e) => self.onDelete(record)}
            >
              <Icon type="delete" />
            </Button>
          </DataTable.Oper>
        ),
      },
    },
  ]
}

export const createColumnsClient = (self, expand) => {
  return [
    {
      title: '角色Id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '应用名称',
      name: 'clientName',
      tableItem: {},
    },
    {
      title: '应用类型',
      name: 'clientType',
      tableItem: {},
    },
  ]
}

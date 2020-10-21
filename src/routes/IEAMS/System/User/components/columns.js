import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'
import moment from 'utils/moment'
import app from '@/index.js'

export const createColumns1 = (self, expand) => {
  const {
    accountType,
    role,
    organizationTree,
    record,
    functionAuthority,
    enterpriseList,
    enterpriseId,
  } = expand
  let organizationDict = Format.multiToOneFormat(organizationTree, true)

  return [
    {
      title: '用户id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    // {
    //   title: '公司',
    //   name: 'enterpriseId',
    //   dict: enterpriseList,
    //   formItem: {
    //     type: 'select',
    //     disabled: !!record,
    //     initialValue: enterpriseId,
    //     onChange: (form, value) => {
    //       app.dispatch({
    //         type: 'user/getAllOrganization',
    //         payload: {
    //           enterpriseId: value,
    //         },
    //       })

    //       app.dispatch({
    //         type: 'user/getAllRole',
    //         payload: {
    //           enterpriseId: value,
    //         },
    //       })
    //     },
    //   },
    // },
    {
      title: '用户账号',
      name: 'account',
      tableItem: {},
      formItem: {
        type: !record ? 'input' : 'disabled',
        rules: [
          {
            required: true,
            message: '请输入用户账号',
          },
        ],
      },
    },
    {
      title: '用户名称',
      name: 'realName',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入用户名称',
          },
        ],
      },
    },
    {
      title: '密码',
      name: 'password',
      formItem: {
        type: !record ? 'password' : 'hidden',
        repeat: record ? 'true' : 'false',
      },
    },
    {
      title: '角色',
      name: 'roleId',
      dict: role,
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请先前往角色管理创建角色',
          },
        ],
        type: 'select',
        initialValue: role.length > 0 ? role[0].code : '',
      },
    },
    {
      title: '部门',
      name: 'orgId',
      dict: organizationDict,
      formItem: {
        type: 'treeSelect',
        initialValue: organizationTree.length ? organizationTree[0].value : '',
        treeData: organizationTree,
      },
    },
    {
      title: '账户类型',
      name: 'accountType',
      dict: accountType,
      tableItem: {},
      formItem: {
        type: 'select',
        initialValue: accountType.length > 0 ? accountType[0].code : '',
      },
    },
    {
      title: '部门',
      name: 'orgId',
      dict: organizationDict,
      tableItem: {},
    },
    {
      title: '联系电话',
      name: 'phone',
      formItem: {},
      tableItem: {},
    },
    {
      title: '电子邮箱',
      name: 'email',
      tableItem: {},
      formItem: {
        autoComplete: 'new-password',
        rules: [
          {
            pattern: /\w+@[a-z0-9]+\.[a-z]{2,4}/,
            message: '请输入正确的邮箱格式',
          },
        ],
      },
    },
    {
      title: '出生日期',
      name: 'birthday',
      formItem: {
        type: 'date',
        disabledDate: (current) => {
          // Can not select days after today
          return current && current > moment().endOf('day')
        },
      },
    },
    {
      title: '性别',
      name: 'gender',
      dict: [
        { code: 1, codeName: '男' },
        { code: 0, codeName: '女' },
      ],
      formItem: {
        type: 'radio',
        initialValue: 1,
      },
    },
    {
      title: 'QQ',
      name: 'qq',
      formItem: {
        rules: [
          {
            max: 50,
            message: '不能大于50个字符',
          },
        ],
      },
    },
    {
      title: '微信',
      name: 'wechat',
      tableItem: {},
      formItem: {
        rules: [
          {
            max: 50,
            message: '不能大于50个字符',
          },
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
        width: '20%',
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
              display={functionAuthority.indexOf('btnResetPwd') > -1}
              tooltip="重置密码"
              onClick={(e) => self.handleUpdateUserPassword(record)}
            >
              <Icon type="reset-password" />
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

export const columns2 = [
  {
    title: '用户账户',
    name: 'account',
    formItem: {
      type: 'disabled',
    },
  },
  {
    title: '用户名称',
    name: 'realName',
    formItem: {
      type: 'disabled',
    },
  },
  {
    title: '密码',
    name: 'password',
    formItem: {
      type: 'password',
      repeat: true,
    },
  },
  //hidden
  {
    title: '用户id',
    name: 'id',
    formItem: {
      type: 'hidden',
    },
  },
]

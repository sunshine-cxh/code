import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  const { functionAuthority } = expand

  return [
    {
      title: 'ID',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '人员编号',
      name: 'code',
      tableItem: {},
      formItem: {
        type: 'disabled',
      },
    },
    {
      title: '人员名称',
      name: 'name',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入人员名称',
          },
        ],
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
      title: '出生日期',
      name: 'birthday',
      formItem: {
        type: 'date',
      },
    },
    {
      title: '所属部门',
      name: 'orgId',
      dict: [
        { code: 'e538f6ca-5aaa-11ea-b6df-98fa9bccaeb8', codeName: '开发部' },
        { code: '0e021d8d-5aab-11ea-b6df-98fa9bccaeb8', codeName: '后端' },
        { code: '2feb9c4e-5aab-11ea-b6df-98fa9bccaeb8', codeName: '前端' },
        { code: '5512a26b-5aab-11ea-b6df-98fa9bccaeb8', codeName: '测试' },
        { code: 'b9dcdfae-5aab-11ea-b6df-98fa9bccaeb8', codeName: '销售部' },
      ],
      tableItem: {
        type: 'select',
      },
      formItem: {
        type: 'treeSelect',
        initialValue: 'e538f6ca-5aaa-11ea-b6df-98fa9bccaeb8',
        treeData: [
          {
            value: 'e538f6ca-5aaa-11ea-b6df-98fa9bccaeb8',
            title: '开发部',
            children: [
              {
                value: '0e021d8d-5aab-11ea-b6df-98fa9bccaeb8',
                title: '后端',
              },
              {
                value: '2feb9c4e-5aab-11ea-b6df-98fa9bccaeb8',
                title: '前端',
              },
              {
                value: '5512a26b-5aab-11ea-b6df-98fa9bccaeb8',
                title: '测试',
              },
            ],
          },
          {
            value: 'b9dcdfae-5aab-11ea-b6df-98fa9bccaeb8',
            title: '销售部',
            children: [],
          },
        ],
      },
    },
    {
      title: '联系电话',
      name: 'phone',
      tableItem: {},
      formItem: {},
    },
    {
      title: '职责',
      name: 'duty',
      tableItem: {},
      formItem: {},
    },
    {
      title: '资格证书',
      name: 'certificate',
      tableItem: {},
      formItem: {},
    },
    {
      title: '备注',
      name: 'remark',
      formItem: {
        type: 'textarea',
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 120,
        render: (text, record) => (
          <DataTable.Oper>
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

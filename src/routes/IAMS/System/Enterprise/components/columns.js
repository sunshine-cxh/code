import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import moment from 'utils/moment'

export default (self, expand) => {
  let { organizationType, industryType, record, functionAuthority, enterpriseScale } = expand
  let now = moment().format('YYYY-MM-DD')
  let oneYearLater = moment().add(1, 'y').format('YYYY-MM-DD')
  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '企业编码',
      name: 'enterpriseCode',
      formItem: {
        type: 'disabled',
        initialValue: '系统自动生成',
      },
    },
    {
      title: '企业名称',
      name: 'enterpriseName',
      tableItem: {},
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入企业名称',
          },
          {
            max: 25,
            message: '不能大于25个字符',
          },
        ],
      },
    },
    {
      title: '企业编码',
      name: 'enterpriseCode',
      tableItem: {},
    },
    {
      title: '组织类型',
      name: 'orgType',
      dict: organizationType,
      formItem: {
        initialValue: organizationType.length > 0 ? organizationType[0].code : '',
        type: 'select',
      },
    },
    {
      title: '行业类型',
      name: 'industryType',
      dict: industryType,
      formItem: {
        initialValue: industryType.length > 0 ? industryType[0].code : '',
        type: 'select',
      },
    },
    {
      title: '企业法人',
      name: 'corporate',
      formItem: {},
    },
    {
      title: '启用日期',
      name: 'enableDate',
      tableItem: {},
      formItem: {
        type: 'date',
        initialValue: now,
        allowClear: false,
        rules: [
          {
            required: true,
            message: '请选择启用日期',
          },
        ],
      },
    },
    {
      title: '过期日期',
      name: 'expirationDate',
      tableItem: {},
      formItem: {
        type: 'date',
        initialValue: oneYearLater,
        allowClear: false,
        rules: [
          {
            required: true,
            message: '请选择过期日期',
          },
        ],
      },
    },
    {
      title: '购买用户数',
      name: 'userNumber',
      tableItem: {
        width: 120,
      },
      formItem: {
        type: 'number',
        initialValue: !record && 10,
      },
    },

    {
      title: '注册号',
      name: 'registerNo',
      formItem: {},
    },
    {
      title: '注册资本(万元)',
      name: 'registeredCapital',
      formItem: {},
    },
    {
      title: '企业规模',
      name: 'enterpriseScale',
      dict: enterpriseScale,
      formItem: {
        type: 'select',
        initialValue: enterpriseScale.length > 0 ? enterpriseScale[0].code : '',
      },
    },
    {
      title: '联系人',
      name: 'contacts',
      tableItem: {
        width: 120,
      },
      formItem: {},
    },
    {
      title: '联系电话',
      name: 'phone',
      tableItem: {
        width: 120,
      },
      formItem: {},
    },
    {
      title: '邮箱',
      name: 'EnterpriseCode',
      formItem: {
        rules: [
          {
            pattern: /\w+@[a-z0-9]+\.[a-z]{2,4}/,
            message: '请输入正确的邮箱格式',
          },
        ],
      },
    },
    {
      title: '排序',
      name: 'sortId',
      formItem: {
        type: 'number',
        initialValue: !record && 0,
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
        width: '15%',
        render: (text) => <span className="ellipsis-2">{text}</span>,
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

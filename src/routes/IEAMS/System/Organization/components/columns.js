import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'
import app from '@/index.js'

export default (self, expand) => {
  let { organizationType, record, functionAuthority, enterpriseList ,modalEnterpriseSelectorValue} = expand
  organizationType = Format.selectTreeFormat(organizationType, 'id', 'title')
  organizationType = [{
    value: "0",
    title: "无"
  }].concat(organizationType)
  let organizationDict = Format.selectDictFormat(organizationType, true)

  return [
    {
      title: 'id',
      name: 'id',
      formItem: {
        type: 'hidden'
      }
    },
    {
      title: '公司',
      name: 'enterpriseId',
      dict: enterpriseList,
      formItem: {
        type: 'select',
        disabled: !!record,
        initialValue:  modalEnterpriseSelectorValue,
        onChange: (form, value) => {
          app.dispatch({
            type: 'organization/getOrganizationType',
            payload: {
              enterpriseId: value
            }
          })
        }
      },
    },
    {
      title: '上级',
      name: 'parentId',
      dict: organizationDict,
      formItem: {
        type: 'treeSelect',
        initialValue: organizationType.length ? organizationType[0].value : '',
        treeData: organizationType,
      },
    },
    {
      title: '组织名称',
      name: 'organizationName',
      tableItem: {
        width: 300,
        align: 'left',
        // className: 'table-tree-cell',
      },
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入组织名称'
          },
          {
            max: 25,
            message: '不能大于25个字符',
          }
        ]
      },
    },
    {
      title: '组织编码',
      name: 'organizationCode',
      tableItem: {},
      formItem: {
        type: 'disabled',
        initialValue: '系统自动生成'
      }
    },
    {
      title: '负责人',
      name: 'leader',
      tableItem: {
      },
      formItem: {
      }
    },
    {
      title: '联系人',
      name: 'contacts',
      tableItem: {
      },
      formItem: {

      }
    },
    {
      title: '联系电话',
      name: 'phone',
      tableItem: {
      },
      formItem: {
      }
    },
    {
      title: '邮箱',
      name: 'email',
      formItem: {
        rules: [
          {
            pattern: /\w+@[a-z0-9]+\.[a-z]{2,4}/,
            message: '请输入正确的邮箱格式'
          }
        ]
      }
    },
    {
      title: '办公地址',
      name: 'address',
      formItem: {
      }
    },
    {
      title: '排序',
      name: 'sortId',
      formItem: {
        type: 'number',
        initialValue: !record && 0,
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
              onClick={e => self.handleUpdate(record)}
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

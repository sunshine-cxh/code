/*
 * @Descripttion : 门站信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 10:35:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 11:57:21
 */
import React from 'react'
import {EditableOper} from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  console.log(self.state)
  return [
    {
      title: 'ID',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '门站编号',
      name: 'code',
      tableItem: {},
      formItem: {
        // type:'text',
        disabled: !self.state.codeEdit,
        rules: [
          {
            required: true,
            message: '请输入门站编号',
          },
        ],
      },
    },
    {
      title: '门站名称',
      name: 'name',
      tableItem: {},
      formItem: {
        // type:'text',
        rules: [
          {
            required: true,
            message: '请输入门站名称',
          }]
      },
    },
    {
      title: 'SCADA点位',
      name: 'scadaPoint',
      tableItem: {},
      formItem: {
        // type: 'text',
        rules: [
          {
            required: true,
            message: '请输入SCADA点位',
          }]
      },
    },
    {
      title: '门站备注',
      name: 'remark',
      tableItem: {},
      formItem: {
        type: 'textarea',
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {
              form=>(
                <>
                  <Button
                    tooltip="修改"
                    onClick={(e) => self.handleEdit(record)}
                  >
                    <Icon type="edit" />
                  </Button>
                  <Button
                    tooltip="删除"
                    onClick={(e) => self.handleDelete(record)}
                  >
                    <Icon type="delete" />
                  </Button>
                </>
              )
            }
            
          </EditableOper>
        ),
      },
    },
  ]
}

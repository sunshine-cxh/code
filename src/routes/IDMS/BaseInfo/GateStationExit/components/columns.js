/*
 * @Descripttion : 门站出口信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 11:55:17
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-08 08:41:27
 */
import React from 'react'
import {EditableOper} from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import { Select } from 'antd'

export const createColumns = (self, expand) => {

  return [
    {
      title: 'ID',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '出口编号',
      name: 'code',
      tableItem: {},
      formItem: {
        disabled: !self.state.codeEdit,
        rules: [
          {
            required: true,
            message: '请输入出口编号',
          },
        ],
      },
    },
    {
      title: '出口名称',
      name: 'name',
      tableItem: {},
      formItem: {
        initialValue: '出口名称',
        // type: 'text',
        rules: [
          {
            required: true,
            message: '请输入出口名称',
          }]
      },
    },
    {
      title: '所属门站',
      name: 'stationId',
      tableItem: {
        render:(text,record)=>{
          return (<>{record.stationName}</>)
        }
      },
      formItem: {
        initialValue: '所属门站',
        type:'select',
        dict:self.props.gateStationExit.gateStationList,
        rules: [
          {
            required: true,
            message: '请选择所属门站',
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
      title: '出口备注',
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

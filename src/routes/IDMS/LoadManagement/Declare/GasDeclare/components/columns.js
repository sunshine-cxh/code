/*
 * @Descripttion : 重点用户申报
 * @Author       : gujitao
 * @Date         : 2020-08-26 15:04:12
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-08 10:23:19
 */
import React from 'react'
import DataTable from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Format from 'utils/format'
import moment from 'utils/moment'
import app from '@/index.js'
import { connect } from 'echarts'
import { render } from 'less'
import { disable } from 'ol/rotationconstraint'

export const createColumns1 = (self, expand) => {
  const { organizationTree, functionAuthority, moduleList, enterpriseName, moduleStatus } = expand
  let organizationDict = Format.multiToOneFormat(organizationTree, true)

  // fromChangeHandler()
  return [
    {
      title: '申报单号',
      name: 'code',
      formItem: {
        disabled:true
      },
    },
    {
      title: '申报id',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },

    {
      title: '申请单位',
      name: 'departmentName',
      tableItem: {
        // dict:enterpriseName
        render: () => {
          return <>{enterpriseName}</>
        },
      },
    },

    {
      title: '日指定量',
      name: 'assignAmount',
      formItem: {
        disabled:true
      },
    },

    {
      title: '申报起始日期',
      name: 'gasStartTime',
      tableItem: {
        type: 'date',
      },
      formItem: {
        type: 'date',
      },
    },
    {
      title: '申报结束日期',
      name: 'gasEndTime',
      tableItem: {
        type: 'date',
      },
      formItem: {
        type: 'date',
      },
    },
    {
      title: '申报用气量',
      name: 'declareConsumption',
      tableItem: {},
      formItem: {},
    },
    {
      title: '批准用气量',
      name: 'ratifyConsumption',
      tableItem: {},
    },
    {
      title: '实际用气量',
      name: 'actualConsumption',
      tableItem: {},
    },
    {
      title: '提气速率(标方)',
      name: 'upliftRate',
      tableItem: {},
      formItem: {
        disabled:true
      },
    },

    {
      title: '申报人',
      name: 'createdName',
      // dict: organizationDict,
      tableItem: {},
    },
    {
      title: '申报状态',
      name: 'status',
      dict: moduleStatus,
      formItem: {
        type: 'select',
        dict: moduleStatus, // 取出数据字典的数据
        initialValue: moduleStatus.codeName,
      },
      tableItem: {
        render: (text, record) => {
          return `${record.statusStr}`
        },
      },
    },
    {
      title: '申报时间',
      name: 'createdOn',
      tableItem: {
        type: 'date',
      },
      formItem: {
       
      },
    },
    {
      title: '申报类型',
      name: 'declareType',
      dict: moduleList,
      tableItem: {
        render: (text, record) => {
          return <>{record.declareTypeStr}</>
        },
      },
      formItem: {
        type: 'select',
        dict: moduleList,
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
              // display={functionAuthority.indexOf('btnUpdate') > -1}
              tooltip="修改"
              onClick={(e) => self.handleEdit(record)}
            >
              <Icon type="edit" />
            </Button>

            <Button
              display={functionAuthority.indexOf('btnDetial') > -1}
              tooltip="查看详情"
              // onClick={(e) => self.handledetial(record)}
              onClick={(e) => self.handleDetails(record)}
            >
              <Icon type="detail" />
            </Button>
          </DataTable.Oper>
        ),
      },
    },
  ]
}

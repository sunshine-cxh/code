/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 11:36:24
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 17:03:08
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '报废单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '标题',
      name: 'title',
      tableItem: {},
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '申请日期',
      name: 'registerDate',
      tableItem: {},
    },
    {
      title: '涉及设备',
      name: 'name',
      tableItem: {
        render: (text, record) => {
          let arr = []
          if(record.equipmentDataList) {
            record.equipmentDataList.forEach(item=> {
              arr.push(item.name)
            })
          }
          
          return arr.join(',')
        },
      },
    },
    {
      title: '审核状态',
      name: 'isCommitDesc',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button
                tooltip="查看审批进度"
                type="text"
                style={{ color: 'rgba(52, 132, 254, 1)' }}
                onClick={() => {
                  self.handleCheck(record)
                }}
              >
                {record.isCommitDesc}
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
    
    {
      title: '操作',
      name: 'opereation',
      tableItem: {
        width: 150,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="详情" onClick={(e) => self.handleDetails(record)}>
                  <Icon type="detail" />
                </Button>
                {record.isCommitDesc === '未提交' ? (
                  <>
                    <Button tooltip="编辑" onClick={(e) => self.handleEdit(record)}>
                      <Icon type="edit" />
                    </Button>
                    <Button tooltip="删除" onClick={(e) => self.handleDelete(record)}>
                      <Icon type="delete" />
                    </Button>
                  </>
                ) : null}
              </>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}

export const createFormColumns = (self) => {
  const { treeData } = self.props.sell
  let statusList = [
    {
      codeName: '未提交',
      code: 0,
    },
    {
      codeName: '进行中',
      code: 1,
    },
    {
      codeName: '已完成',
      code: 2,
    },
    {
      codeName: '已取消',
      code: 3,
    },
    {
      codeName: '驳回',
      code: 4,
    },
  ]
  return [
    {
      title: '变卖单号',
      name: 'code',
      formItem: {
        type: 'input',
        allowClear: true,
      }
    },
    {
      title: '申请人',
      name: 'createdName',
      formItem: {
        type: 'input',
        allowClear: true,
      }
    },
    {
      title: '审批状态',
      name: 'isCommit',
      formItem: {
        type: 'select',
        dict: statusList,
        allowClear: true,
      },
    },

    {
      title: '申请时间',
      name: 'applyTime',
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
        allowClear: true,
      },
    },
  ]
}

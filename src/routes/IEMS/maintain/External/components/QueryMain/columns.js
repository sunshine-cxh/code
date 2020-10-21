/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-03 14:53:17
 */
import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  let types = {
    '0': '设备采购',
    '1': '备件耗材采购',
  }
  let colorTransfer = {}

  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '申请单号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '设备编号',
      name: 'devicedCode',
      tableItem: {},
    },
    {
      title: '外委单位',
      name: 'commissionDept',
      tableItem: {},
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '审批状态',
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
      title: '是否验收',
      name: 'acceptance',
      tableItem: {},
    },
    {
      title: '操作',
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
  let statuList = [
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
  let acceptList = [
    {
      codeName: '否',
      code: 0,
    },
    {
      codeName: '是',
      code: 1,
    },
  ]
  return [
    // {
    //   title: '所属公司',
    //   name: 'sn',
    //   tableItem: {},
    //   searchItem: {},
    //   formItem: {
    //     type: 'input',
    //     allowClear: true,
    //   },
    // },
    {
      title: '审批状态',
      name: 'auditStatus',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: statuList,
        allowClear: true,
      },
      searchItem: {},
    },
    {
      title: '是否验收',
      name: 'acceptance',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: acceptList,
        allowClear: true,
      },
      searchItem: {},
    },
    {
      title: '申请日期',
      name: 'createTime',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
        allowClear: true,
      },
    },
  ]
}

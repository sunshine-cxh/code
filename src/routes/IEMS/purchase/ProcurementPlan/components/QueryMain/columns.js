/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-22 11:30:34
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
      title: '计划单号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '标题',
      name: 'title',
      tableItem: {},
    },
    {
      title: '采购类型',
      name: 'type',
      tableItem: {
        render: (text, record) => <div>{types[record.type]} </div>,
      },
    },
    {
      title: '计划采购数量',
      name: 'num',
      tableItem: {},
    },
    {
      title: '计划金额',
      name: 'amountMoney',
      tableItem: {},
    },
    {
      title: '创建日期',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '创建人',
      name: 'createdName',
      tableItem: {},
    },
    // {
    //   title: '当前节点',
    //   name: 'nodeName',
    //   tableItem: {
    //     render: (text, record) => (
    //       <EditableOper>
    //         {form =>
    //           (
    //           <Button tooltip="查看审批进度" type='text' style={{color: 'rgba(52, 132, 254, 1)'}} onClick={
    //             ()=> {
    //               self.handleCheck(record)
    //             }
    //           }>{record.nodeName}</Button>
    //           )
    //         }
    //       </EditableOper>
    //     )
    //   },
    // },
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
        // render: (text, record) => (
        //   <div>
        //     {
        //       record.isCommitDesc === '进行中' ?
        //     <div style={{color: 'rgb(52, 132, 254)'}}> {record.isCommitDesc}</div>
        //       : <div style={{color: '#25d72a'}}>{record.isCommitDesc} </div>
        //     }

        //   </div>
        // )
      },
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
                <Button
                  tooltip="详情"
                  onClick={(e) => self.handleDetails(record)}
                >
                  <Icon type="detail" />
                </Button>
                {record.isCommitDesc === '未提交' ? (
                  <>
                    <Button
                      tooltip="编辑"
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
  return [
    {
      title: '计划单号',
      name: 'sn',
      tableItem: {},
      searchItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '标题',
      name: 'title',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
      searchItem: {},
    },
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
      title: '创建日期',
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

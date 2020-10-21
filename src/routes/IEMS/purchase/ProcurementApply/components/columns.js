/*
 * @Descripttion : procurementApply 表单  table  列数据 columns data
 * @Author       : 贺子华
 * @Date         : 2020-04-14 14:45:25
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-22 11:31:12
 * @FilePath     : \ilng-shuaizhen-admin\src\routes\SubEquipment\Equipment\ProcurementApply\components\columns.js
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  return [
    {
      title: 'ID',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '申请单号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '申请时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      title: '采购标题',
      name: 'title',
      tableItem: {},
    },
    {
      title: '申请人',
      name: 'createdName',
      tableItem: {},
    },
    {
      title: '申请类型',
      name: 'type',
      tableItem: {
        render: (text, record) => {
          if (record.type === '1') {
            return '备件耗材'
          } else if (record.type === '0') {
            return '设备'
          } else {
            return null
          }
        },
      },
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入品牌名称',
          },
        ],
      },
      searchItem: {},
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
    //   }
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
      name: 'opereation',
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
  let types = [
    {
      codeName: '设备采购',
      code: '0',
    },
    {
      codeName: '备件耗材采购',
      code: '1',
    },
  ]
  return [
    {
      title: '申请单号',
      name: 'sn',
      tableItem: {},
      searchItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '采购标题',
      name: 'title',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
      searchItem: {},
    },
    {
      title: '申请类型',
      name: 'type',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: types,
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
      title: '申请时间',
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

/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:56:28
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-10 15:42:54
 */
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'
import Format from 'utils/format'

function convertStandard(fileSize) {
  if (fileSize < 1024 * 1024) {
    let newStandard = (fileSize / 1024).toFixed(2)
    return newStandard + ' KB'
  } else if (fileSize > 1024 * 1024) {
    let newStandard = (fileSize / (1024 * 1024)).toFixed(2)
    return newStandard + ' MB'
  }
}
export const createOrderColumns = (self) => {
  let {
    recipientsDetail: { details },
  } = self.props
  return [
    {
      title: '设备编号',
      name: 'sn',
      tableItem: {},
    },
    {
      title: '设备名称',
      name: `name`,
      tableItem: {},
    },
    {
      title: '设备所属',
      name: 'owner',
      tableItem: {},
    },
    {
      title: '规格型号',
      name: 'modelCn',
      tableItem: {},
    },
    {
      title: '状态',
      name: 'statusDesc',
      tableItem: {},
    },
    {
      title: '预计归还日期',
      name: 'dueTime',
      tableItem: {},
    },
    {
      title: '是否归还',
      name: 'collarStatusDesc',
      tableItem: {},
    },
    {
      title: '归还日期',
      name: 'actuallyTime',
      tableItem: {},
    }
  ]
}

export const createFileColumns = (self) => {
  return [
    {
      title: '文件名称',
      name: 'fileName',
      tableItem: {
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <Button
                tooltip="下载"
                type="text"
                style={{ color: 'rgba(52, 132, 254, 1)' }}
                onClick={() => {
                  self.handleDownload(record)
                }}
              >
                {record.fileName}
              </Button>
            )}
          </EditableOper>
        ),
      },
    },
    {
      title: '文件大小',
      name: 'fileSize',
      tableItem: {
        render: (text, record) => {
          return (
            <>
              <span>{convertStandard(record.fileSize)}</span>
            </>
          )
        },
      },
    },
    {
      title: '上传时间',
      name: 'createdOn',
      tableItem: {},
    },
  ]
}

export const baseInfoColumns = (self) => {
  let {
    recipientsDetail: { allUserList, organizationTree },
  } = self.props
  return [
    {
      title: '申请人',
      name: 'createdName',
    },
    {
      title: '领用日期',
      name: 'leadtime',
    },
    {
      title: '领用单号',
      name: 'code',
    },
    {
      title: '标题',
      name: 'title',
    },
    {
      title: '领用部门',
      name: 'depart',
      render: (text, record) => {
        let result = ''
        if(record.depart){
          result = Format.getNameById(organizationTree, record.depart, 'value')
        }
        return result && result.title
      },
    },
    {
      title: '领用人',
      name: 'user',
      render: (text, record) => {
        let result = ''
        allUserList.forEach((item) => {
          if (item.code === record.user) {
            result = item.codeName
          }
        })
        return result
      },
    },
    {
      title: '备注',
      name: 'remark',
    },
  ]
}

export const createCheckColumns = (self) => {
  return [
    {
      title: '审批人',
      name: 'auditorName',
      tableItem: {},
    },
    {
      title: '审批时间',
      name: 'createdOn',
      tableItem: {},
    },
    {
      //TODO ---分类名称才对
      title: '审批意见',
      name: 'description',
      tableItem: {},
    },
    {
      //TODO ---分类名称才对
      title: '审批结果',
      name: 'resultAction',
      tableItem: {},
    },
  ]
}

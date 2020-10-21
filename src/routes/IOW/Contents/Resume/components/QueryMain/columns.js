/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-03 15:37:22
 */
import React from 'react'
import { Tag } from 'antd'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  let educationTypes = {
    '10': '博士以上',
    '20': '博士',
    '30': '硕士',
    '40': '本科',
    '50': '大专',
    '60': '高中',
    '70': '高中以下',
  }
  let approvalTypes = {
    '0': '未发布',
    '1': '已发布',
  }
  let Types = {
    '0': '否',
    '1': '是',
  }
  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    {
      title: '职位标题',
      name: 'title',
      tableItem: {},
    },
    {
      title: '应聘者姓名',
      name: 'name',
      tableItem: {},
    },
    {
      title: '电话',
      name: 'phone',
      tableItem: {},
    },
    {
      title: '学历',
      name: 'education',
      tableItem: {
        render: (text, record) => <div>{educationTypes[record.education]} </div>,
      },
    },
    {
      title: '应聘时间',
      name: 'createdOn',
      tableItem: {},
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
                  tooltip="下载"
                  onClick={(e) => self.handleDownload(record)}
                >
                  <Icon type="download" />
                </Button>
              </>
            )}
          </EditableOper>
        ),
      },
    },
  ]
}

export const createFormColumns = (self) => {
  let educationType = [
    {
      codeName: '博士以上',
      code: '10',
    },
    {
      codeName: '博士',
      code: '20',
    },
    {
      codeName: '硕士',
      code: '30',
    },
    {
      codeName: '本科',
      code: '40',
    },
    {
      codeName: '大专',
      code: '50',
    },
    {
      codeName: '高中',
      code: '60',
    },
    {
      codeName: '高中以下',
      code: '70',
    },
  ]
  let isApproval = [
    {
      codeName: '否',
      code: 0,
    },
    {
      codeName: '是',
      code: 1,
    },
  ]
  let isDisplay = [
    {
      codeName: '否',
      code: 0,
    },
    {
      codeName: '是',
      code: 1,
    },
  ]
  let isPublic = [
    {
      codeName: '未发布',
      code: 0,
    },
    {
      codeName: '已发布',
      code: 1,
    },
  ]
  return [
    {
      title: '内容类型',
      name: 'education',
      tableItem: {},
      searchItem: {},
      formItem: {
        type: 'select',
        dict: educationType,
      },
    },
    {
      title: '标题',
      name: 'title',
      tableItem: {},
      formItem: {
        type: 'input',
      },
      searchItem: {},
    },
    {
      title: '公开',
      name: 'isApproval',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: isApproval,
      },
      searchItem: {},
    },
    {
      title: '首页显示',
      name: 'isDisplay',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: isDisplay,
      },
      searchItem: {},
    },
    {
      title: '状态',
      name: 'isPublic',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: isPublic,
      },
      searchItem: {},
    },
    {
      title: '发布时间',
      name: 'createTime',
      tableItem: {},
      formItem: {
        type: 'date~',
        format: 'YYYY-MM-DD',
      },
    },
  ]
}

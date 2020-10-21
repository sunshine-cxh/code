/*
 * @Descripttion : columns data
 * @Author       : hezihua
 * @Date         : 2020-05-11 14:24:59
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 15:11:48
 */

import React from 'react'
import { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self) => {
  let cycleObj = {
    '1': '天',
    '2': '月',
    '3': '年',
  }
  return [
    {
      title: '序号',
      name: 'id',
      formItem: {
        type: 'hidden',
      },
    },
    // {
    //   title: '图片',
    //   name: 'image',
    //   tableItem: {},
    // },
    {
      title: '编号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '名称',
      name: 'name',
      tableItem: {},
    },
    {
      title: '预警值',
      name: 'warningValue',
      tableItem: {
        render: (text, record) => `${record.warningValueLow} - ${record.warningValueHigh}`,
      },
    },
    {
      title: '采购周期',
      name: 'cycle',
      tableItem: {
        render: (text, record) => cycleObj[record.cycle],
      },
    },
    {
      title: '品牌',
      name: 'brandDesc',
      tableItem: {},
    },
    {
      title: '分类',
      name: 'categoryDesc',
      tableItem: {},
    },
    {
      title: '规格',
      name: 'standard',
      tableItem: {},
    },
    {
      title: '单位',
      name: 'unitDesc',
      tableItem: {},
    },
    {
      title: '单价',
      name: 'price',
      tableItem: {},
    },
    {
      title: '标签码',
      name: 'lableCode',
      tableItem: {},
    },
    {
      title: '操作',
      tableItem: {
        width: 100,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) => (
              <>
                <Button tooltip="编辑" onClick={(e) => self.handleEdit(record)}>
                  <Icon type="edit" />
                </Button>
                <Button tooltip="删除" onClick={(e) => self.handleDelete(record)}>
                  <Icon type="delete" />
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
  let { brandList } = self.props.basicData
  let statuList = [
    {
      codeName: '进行中',
      code: 0,
    },
    {
      codeName: '已结束',
      code: 1,
    },
  ]
  return [
    {
      title: '部件编号',
      name: 'code',
      tableItem: {},
      searchItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
    },
    {
      title: '部件名称',
      name: 'name',
      tableItem: {},
      formItem: {
        type: 'input',
        allowClear: true,
      },
      searchItem: {},
    },
    {
      title: '部件品牌',
      name: 'brandId',
      tableItem: {},
      formItem: {
        type: 'select',
        dict: brandList,
        allowClear: true,
      },
      searchItem: {},
    },
    {
      title: '部件规格',
      name: 'standard',
      tableItem: {},
      formItem: {
        allowClear: true,
      },
    },
  ]
}

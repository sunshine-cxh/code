/*
 * @Descripttion : 报修工单新增页的表头配置文件
 * @Author       : caojiarong
 * @Date         : 2020-06-17 09:11:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 16:02:24
 */ 
import React from 'react'

import Icon from 'components/Icon'
import Button from 'components/Button'
import { EditableOper } from 'components/DataTable'

export const createColumnsProduct = (self, expand) => {
  return [
    {
      title: '设备编号',
      name: 'code',
      tableItem: {}
    },
    {
      title: '设备名称',
      name: `name`,
      tableItem: {}
    },
    {
      title: '设备品牌',
      name: 'brandName',
      tableItem: {}
    },
    {
      title: '设备型号',
      name: 'modelCn',
      tableItem: {}
    },
    {
      title: '存放地点',
      name: 'locationtreeId',
      tableItem: {}
    }
  ]
}


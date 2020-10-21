/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 17:36:39
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-11 11:52:43
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import { baseInfoColumns } from './columns'
import Descripttion from 'components/Descriptions'
import Input from 'components/Input'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

@connect(({ inventoryOperat, loading }) => ({
  inventoryOperat,
  loading: loading.models.inventoryOperat,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      inventoryOperat: { details },
    } = this.props
    let baseCloumns = baseInfoColumns(this)
    // 基本信息的表格
    let baseInfoForm = {
      columns: baseCloumns,
      dataItems: details,
      title: '基本信息',
    }
    return <Descripttion {...baseInfoForm} className="base-info-content" />
  }
}

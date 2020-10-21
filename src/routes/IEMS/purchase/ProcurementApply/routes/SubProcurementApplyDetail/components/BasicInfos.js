/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:25:37
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-10 16:22:47
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

@connect(({ procurementApplyDetail, loading, procurementapply }) => ({
  procurementApplyDetail,
  loading: loading.models.procurementApplyDetail,
  procurementapply,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      procurementApplyDetail: { details },
    } = this.props
    let typeTransfer = {
      '0': '设备',
      '1': '备件耗材',
    }
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

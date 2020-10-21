/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:25:37
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-04 11:36:50
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { baseInfoColumns } from './columns'
import Descripttion from 'components/Descriptions'

@connect(({ inventoryDetail, loading }) => ({
  inventoryDetail,
  loading: loading.models.inventoryDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      inventoryDetail: { details },
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

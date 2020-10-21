/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 11:25:37
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-03 09:36:44
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { baseInfoColumns1 } from './columns'
import Descripttion from 'components/Descriptions'


@connect(({ externalDetail, loading }) => ({
  externalDetail,
  loading: loading.models.externalDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      externalDetail: { details },
    } = this.props
    let baseCloumns = baseInfoColumns1(this)
    // 基本信息的表格
    let baseInfoForm = {
      columns: baseCloumns,
      dataItems: details,
      title: '验收信息',
    }
    return <Descripttion {...baseInfoForm} className="base-info-content" />
  }
}

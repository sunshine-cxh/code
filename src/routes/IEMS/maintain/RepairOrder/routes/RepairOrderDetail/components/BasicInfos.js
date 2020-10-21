/*
 * @Descripttion : 报修工单详情页
 * @Author       : caojiarong
 * @Date         : 2020-06-08 15:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-28 14:13:27
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils';
import {baseInfoColumns} from './columns'
import Descripttion from 'components/Descriptions'

@connect(({ repairOrderDetail, loading }) => ({
  repairOrderDetail,
  loading: loading.models.repairOrderDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { repairOrderDetail: { details } } = this.props
    let baseCloumns = baseInfoColumns(this)
    // 基本信息的表格
    let baseInfoForm = {
      columns:baseCloumns,
      dataItems: details,
      title: '基本信息',
    }
    return (
      <Descripttion {...baseInfoForm} className='base-info-content' />
    )
  }
}

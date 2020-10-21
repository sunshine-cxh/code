/*
 * @Descripttion : 库存台账详情页
 * @Author       : caojiarong
 * @Date         : 2020-05-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-24 18:02:17
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils'
import {baseInfoColumns} from './columns'
import qs from 'query-string';
import Descripttion from 'components/Descriptions'
@connect(({ inventoryLedgerDetail, loading }) => ({
  inventoryLedgerDetail,
  loading: loading.models.inventoryLedgerDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  

  render() {
    const { inventoryLedgerDetail: { details } } = this.props
    let baseInfo = details.warehouseWarningAccounts || {}
    let baseCloumns = baseInfoColumns(this)
    // 基本信息的表格
    let baseInfoForm = {
      columns:baseCloumns,
      dataItems: baseInfo,
      title: '基本信息'      // <span style={{color:'red'}}>基本信息</span>
    }
    return (
      <Descripttion {...baseInfoForm} className='base-info-content' />
    )
  }
}

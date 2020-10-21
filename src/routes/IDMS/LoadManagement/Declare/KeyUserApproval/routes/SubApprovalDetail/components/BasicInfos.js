/*
 * @Descripttion : 详情页基本信息
 * @Author       : caojiarong
 * @Date         : 2020-08--25 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-02 14:43:19
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import '../style/index.less'
import BaseComponent from 'components/BaseComponent'
import Descriptions from 'components/Descriptions'
import {baseInfoColumns} from './columns'
@connect(({ subApprovalDetail, loading }) => ({
  subApprovalDetail,
  loading: loading.models.subApprovalDetail,
}))
export default class BasicInfos extends BaseComponent {
  render() {
    let { subApprovalDetail:{details} } = this.props
    let baseCloumns = baseInfoColumns(this)
    let baseInfoForm = {
      columns:baseCloumns,
      dataItems: details,
      title: '基本信息',
    }
    return (
      <Descriptions {...baseInfoForm} className='base-info-content' />
    )
  }
}


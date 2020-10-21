/*
 * @Descripttion : 详情页基本信息
 * @Author       : caojiarong
 * @Date         : 2020-08-18 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-19 17:14:34
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import '../style/index.less'
import BaseComponent from 'components/BaseComponent'
import Descriptions from 'components/Descriptions'
import {baseInfoColumns} from './columns'
@connect(({ subLineDetail, loading }) => ({
  subLineDetail,
  loading: loading.models.subLineDetail,
}))
export default class BasicInfos extends BaseComponent {
  render() {
    let { subLineDetail:{details} } = this.props
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


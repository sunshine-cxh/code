/*
 * @Descripttion : 养护计划详情页
 * @Author       : hezihua
 * @Date         : 2020-06-08 15:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 11:04:00
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils';
import {baseInfoColumns} from './columns'
import Descripttion from 'components/Descriptions'

@connect(({ curingsPlanDetail, loading }) => ({
  curingsPlanDetail,
  loading: loading.models.curingsPlanDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { curingsPlanDetail: { details } } = this.props
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

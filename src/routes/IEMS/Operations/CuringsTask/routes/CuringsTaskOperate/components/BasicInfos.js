/*
 * @Descripttion : 养护计划详情页
 * @Author       : hezihua
 * @Date         : 2020-06-08 15:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-28 11:53:07
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils';
import { createBasicinfoColumns } from './columns'
import Descripttion from 'components/Descriptions'

@connect(({ curingsTaskOperate, loading }) => ({
  curingsTaskOperate,
  loading: loading.models.curingsTaskOperate,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { curingsTaskOperate: { details } } = this.props
    let baseCloumns = createBasicinfoColumns(this)
    // 基本信息的表格
    let baseInfoForm = {
      columns: baseCloumns,
      dataItems: details,
      title: '任务信息',
    }
    return (
      <Descripttion {...baseInfoForm} className='base-info-content' />
    )
  }
}

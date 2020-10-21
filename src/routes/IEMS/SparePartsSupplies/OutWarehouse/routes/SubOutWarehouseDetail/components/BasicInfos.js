/*
 * @Descripttion : 入库库管理详情页
 * @Author       : caojiarong
 * @Date         : 2020-05-14 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-28 09:08:28
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils';

import { Form } from 'antd'
import {baseInfoColumns} from './columns'
import Descriptions from 'components/Descriptions'


const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}


@connect(({ outWarehouseDetail, loading }) => ({
  outWarehouseDetail,
  loading: loading.models.outWarehouseDetail,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
  }

  

  render() {
    const { outWarehouseDetail: { details } } = this.props
    let baseCloumns = baseInfoColumns(this)
    // 基本信息的表格
    let baseInfoForm = {
      columns:baseCloumns,
      dataItems: details,
      title: '基本信息',
    }
    return (
      <Descriptions  {...baseInfoForm} className='base-info-content' />
    )
  }
}

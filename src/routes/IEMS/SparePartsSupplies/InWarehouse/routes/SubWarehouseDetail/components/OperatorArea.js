/*
 * @Descripttion : 入库管理详情页清单
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-24 16:31:50
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import {createColumnsApp} from './columns'


@connect(({ inWarehouseDetail, loading }) => ({
  inWarehouseDetail,
  loading: loading.models.inWarehouseDetail
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: null,
    visible: false,
    fileLoading: false
  }
  
  render() {
    let { inWarehouseDetail, loading } = this.props
    let { details,pageData } = inWarehouseDetail
    pageData.list = details.detailList
    let columnsApp = createColumnsApp(this, this.state, this.props) 
    
    const dataTableProps = {
      loading,
      pagination:false,
      showNum: false,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: pageData,
    }
    return (
      <section className="block-wrap">
        {/* 入库明细单 */}
        <div className="header">
          <span className='title'>入库明细单</span>
        </div>
        <DataTable {...dataTableProps} />
      </section>
    )
  }
}

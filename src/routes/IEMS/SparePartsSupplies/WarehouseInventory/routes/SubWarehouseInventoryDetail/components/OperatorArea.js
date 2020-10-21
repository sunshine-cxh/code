/*
 * @Descripttion : 仓库盘点详情页清单
 * @Author       : caojiarong
 * @Date         : 2020-05-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 16:11:00
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import {createColumnsApp} from './columns'


@connect(({ warehouseInventoryDetail, loading }) => ({
  warehouseInventoryDetail,
  loading: loading.models.warehouseInventoryDetail
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
    let { warehouseInventoryDetail, loading } = this.props
    let { details,pageData } = warehouseInventoryDetail
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
      <div className="header">
        <span className="title">盘点信息</span>
      </div>
          <DataTable {...dataTableProps} />
      </section>
    )
  }
}

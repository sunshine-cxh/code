/*
 * @Descripttion : 库存台账详情页清单
 * @Author       : caojiarong
 * @Date         : 2020-05-28 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-12 16:35:10
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import {recordColumns, replaceColumns, deviceColumns} from './columns'


@connect(({ inventoryLedgerDetail, loading }) => ({
  inventoryLedgerDetail,
  loading: loading.models.inventoryLedgerDetail
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
    let { inventoryLedgerDetail, loading } = this.props
    let { details,pageData,replaceData,deviceData } = inventoryLedgerDetail
    pageData.list = details.warehouseWarningStockOutLists ? details.warehouseWarningStockOutLists.warehouseWarningStockOuts : []
    replaceData.list = details.warehouseWarningReplaceLists ? details.warehouseWarningReplaceLists.warehouseWarningReplaces : []
    deviceData.list = details.detailList
    let replaceDataColumns = replaceColumns(this, this.state, this.props) 
    const replaceTableProps = {
      loading,
      pagination:false,
      showNum: true,
      columns: replaceDataColumns,
      rowKey: 'id', 
      dataItems: replaceData,
    }
    return (
      <section className="block-wrap">
        {/* 更换记录 */}
        <div className="header">
          <span className='title'>更换记录</span>
        </div>
        <DataTable {...replaceTableProps} />
      </section>
    )
  }
}
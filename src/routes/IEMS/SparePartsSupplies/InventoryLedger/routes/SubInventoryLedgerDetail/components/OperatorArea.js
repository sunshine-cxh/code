/*
 * @Descripttion : 库存台账详情页清单
 * @Author       : caojiarong
 * @Date         : 2020-05-28 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-12 16:26:45
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {recordColumns} from './columns'

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
    let columnsApp = recordColumns(this, this.state, this.props) 
    
    const dataTableProps = {
      loading,
      pagination:false,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: pageData,
    }

    return (
      <section className="block-wrap">
        {/* 出入库记录 */}
        <div className="header">
          <span className='title'>出入库记录</span>
        </div>
        <DataTable {...dataTableProps} />
      </section>
    )
  }
}

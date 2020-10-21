/*
 * @Descripttion : 入库管理详情页清单
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-30 15:31:06
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import {createColumnsApp, createColumnsFile} from './columns'
// import Tooltip from 'components/Tooltip'
// import Icon from 'components/Icon'


@connect(({ outWarehouseDetail, loading }) => ({
  outWarehouseDetail,
  loading: loading.models.outWarehouseDetail
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
  handleDownload=(record)=>{
    window.open(record.filePath)
  }
  
  render() {
    let { outWarehouseDetail, loading } = this.props
    let { details,pageData,filePageData } = outWarehouseDetail
    let { fileLoading } = this.state
    pageData.list = details.detailList
    filePageData.list = details.attachmentList
    let columnsApp = createColumnsApp(this, this.state, this.props) 
    let columnsFile = createColumnsFile(this, this.state)

    const dataTableProps = {
      loading,
      pagination:false,
      showNum: false,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: pageData,
    }

    const fileDataTableProps = {
      loading: fileLoading,
      showNum: true,
      columns: columnsFile,
      rowKey: 'id',
      dataItems: filePageData,
      showNum: false
    }

    return (
      <section className="block-wrap">
        {/* 入库明细单 */}
        <div className="header">
          <span className='title'>出库明细单</span>
        </div>
        <DataTable {...dataTableProps} />
      </section>
    )
  }
}

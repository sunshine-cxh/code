/*
 * @Descripttion : 入库管理详情页清单
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:56:55
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {createColumnsApp, createColumnsFile} from './columns'


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
    let { outWarehouseDetail } = this.props
    let { details,pageData,filePageData } = outWarehouseDetail
    let { fileLoading } = this.state
    pageData.list = details.detailList
    filePageData.list = details.attachmentList
    let columnsFile = createColumnsFile(this, this.state)

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
        <div className="header">
          <span className='title'>相关附件</span>
        </div>
        <DataTable {...fileDataTableProps}></DataTable>
      </section>
    )
  }
}

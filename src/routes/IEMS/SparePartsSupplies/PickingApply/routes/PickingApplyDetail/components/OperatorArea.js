/*
 * @Descripttion : 入库管理详情页清单
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-15 17:10:20
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import {createColumnsApp, createColumnsFile} from './columns'
// import Tooltip from 'components/Tooltip'
// import Icon from 'components/Icon'


@connect(({ pickingApplyDetail, loading }) => ({
  pickingApplyDetail,
  loading: loading.models.pickingApplyDetail
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
    let { pickingApplyDetail, loading } = this.props
    let { details,pageData,filePageData } = pickingApplyDetail
    let { fileLoading } = this.state
    pageData.list = details.purchaseDataList
    filePageData.list= details.fileDataList
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
        <div className="header">
          <span className="title">领料信息</span>
        </div>
        <DataTable {...dataTableProps} />
      </section>
    )
  }
}

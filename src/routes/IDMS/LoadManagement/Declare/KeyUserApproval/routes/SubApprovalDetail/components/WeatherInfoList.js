/*
 * @Descripttion : 重点用户审批页
 * @Author       : caojiarong
 * @Date         : 2020-08-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-02 14:51:33
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {weatherInfoColumns} from './columns'

@connect(({ subApprovalDetail, loading }) => ({
  subApprovalDetail,
  loading: loading.models.subApprovalDetail
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
    let { subApprovalDetail, loading } = this.props
    let { weatherPageData, details } = subApprovalDetail
    weatherPageData.list = details.weatherList
    let columnsApp = weatherInfoColumns(this)
    
    const dataTableProps = {
      loading,
      pagination:false,
      showNum: false,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: weatherPageData,
    }
    return (
      <section className="block-wrap">
        <div className="header">
          <span className='title'>气象信息</span>
        </div>
        <DataTable {...dataTableProps} />
      </section>
    )
  }
}

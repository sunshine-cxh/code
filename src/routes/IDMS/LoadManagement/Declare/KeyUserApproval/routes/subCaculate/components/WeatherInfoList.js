/*
 * @Descripttion : 重点用户审批页
 * @Author       : caojiarong
 * @Date         : 2020-08-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-28 16:17:24
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {weatherInfoColumns} from './columns'

@connect(({ subCaculate, loading }) => ({
  subCaculate,
  loading: loading.models.subCaculate
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
    let { subCaculate, loading } = this.props
    let { weatherPageData } = subCaculate
    // weatherPageData.list = weatherPageData.detailList
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

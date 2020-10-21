/*
 * @Descripttion : 管段信息列表
 * @Author       : caojiarong
 * @Date         : 2020-08-18 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-18 10:47:29
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import {lineInfoColumns} from './columns'


@connect(({ subLineAdd, loading }) => ({
  subLineAdd,
  loading: loading.models.subLineAdd
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
    let { subLineAdd, loading } = this.props
    let { linePageData } = subLineAdd
    // lineInfoData.list = details.detailList
    let columnsApp = lineInfoColumns(this)
    
    const dataTableProps = {
      loading,
      pagination:false,
      showNum: false,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: linePageData,
    }
    return (
      <section className="block-wrap">
        <div className="header">
          <span className='title'>管段信息</span>
        </div>
        <DataTable {...dataTableProps} />
      </section>
    )
  }
}

/*
 * @Descripttion : 合同附件列表
 * @Author       : caojiarong
 * @Date         : 2020-09-01 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-01 16:03:16
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import {FileInfoColumns} from './columns'


@connect(({ subPlanAdd, loading }) => ({
  subPlanAdd,
  loading: loading.models.subPlanAdd
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
    let { subPlanAdd, loading } = this.props
    let { linePageData } = subPlanAdd
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

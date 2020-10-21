/*
 * @Descripttion : 巡检计划详情页
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-23 17:39:04
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {createColumnsFree} from './columns'


@connect(({ repairOrderDetail, loading }) => ({
  repairOrderDetail,
  loading: loading.models.repairOrderDetail
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
    let { repairOrderDetail, loading } = this.props
    let { details,pageData, itemList } = repairOrderDetail
    pageData.list = details.repairFeeList || []
    // itemList.list = details.standardItemList || []
    let columnsApp = createColumnsFree(this, this.state, this.props) 

    const dataTableFree = {
      loading,
      pagination:false,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: pageData,
    }


    return (
      <section className="block-wrap">
        {/* 维修费用 */}
        <div className="header">
          <span className='title'>维修费用</span>
        </div>
        <DataTable {...dataTableFree} />
      </section>
    )
  }
}

/*
 * @Descripttion : 巡检计划详情页
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-30 11:59:04
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import { createColumnsApp } from './columns'


@connect(({ patrolPlanDetail, loading }) => ({
  patrolPlanDetail,
  loading: loading.models.patrolPlanDetail
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
    let { patrolPlanDetail, loading } = this.props
    let { details, pageData } = patrolPlanDetail
    pageData.list = details.responseInfos && details.responseInfos[0] ? details.responseInfos : []
    // itemList.list = details.standardItemList || []
    let columnsApp = createColumnsApp(this, this.state, this.props)

    const dataTableDevices = {
      loading,
      pagination: false,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: pageData,
    }


    return (
      <section className="block-wrap">
        {/* 责任人 */}
        <div className="header">
          <span className='title'>责任人</span>
        </div>
        <DataTable {...dataTableDevices} />
      </section>

    )
  }
}

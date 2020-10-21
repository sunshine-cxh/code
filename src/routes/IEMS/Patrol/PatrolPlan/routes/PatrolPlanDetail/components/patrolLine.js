/*
 * @Descripttion : 巡检计划详情页
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-30 11:59:31
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {createColumnsPatrolLine} from './columns'


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
    let { details,pageData, itemList } = patrolPlanDetail
    pageData.list = details.patrolPlanLines && details.patrolPlanLines[0] ? details.patrolPlanLines : []
    // itemList.list = details.standardItemList || []
    let columnsItems = createColumnsPatrolLine(this, this.state)


    // 点检明细列表
    const standardItemProps = {
      loading,
      pagination: false,
      showNum: true,
      columns: columnsItems,
      rowKey: 'id',
      dataItems: itemList
    }

    return (
      <section className="block-wrap">
        <div className="header">
          <span className='title'>巡检路线</span>
        </div>
        <DataTable {...standardItemProps} />
      </section>
    )
  }
}

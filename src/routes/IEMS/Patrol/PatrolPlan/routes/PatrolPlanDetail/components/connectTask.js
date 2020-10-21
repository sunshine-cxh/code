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
import { createColumnsTask } from './columns'
import { routerRedux } from 'dva/router'
import { routesPrefix } from '../../../../../config.js'


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
  handleDetail = (record)=> {
    let { dispatch } = this.props
    dispatch(routerRedux.push({
      pathname: `${routesPrefix}/patrolTask/subPatrolTaskDetail`,
      search: `id=${record.id}`
    }))
  }
  render() {
    let { patrolPlanDetail, loading } = this.props
    let { connectTaskData } = patrolPlanDetail
    let columnsItems = createColumnsTask(this, this.state)


    // 点检明细列表
    const standardItemProps = {
      loading,
      pagination: false,
      showNum: true,
      columns: columnsItems,
      rowKey: 'id',
      dataItems: connectTaskData
    }

    return (
      <section className="block-wrap">
        <div className="header">
          <span className='title'>关联任务</span>
        </div>
        <DataTable {...standardItemProps} />
      </section>
    )
  }
}

/*
 * @Descripttion : 管段信息列表
 * @Author       : caojiarong
 * @Date         : 2020-08-18 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-19 17:18:07
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routePrefix } from '../../../../../config'
import { routerRedux } from 'dva/router'
import DataTable, { Editable } from 'components/DataTable'
import {lineInfoColumns} from './columns'


@connect(({ subLineDetail, loading }) => ({
  subLineDetail,
  loading: loading.models.subLineDetail
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

  // 详情页跳转
  handleDetails=(record)=>{
    const { dispatch } = this.props
    dispatch(routerRedux.push({
      pathname: `${routePrefix}/spectionPointMange`,
      search: `code=${record.code}`,
    }))
  }
  
  render() {
    let { subLineDetail, loading } = this.props
    let { linePageData,details } = subLineDetail
    linePageData.list = details.pointList
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

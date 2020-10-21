/*
 * @Descripttion : 文件信息列表
 * @Author       : caojiarong
 * @Date         : 2020-08--25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-26 10:16:24
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routePrefix } from '../../../../../config'
import { routerRedux } from 'dva/router'
import DataTable from 'components/DataTable'
import {fileInfoColumns} from './columns'


@connect(({ subModelDetail, loading }) => ({
  subModelDetail,
  loading: loading.models.subModelDetail
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
    let { subModelDetail, loading } = this.props
    let { linePageData,details } = subModelDetail
    linePageData.list = details.pointList
    let columnsApp = fileInfoColumns(this)
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
          <span className='title'>模型仓附件</span>
        </div>
        <DataTable {...dataTableProps} />
      </section>
    )
  }
}

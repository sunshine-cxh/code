/*
 * @Descripttion : 管段信息列表
 * @Author       : caojiarong
 * @Date         : 2020-08-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-04 08:51:39
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import {FileInfoColumns} from './columns'


@connect(({ subModelAdd, loading }) => ({
  subModelAdd,
  loading: loading.models.subModelAdd
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
    let { subModelAdd, loading } = this.props
    let { filePageData, details } = subModelAdd
    if(filePageData.list.length==0 && details.attachment){
      filePageData.list.push(details.attachment)
    }
    let columnsApp = lineInfoColumns(this)
    
    const dataTableProps = {
      loading,
      pagination:false,
      showNum: false,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: filePageData,
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
 
/*
 * @Descripttion : 领料申请页附件清单
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-15 14:29:08
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {createColumnsFile} from './columns'
// import Tooltip from 'components/Tooltip'
// import Icon from 'components/Icon'


@connect(({ pickingApplyDetail, loading }) => ({
  pickingApplyDetail,
  loading: loading.models.pickingApplyDetail
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
    let { pickingApplyDetail, loading } = this.props
    let { details,pageData,filePageData } = pickingApplyDetail
    let { fileLoading } = this.state
    pageData.list = details.purchaseDataList
    filePageData.list= details.fileDataList
    let columnsFile = createColumnsFile(this, this.state)

    const fileDataTableProps = {
      loading: fileLoading,
      showNum: true,
      columns: columnsFile,
      rowKey: 'id',
      dataItems: filePageData,
      showNum: false
    }

    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">相关附件</span>
        </div>
        <DataTable {...fileDataTableProps}></DataTable>
      </section>
    )
  }
}

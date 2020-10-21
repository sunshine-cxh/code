/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-19 14:05:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 16:39:24
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import DataTable, { Editable } from 'components/DataTable'
import { createChildColumns } from './columns'
import ChildAddLayout from './ChildAddLayout'
import { Modal } from 'components/Modal'
import $$ from 'cmn-utils'

@connect(({ standingBookAdd, loading, standingBook }) => ({
  standingBookAdd,
  loading: loading.models.standingBookAdd,
  standingBook,
}))
export default class extends Component {
  state = {
    visible: false,
  }
  handleSelect = () => {
    let {
      dispatch,
      standingBookAdd: { childAddPageData },
    } = this.props
    dispatch({
      type: 'standingBookAdd/getChildPageInfo',
      payload: {
        childAddPageData: childAddPageData.startPage(),
      },
    })
    this.onChangeVisible(true)
    // this.setState({
    //   ...this.state,
    //   visible: true
    // })
  }
  deleteFn = (record) => {
    let {
      standingBookAdd: { childRow, childRowKeys, childPageData },
      dispatch,
    } = this.props
    // 删除keys
    let index = childRowKeys.indexOf(record.id)
    if (index >= 0) {
      childRowKeys.splice(index, 1)
    }
    // 删除row
    childRow = childRow.filter((item) => {
      return item.id !== record.id
    })
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        childRow,
        childRowKeys,
      },
    })
    // 删除列表中的当前值
    childPageData.list.splice(record.index, 1)
    childPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        childPageData,
      },
    })
  }
  handleDelete = (record) => {
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        this.deleteFn(record)
      },
      onCancel() {},
    })
  }
  onChangeVisible = (visible) => {
    this.setState({
      ...this.state,
      visible,
    })
  }
  render() {
    let { dispatch, standingBookAdd, loading } = this.props
    let { childPageData } = standingBookAdd
    let { visible } = this.state
    let childColumns = createChildColumns(this)

    let dataTableProps = {
      loading,
      showNum: true,
      columns: childColumns,
      rowKey: 'id',
      dataItems: childPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'standingBookAdd/getChildPageData',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    let childAddProps = {
      visible,
      onChangeVisible: this.onChangeVisible,
    }
    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">子设备</span>
          <span>
            <Tooltip title="选择">
              <Icon ilng type="select" onClick={this.handleSelect} className="icon-item"></Icon>
            </Tooltip>
          </span>
        </div>
        <DataTable {...dataTableProps}></DataTable>
        <ChildAddLayout {...childAddProps}></ChildAddLayout>
      </section>
    )
  }
}

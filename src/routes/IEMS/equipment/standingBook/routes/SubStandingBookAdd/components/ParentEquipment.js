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
import ParentAddLayout from './ParentAddLayout'
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
      standingBookAdd: { parentAddPageData },
    } = this.props
    dispatch({
      type: 'standingBookAdd/getParentPageInfo',
      payload: {
        parentAddPageData: parentAddPageData.startPage(),
      },
    })
    this.onChangeVisible(true)
  }
  deleteFn = (record) => {
    let {
      standingBookAdd: { parentPageData },
      dispatch,
    } = this.props
    parentPageData.list = []
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        parentPageData,
        parentRow: [],
        parentRowKeys: [],
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
    let { parentPageData } = standingBookAdd
    let { visible } = this.state
    let childColumns = createChildColumns(this)

    let dataTableProps = {
      loading,
      showNum: true,
      columns: childColumns,
      rowKey: 'id',
      dataItems: parentPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'standingBookAdd/getParentPageData',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    let parentAddProps = {
      visible,
      onChangeVisible: this.onChangeVisible,
    }
    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">父设备</span>
          <span>
            <Tooltip title="选择">
              <Icon ilng type="select" onClick={this.handleSelect} className="icon-item"></Icon>
            </Tooltip>
          </span>
        </div>
        <DataTable {...dataTableProps}></DataTable>
        <ParentAddLayout {...parentAddProps}></ParentAddLayout>
      </section>
    )
  }
}

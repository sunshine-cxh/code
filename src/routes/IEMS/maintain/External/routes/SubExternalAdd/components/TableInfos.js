/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:54:30
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createColumnsApp } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import Panel from 'components/Panel'
import { ModalForm, Modal } from 'components/Modal'
import UploadFile from './UploadFile'
import SelectList from './SelectList'
@connect(({ externalAdd, loading }) => ({
  externalAdd,
  loading: loading.models.externalAdd,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: {},
    visible: false,
    status: 'add',
    index: 0,
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'externalAdd',
        valueField: 'brandList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        namespace: 'externalAdd',
        valueField: 'unitList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        namespace: 'externalAdd',
        valueField: 'supplyList',
        success: () => {},
      },
    })
  }
  handleEdit = (record) => {
    let {
      externalAdd: { appPageData },
      dispatch,
    } = this.props
    this.setState({
      ...this.state,
      visible: true,
      record,
      status: 'edit',
      index: record.index,
    })
  }
  handleSelectBtn = (e) => {
    let {
      dispatch,
      externalAdd: { selectDataList },
    } = this.props
    dispatch({
      type: 'externalAdd/getSelectList',
      payload: {
        selectDataList: selectDataList.startPage(),
      },
    })
    this.onChangeVisible(true)
  }
  deleteFn = (record) => {
    let {
      externalAdd: { appPageData },
      dispatch,
    } = this.props
    appPageData.list.splice(record.index, 1)
    appPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'externalAdd/@change',
      payload: {
        appPageData,
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
      visible,
    })
  }
  componentWillUnmount() {
    let {
      externalAdd: { appPageData },
      dispatch,
    } = this.props
    appPageData.list = []
    dispatch({
      type: 'externalAdd/@change',
      payload: {
        appPageData,
      },
    })
  }
  render() {
    let { dispatch, externalAdd, loading } = this.props
    let { visible, record, status, index } = this.state
    let { appPageData } = externalAdd
    let columnsApp = createColumnsApp(this)
    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'externalAdd/getSelectList',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    const selectListProps = {
      visible,
      onChangeVisible: this.onChangeVisible,
    }
    return (
      <>
      <Panel header={null}>
        <section className="block-wrap">
          {/* 申请信息 */}
          <div className="header">
            <span className="title">关联报修单</span>
            <span>
              <Tooltip title="选择">
                <Icon ilng type="select" onClick={this.handleSelectBtn} className="icon-item"></Icon>
              </Tooltip>
            </span>
          </div>
          <DataTable {...applyDataTableProps}></DataTable>
        </section>
      </Panel>
      <Panel header={null}>
        <section  className="block-wrap">
          <UploadFile></UploadFile>
          <SelectList {...selectListProps}></SelectList>
        </section>
      </Panel>
      </>
    )
  }
}

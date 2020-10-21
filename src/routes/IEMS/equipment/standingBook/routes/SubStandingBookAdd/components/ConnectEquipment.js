/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-19 14:05:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 17:01:33
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import DataTable, { Editable } from 'components/DataTable'
import { createConnectColumns } from './columns'
import '../style/index.less'
import ConnectAddLayout from './ConnectAddLayout'
import { Modal, ModalForm } from 'components/Modal'
import $$ from 'cmn-utils'

@connect(({ standingBookAdd, loading, standingBook }) => ({
  standingBookAdd,
  loading: loading.models.standingBookAdd,
  standingBook,
}))
export default class extends Component {
  state = {
    visible: false,
    record: {},
    editVisible: false,
  }
  handleSelect = () => {
    let {
      dispatch,
      standingBookAdd: { connectAddPageData },
    } = this.props
    dispatch({
      type: 'standingBookAdd/getConnectPageInfo',
      payload: {
        connectAddPageData: connectAddPageData.startPage(),
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
      standingBookAdd: { connectRow, connectRowKeys, connectPageData },
      dispatch,
    } = this.props
    // 删除keys
    let index = connectRowKeys.indexOf(record.id)
    if (index >= 0) {
      connectRowKeys.splice(index, 1)
    }
    // 删除row
    connectRow = connectRow.filter((item) => {
      return item.id !== record.id
    })
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        connectRow,
        connectRowKeys,
      },
    })
    // 删除列表中的当前值
    connectPageData.list.splice(record.index, 1)
    connectPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        connectPageData,
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
  handleEdit = (record)=> {
    this.setState({
      editVisible: true,
      record
    })
  }
  onChangeVisible = (visible) => {
    this.setState({
      ...this.state,
      visible,
    })
  }

  render() {
    let { dispatch, standingBookAdd, loading, standingBook } = this.props
    let { connectPageData } = standingBookAdd
    let { details } = standingBook
    let { visible, editVisible, record } = this.state
    let connentColumns = createConnectColumns(this)

    let dataTableProps = {
      loading,
      showNum: true,
      columns: connentColumns,
      rowKey: 'id',
      dataItems: connectPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'standingBookAdd/getconnectPageData',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    let connectAddProps = {
      visible,
      onChangeVisible: this.onChangeVisible,
    }
    let modalFormProps = {
      record,
      visible: editVisible,
      columns: connentColumns,
      modalOpts: {
        width: 740,
      },
      footer: [],
      onCancel: () => {
        this.setState({
          record: null,
          editVisible: false,
        })
      },

      onSubmit: (values) => {
        let index
        for(let i = 0; i<connectPageData.list.length; i++) {
          if(connectPageData.list[i].id === record.id) {
            index = i
          }
        }
        let addItem = {
          ...values,
          id: record.id
        }
        connectPageData.list.splice(index, 1, addItem)
        this.setState({
          record: {},
          editVisible: false,
        })
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            connectPageData,
          },
        })
        
      }
    }
    
    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">关联备件</span>
          <span>
            <Tooltip title="选择">
              <Icon ilng type="select" onClick={this.handleSelect} className="icon-item"></Icon>
            </Tooltip>
          </span>
        </div>
        <DataTable {...dataTableProps}></DataTable>
        <ConnectAddLayout {...connectAddProps}></ConnectAddLayout>
        <ModalForm {...modalFormProps}></ModalForm>
      </section>
    )
  }
}

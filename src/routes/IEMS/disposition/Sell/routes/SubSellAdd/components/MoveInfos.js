/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 16:24:49
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-24 16:29:04
 */ 
import React, { Component } from 'react'
import { connect } from 'dva'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import DataTable, { Editable } from 'components/DataTable'
import { createMoveColumns } from './columns'
import MoveInfosSelect from './MoveInfosSelect'
import { Modal, ModalForm } from 'components/Modal'

@connect(({ sellAdd, loading }) => ({
  sellAdd,
  loading: loading.models.sellAdd
}))
export default class extends Component {
  state = {
    visible: false,
    editVisible: false,
    record: {}
  }
  handleSelect = () => {
    let {
      dispatch,
      sellAdd: { sellAddPageData },
    } = this.props
    dispatch({
      type: 'sellAdd/getEquipmentPageInfo',
      payload: {
        sellAddPageData: sellAddPageData.startPage(),
      },
    })
    this.onChangeVisible(true)
  }
  deleteFn = (record) => {
    let {
      sellAdd: { selectedRow, selectedRowKeys, sellInfoPageData },
      dispatch,
    } = this.props
    // 删除keys
    let index = selectedRowKeys.indexOf(record.id)
    if (index >= 0) {
      selectedRowKeys.splice(index, 1)
    }
    // 删除row
    selectedRow = selectedRow.filter((item) => {
      return item.id !== record.id
    })
    dispatch({
      type: 'sellAdd/@change',
      payload: {
        selectedRow,
        selectedRowKeys,
      },
    })
    // 删除列表中的当前值
    sellInfoPageData.list.splice(record.index, 1)
    sellInfoPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'sellAdd/@change',
      payload: {
        sellInfoPageData,
      },
    })
  }
  handleEdit = (record)=> {
    this.setState({
      editVisible: true,
      record
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
    let { dispatch, sellAdd, loading } = this.props
    let { sellInfoPageData } = sellAdd
    let { visible, record, editVisible } = this.state
    let moveColumns = createMoveColumns(this)

    let dataTableProps = {
      loading,
      showNum: true,
      columns: moveColumns,
      rowKey: 'id',
      dataItems: sellInfoPageData
    }
    let modalFormProps = {
      record,
      visible: editVisible,
      columns: moveColumns,
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
        for(let i = 0; i<sellInfoPageData.list.length; i++) {
          if(sellInfoPageData.list[i].id === record.id) {
            index = i
          }
        }
        let addItem = {
          ...values,
          id: record.id
        }
        sellInfoPageData.list.splice(index, 1, addItem)
        this.setState({
          record: {},
          editVisible: false,
        })
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            sellInfoPageData,
          },
        })
        
      }
    }
    let moveSelectProps = {
      visible,
      onChangeVisible: this.onChangeVisible,
    }
    return (
      <div className="block-wrap">
        <div className="header">
          <span className="title">设备信息</span>
          <span>
            <Tooltip title="新增">
              <Icon ilng type="select" onClick={this.handleSelect} className="icon-item"></Icon>
            </Tooltip>
          </span>
        </div>
        <DataTable {...dataTableProps}></DataTable>
        <MoveInfosSelect {...moveSelectProps}></MoveInfosSelect>
        <ModalForm {...modalFormProps}></ModalForm>
      </div>
    )
  }
}
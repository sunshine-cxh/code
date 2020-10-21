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

@connect(({ scrapAdd, loading }) => ({
  scrapAdd,
  loading: loading.models.scrapAdd
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
      scrapAdd: { scrapAddPageData },
    } = this.props
    dispatch({
      type: 'scrapAdd/getEquipmentPageInfo',
      payload: {
        scrapAddPageData: scrapAddPageData.startPage(),
      },
    })
    this.onChangeVisible(true)
  }
  deleteFn = (record) => {
    let {
      scrapAdd: { selectedRow, selectedRowKeys, scrapInfoPageData },
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
      type: 'scrapAdd/@change',
      payload: {
        selectedRow,
        selectedRowKeys,
      },
    })
    // 删除列表中的当前值
    scrapInfoPageData.list.splice(record.index, 1)
    scrapInfoPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'scrapAdd/@change',
      payload: {
        scrapInfoPageData,
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
    let { dispatch, scrapAdd, loading } = this.props
    let { scrapInfoPageData } = scrapAdd
    let { visible, record, editVisible } = this.state
    let moveColumns = createMoveColumns(this)

    let dataTableProps = {
      loading,
      showNum: true,
      columns: moveColumns,
      rowKey: 'id',
      dataItems: scrapInfoPageData
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
        for(let i = 0; i<scrapInfoPageData.list.length; i++) {
          if(scrapInfoPageData.list[i].id === record.id) {
            index = i
          }
        }
        let addItem = {
          ...values,
          id: record.id
        }
        scrapInfoPageData.list.splice(index, 1, addItem)
        this.setState({
          record: {},
          editVisible: false,
        })
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            scrapInfoPageData,
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
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

@connect(({ moveAdd, loading }) => ({
  moveAdd,
  loading: loading.models.moveAdd
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
      moveAdd: { moveAddPageData },
    } = this.props
    dispatch({
      type: 'moveAdd/getEquipmentPageInfo',
      payload: {
        moveAddPageData: moveAddPageData.startPage(),
      },
    })
    this.onChangeVisible(true)
  }
  deleteFn = (record) => {
    let {
      moveAdd: { moveRow, moveRowKeys, moveInfoPageData },
      dispatch,
    } = this.props
    // 删除keys
    let index = moveRowKeys.indexOf(record.id)
    if (index >= 0) {
      moveRowKeys.splice(index, 1)
    }
    // 删除row
    moveRow = moveRow.filter((item) => {
      return item.id !== record.id
    })
    dispatch({
      type: 'moveAdd/@change',
      payload: {
        moveRow,
        moveRowKeys,
      },
    })
    // 删除列表中的当前值
    moveInfoPageData.list.splice(record.index, 1)
    moveInfoPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'moveAdd/@change',
      payload: {
        moveInfoPageData,
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
    let { dispatch, moveAdd, loading } = this.props
    let { moveInfoPageData } = moveAdd
    let { visible, record, editVisible } = this.state
    let moveColumns = createMoveColumns(this)

    let dataTableProps = {
      loading,
      showNum: true,
      columns: moveColumns,
      rowKey: 'id',
      dataItems: moveInfoPageData,
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
        for(let i = 0; i<moveInfoPageData.list.length; i++) {
          if(moveInfoPageData.list[i].id === record.id) {
            index = i
          }
        }
        let addItem = {
          ...values,
          id: record.id
        }
        moveInfoPageData.list.splice(index, 1, addItem)
        this.setState({
          record: {},
          editVisible: false,
        })
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            moveInfoPageData,
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
/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:55:38
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createColumnsApp } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import UploadFile from './UploadFile'
import SelectList from './selectList'
import { ModalForm, Modal } from 'components/Modal'
import Panel from 'components/Panel'

@connect(({ procurementApplyConsumables, loading }) => ({
  procurementApplyConsumables,
  loading: loading.models.procurementApplyConsumables,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: null,
    visible: false,
    addVisible: false,
    status: 'add',
    index: 0,
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        success: () => {},
        namespace: 'procurementApplyConsumables',
        valueField: 'unitList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        success: () => {},
        namespace: 'procurementApplyConsumables',
        valueField: 'supplyList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        success: () => {},
        namespace: 'procurementApplyConsumables',
        valueField: 'brandList',
      },
    })
  }
  handleAdd = () => {
    this.setState({
      ...this.state,
      record: null,
      addVisible: true,
      status: 'add',
    })
  }
  handleEdit = (record) => {
    this.setState({
      ...this.state,
      addVisible: true,
      record,
      status: 'edit',
      index: record.index,
    })
  }
  deleteFn = (record) => {
    let {
      procurementApplyConsumables: { appPageData, selectedRow, selectedRowKeys, addRow },
      dispatch,
    } = this.props
    if (!record.consume) {
      // 删除Keys 列表中的key
      let index = selectedRowKeys.indexOf(record.id)
      if (index >= 0) {
        selectedRowKeys.splice(index, 1)
      }
      dispatch({
        type: 'procurementApplyConsumables/@change',
        payload: {
          selectedRowKeys,
        },
      })
      // 删除row
      selectedRow = selectedRow.filter((item) => {
        return item.id !== record.id
      })
      dispatch({
        type: 'procurementApplyConsumables/@change',
        payload: {
          selectedRow,
        },
      })
    } else {
      // 删除自定义行
      let index
      for (let i = 0; i < addRow.length; i++) {
        if (addRow[i].id === record.id) {
          index = i
        }
      }
      if (index >= 0) {
        addRow.splice(index, 1)
      }
      dispatch({
        type: 'procurementApplyConsumables/@change',
        payload: {
          addRow,
        },
      })
    }
    // 删除列表
    appPageData.list.splice(record.index, 1)
    appPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'procurementApplyConsumables/@change',
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
  handleSelectBtn = (e) => {
    let {
      dispatch,
      procurementApplyConsumables: { selectDataList },
    } = this.props
    this.setState({
      visible: true,
    })
    dispatch({
      type: 'procurementApplyConsumables/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
      },
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        success: () => {},
        namespace: 'procurementApplyConsumables',
        valueField: 'typeList',
      },
    })
  }

  render() {
    let { visible, addVisible, record, status, index } = this.state
    let { procurementApplyConsumables, loading, dispatch } = this.props
    let { appPageData, addRow } = procurementApplyConsumables
    let columnsApp = createColumnsApp(this)
    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: appPageData,
    }
    const selectListProps = {
      visible,
      onChangeVisible: this.onChangeVisible,
    }
    let modalFormProps = {
      record,
      visible: addVisible,
      columns: columnsApp,
      modalOpts: {
        width: 740,
      },
      footer: [],
      onCancel: () => {
        this.setState({
          record: null,
          addVisible: false,
        })
      },

      onSubmit: (values) => {
        let addItem
        if (values.num && values.price) {
          values.amountMoney = values.num * values.price
        } else {
          values.amountMoney = 0
        }
        if (status === 'add') {
          addItem = {
            ...values,
            consume: true,
            id: Math.random(),
            index: appPageData.list.length,
            purchaseDate: values.purchaseDate && values.purchaseDate.format('YYYY-MM-DD'),
          }
          appPageData.list.push(addItem)
          addRow.push(addItem)
          dispatch({
            type: 'procurementApplyConsumables/@change',
            payload: {
              appPageData,
              addRow,
            },
          })
        } else {
          addItem = {
            ...values,
            id: record.id,
            index,
            purchaseDate: values.purchaseDate && values.purchaseDate.format('YYYY-MM-DD'),
          }
          appPageData.list.splice(index, 1, addItem)
          dispatch({
            type: 'procurementApplyConsumables/@change',
            payload: {
              appPageData,
            },
          })
        }
        this.setState({
          ...this.state,
          addVisible: false,
        })
      },
      onContinue:
        status === 'add'
          ? (values) => {
              if (values.num && values.price) {
                values.amountMoney = values.num * values.price
              } else {
                values.amountMoney = 0
              }
              let addItem = {
                id: Math.random(),
                index: appPageData.list.length,
                ...values,
              }
              appPageData.list.push(addItem)
              dispatch({
                type: 'procurementApplyConsumables/@change',
                payload: {
                  appPageData,
                },
              })
            }
          : null,
    }
    return (
      <>
        <Panel header={null}>
          <section className="block-wrap">
            {/* 申请信息 */}
            <div className="header">
              <span className="title">设备清单</span>
              <span>
                <Tooltip title="选择">
                  <Icon ilng type="select" onClick={this.handleSelectBtn} className="icon-item"></Icon>
                </Tooltip>

                <Tooltip title="新增">
                  <Icon ilng type="plus" onClick={this.handleAdd} className="icon-item"></Icon>
                </Tooltip>
              </span>
            </div>
            <Editable {...applyDataTableProps}></Editable>
          </section>
        </Panel>
        <Panel header={null}>
          <section className="block-wrap">
            <UploadFile></UploadFile>
            <SelectList {...selectListProps}></SelectList>
            <ModalForm {...modalFormProps}></ModalForm>
          </section>
        </Panel>
      </>
    )
  }
}

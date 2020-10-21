/*
 * @Descripttion : 新增表格部分
 * @Author       : hezihua
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:56:12
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

@connect(({ procurementTestAdd, loading }) => ({
  procurementTestAdd,
  loading: loading.models.procurementTestAdd,
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
      type: 'equipmentGlobal/getSupply',
      payload: {
        success: () => {},
        namespace: 'procurementTestAdd',
        valueField: 'supplyList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        success: () => {},
        namespace: 'procurementTestAdd',
        valueField: 'unitList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        success: () => {},
        namespace: 'procurementTestAdd',
        valueField: 'typeList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getLocation',
      payload: {
        success: () => {},
        namespace: 'procurementTestAdd',
        valueField: 'locationList',
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
      procurementTestAdd: { appPageData, selectedRow, selectedRowKeys, addRow },
      dispatch,
    } = this.props
    if (!record.consume) {
      // 删除Keys 列表中的key
      let index = selectedRowKeys.indexOf(record.id)
      if (index >= 0) {
        selectedRowKeys.splice(index, 1)
      }
      dispatch({
        type: 'procurementTestAdd/@change',
        payload: {
          selectedRowKeys,
        },
      })
      // 删除row
      selectedRow = selectedRow.filter((item) => {
        return item.id !== record.id
      })
      dispatch({
        type: 'procurementTestAdd/@change',
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
        type: 'procurementTestAdd/@change',
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
      type: 'procurementTestAdd/@change',
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

  handleSelectBtn = (e) => {
    let {
      dispatch,
      procurementTestAdd: { selectDataList },
    } = this.props
    dispatch({
      type: 'procurementTestAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
      },
    })
    this.onChangeVisible(true)
  }
  onChangeVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  render() {
    let { procurementTestAdd, loading, dispatch } = this.props
    let { visible, addVisible, record, status, index } = this.state
    let { appPageData, addRow } = procurementTestAdd
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
            type: 'procurementTestAdd/@change',
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
            type: 'procurementTestAdd/@change',
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
              }
              let addItem = {
                id: Math.random(),
                index: appPageData.list.length,
                ...values,
              }
              appPageData.list.push(addItem)
              dispatch({
                type: 'procurementTestAdd/@change',
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
              <span className="title">产品信息</span>
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

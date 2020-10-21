/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:55:49
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createColumnsApp } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import UploadFile from './UploadFile'
import { ModalForm, Modal } from 'components/Modal'
import Panel from 'components/Panel'

@connect(({ procurementApplyEquipment, loading }) => ({
  procurementApplyEquipment,
  loading: loading.models.procurementApplyEquipment,
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
      type: 'equipmentGlobal/getBrand',
      payload: {
        success: () => {},
        namespace: 'procurementApplyEquipment',
        valueField: 'brandList'
      },
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        type: 1,
        success: () => {},
        namespace: 'procurementApplyEquipment',
        valueField: 'typeList'
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        success: () => {},
        namespace: 'procurementApplyEquipment',
        valueField: 'supplyList'
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
      procurementApplyEquipment: { appPageData },
      dispatch,
    } = this.props

    appPageData.list.splice(record.index, 1)
    appPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'procurementApplyEquipment/@change',
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
  render() {
    let { dispatch, procurementApplyEquipment, loading } = this.props
    let { addVisible, record, status, index } = this.state
    let { appPageData } = procurementApplyEquipment
    let columnsApp = createColumnsApp(this)

    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'procurementApplyEquipment/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
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
        if (values.num && values.price) {
          values.amountMoney = values.num * values.price
        } else {
          values.amountMoney = 0
        }
        let addItem
        if (status === 'add') {
          addItem = {
            id: Math.random(),
            index: appPageData.list.length,
            ...values,
          }
          appPageData.list.push(addItem)
        } else {
          addItem = {
            id: Math.random(),
            index,
            ...values,
          }
          appPageData.list.splice(index, 1, addItem)
        }
        dispatch({
          type: 'procurementApplyEquipment/@change',
          payload: {
            appPageData,
          },
        })
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
                type: 'procurementApplyEquipment/@change',
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
                <Tooltip title="新增">
                  <Icon
                    ilng
                    type="plus"
                    onClick={this.handleAdd}
                    className="icon-item"
                  ></Icon>
                </Tooltip>
              </span>
            </div>
            <Editable {...applyDataTableProps}></Editable>
          </section>
        </Panel>
        <Panel header={null}>
          <section className="block-wrap">
            <UploadFile></UploadFile>
            <ModalForm {...modalFormProps}></ModalForm>
          </section>
        </Panel>
        

      </>
    )
  }
}

/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:56:00
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

@connect(({ procurementPlanAdd, loading }) => ({
  procurementPlanAdd,
  loading: loading.models.procurementPlanAdd,
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
        namespace: 'procurementPlanAdd',
        valueField: 'brandList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        namespace: 'procurementPlanAdd',
        valueField: 'unitList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        namespace: 'procurementPlanAdd',
        valueField: 'supplyList',
        success: () => {},
      },
    })
  }
  handleAdd = () => {
    this.setState({
      ...this.state,
      record: null,
      visible: true,
      status: 'add',
    })
  }
  handleEdit = (record) => {
    let {
      procurementPlanAdd: { appPageData },
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
  deleteFn = (record) => {
    let {
      procurementPlanAdd: { appPageData },
      dispatch,
    } = this.props
    appPageData.list.splice(record.index, 1)
    appPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'procurementPlanAdd/@change',
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
  componentWillUnmount() {
    let {
      procurementPlanAdd: { appPageData },
      dispatch,
    } = this.props
    appPageData.list = []
    dispatch({
      type: 'procurementPlanAdd/@change',
      payload: {
        appPageData,
      },
    })
  }
  render() {
    let { dispatch, procurementPlanAdd, loading } = this.props
    let { visible, record, status, index } = this.state
    let { appPageData } = procurementPlanAdd
    let columnsApp = createColumnsApp(this)
    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'procurementPlanAdd/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    let modalFormProps = {
      record,
      visible,
      columns: columnsApp,
      modalOpts: {
        width: 740,
      },
      footer: [],
      onSubmitTitle:'确定',
      onCancel: () => {
        this.setState({
          record: null,
          visible: false,
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
          type: 'procurementPlanAdd/@change',
          payload: {
            appPageData,
          },
        })
        this.setState({
          ...this.state,
          visible: false,
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
                type: 'procurementPlanAdd/@change',
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
            <span className="title">计划信息</span>
            <span>
              <Tooltip title="新增">
                <Icon ilng type="plus" onClick={this.handleAdd} className="icon-item"></Icon>
              </Tooltip>
            </span>
          </div>
          <DataTable {...applyDataTableProps}></DataTable>
        </section>
      </Panel>
      <Panel header={null}>
        <section  className="block-wrap">
          <UploadFile></UploadFile>
          <ModalForm {...modalFormProps}></ModalForm>
        </section>
      </Panel>
      </>
    )
  }
}

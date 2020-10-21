/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-10 18:02:51
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import { createColumnsApp } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import Panel from 'components/Panel'
import SelectList from './SelectList'
import PageHelper from 'utils/pageHelper'
import { ModalForm, Modal } from 'components/Modal'
@connect(({ recipientsAdd, loading }) => ({
  recipientsAdd,
  loading: loading.models.recipientsAdd,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: {},
    visible: false,
    editVisible: false,
    index: 0
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'recipientsAdd',
        valueField: 'brandList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        namespace: 'recipientsAdd',
        valueField: 'unitList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        namespace: 'recipientsAdd',
        valueField: 'supplyList',
        success: () => {},
      },
    })
  }
  handleSelect = () => {
    let {
      dispatch,
    } = this.props
    this.setState({
      ...this.state,
      visible: true
    })
    dispatch({
      type: 'recipientsAdd/getEquipmentPageInfo',
      payload: {
        selectDataList: PageHelper.create(),
      },
    })
  }
  handleEdit = (record)=> {
    this.setState({
      ...this.state,
      editVisible: true,
      record,
    })
  }

  deleteFn = (record) => {
    let {
      recipientsAdd: { appPageData, selectedRowKeys, selectedRow },
      dispatch,
    } = this.props
    let index = selectedRowKeys.indexOf(record.id)
    appPageData.list.splice(index, 1)
    selectedRowKeys.splice(index, 1)
    // 删除row
    selectedRow = selectedRow.filter((item) => {
      return item.id !== record.id
    })
    dispatch({
      type: 'recipientsAdd/@change',
      payload: {
        appPageData,
        selectedRow,
        selectedRowKeys
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
    let { dispatch, recipientsAdd, loading } = this.props
    let { visible, record, editVisible } = this.state
    let { appPageData, details } = recipientsAdd
    let columnsApp = createColumnsApp(this)
    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: appPageData
    }
    const modalFormProps = {
      record,
      visible: editVisible,
      columns: columnsApp,
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
      onSubmit: (values)=> {
        let index
        for(let i = 0; i<appPageData.list.length; i++) {
          if(appPageData.list[i].id === record.id) {
            index = i
          }
        }
        let addItem = {
          ...values,
          id: record.id,
          dueTime: values.dueTime.format('YYYY-MM-DD')
        }
        appPageData.list.splice(index, 1, addItem)
        this.setState({
          record: {},
          editVisible: false,
        })
        dispatch({
          type: 'recipientsAdd/@change',
          payload: {
            appPageData,
          },
        })
      }
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
            <span className="title">领用设备</span>
            <span>
              <Tooltip title="选择">
                <Icon ilng type="select" onClick={this.handleSelect} className="icon-item"></Icon>
              </Tooltip>
            </span>
          </div>
          <DataTable {...applyDataTableProps}></DataTable>
          <SelectList {...selectListProps}></SelectList>
          <ModalForm {...modalFormProps}></ModalForm>
        </section>
      </Panel>
      </>
    )
  }
}

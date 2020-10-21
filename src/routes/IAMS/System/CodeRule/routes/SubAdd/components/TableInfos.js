/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 16:44:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-11 16:51:15
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import DataTable from 'components/DataTable'
import { createColumns } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { ModalForm, Modal } from 'components/Modal'

@connect(({ codeRuleAdd, loading }) => ({
  codeRuleAdd,
  loading: loading.models.codeRuleAdd,
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
      codeRuleAdd: { appPageData },
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
      codeRuleAdd: { appPageData },
      dispatch,
    } = this.props
    appPageData.list.splice(record.index, 1)
    appPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'codeRuleAdd/@change',
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
      codeRuleAdd: { appPageData },
      dispatch,
    } = this.props
    appPageData.list = []
    dispatch({
      type: 'codeRuleAdd/@change',
      payload: {
        appPageData,
      },
    })
  }
  render() {
    let {
      dispatch,
      codeRuleAdd: { appPageData, ruleDetailTypeValue },
      loading,
    } = this.props
    let { visible, record, status, index } = this.state
    let columns = createColumns(this, { ruleDetailTypeValue })
    const detailDataTableProps = {
      loading,
      showNum: true,
      columns: columns,
      rowKey: 'id',
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'codeRuleAdd/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }

    let modalFormProps = {
      record,
      visible,
      columns: columns,
      onSubmitTitle: '确定',
      onCancel: () => {
        this.setState({
          record: null,
          visible: false,
        })
      },
      onSubmit: (values) => {
        if (values.num && values.price) {
          values.amountMoney = values.num * values.price
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
          type: 'codeRuleAdd/@change',
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
                type: 'codeRuleAdd/@change',
                payload: {
                  appPageData,
                },
              })
            }
          : null,
    }
    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">规则明细</span>
          <span>
            <Tooltip title="新增">
              <Icon ilng type="plus" onClick={this.handleAdd} className="icon-item"></Icon>
            </Tooltip>
          </span>
        </div>
        <DataTable {...detailDataTableProps}></DataTable>
        <ModalForm {...modalFormProps}></ModalForm>
      </section>
    )
  }
}

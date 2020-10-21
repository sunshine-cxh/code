/*
 * @Descripttion : 养护标准清单
 * @Author       : hezihua
 * @Date         : 2020-06-02 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 14:44:20
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Editable } from 'components/DataTable'
import { createComsumablesApp } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal, ModalForm } from 'components/Modal'
import ComsumablesSelect from "./comsumablesSelect"

@connect(({ curingsTaskOperate, loading }) => ({
  curingsTaskOperate,
  loading: loading.models.curingsTaskOperate
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: null,
    visible: false,
    index: 0,
    comsumablesVisible: false
  }

  // 删除操作
  deleteFn = (record) => {
    let {
      curingsTaskOperate: { itemPageData },
      dispatch,
    } = this.props
    // 删除列表
    itemPageData.list.splice(record.index, 1)
    itemPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'curingsTaskOperate/@change',
      payload: {
        itemPageData
      }
    })
  }

  // 删除确认提示
  handleDelete = (record, type) => {
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        if (type == 'detail') {
          this.deleteFn(record)
        } else {
          this.handleFileDelete(record)
        }
      },
      onCancel() { },
    })
  }

  componentWillUnmount() {
    let { curingsTaskOperate: { itemPageData }, dispatch } = this.props
    itemPageData.list = []
    dispatch({
      type: 'curingsTaskOperate/@change',
      payload: {
        itemPageData,
      }
    })
  }

  onChangeVisible = (visible) => {
    this.setState({
      visible
    })
  }

  handleAdd = () => {
    this.setState({
      comsumablesVisible: true
    })
  };

  render() {
    let { curingsTaskOperate, loading, } = this.props
    let { comsumablesVisible } = this.state
    let { itemPageData } = curingsTaskOperate
    let columnsApp = createComsumablesApp(this)

    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'sn',
      dataItems: itemPageData
    }
    let comsumablesSelectProps = {
      comsumablesVisible,
      onChangeVisible: (comsumablesVisible) => {
        this.setState({
          comsumablesVisible,
        })
      },
    }
    return (
      <section className="block-wrap">
        {/* 点检项目 */}
        <div className="header">
          <span className='title'>备件消耗</span>
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
        <ComsumablesSelect {...comsumablesSelectProps}></ComsumablesSelect>
      </section>
    )
  }
}

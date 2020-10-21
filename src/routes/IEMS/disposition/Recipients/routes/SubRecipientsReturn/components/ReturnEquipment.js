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
import { createOrderColumns } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import Panel from 'components/Panel'
import PageHelper from 'utils/pageHelper'
import { ModalForm, Modal } from 'components/Modal'
import { message } from 'antd';
@connect(({ recipientsReturn, loading }) => ({
  recipientsReturn,
  loading: loading.models.recipientsReturn,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: {},
    visible: false,
    editVisible: false,
    index: 0,
    flag: true
  }
  componentDidMount() {
    let { dispatch } = this.props
  }
  onChangeVisible = (visible) => {
    this.setState({
      ...this.state,
      visible,
    })
  }
  returnFn = () => {
    let { dispatch, recipientsReturn: { selectedRow } } = this.props
    dispatch({
      type: 'recipientsReturn/returnEquipment',
      payload: {
        entitys: {
          entitys: selectedRow
        },
        success: () => {

        }
      }

    })
  }
  handleReturn = () => {
    let { recipientsReturn: { selectedRow } } = this.props
    if (selectedRow && selectedRow.length > 0) {
      Modal.confirm({
        title: '注意',
        content: `确认要归还？`,
        onOk: () => {
          this.returnFn()
        },
        onCancel() { },
      })
    } else {
      let { flag } = this.state
      if (flag) {
        message.warning('至少选择一个归还设备')
        setTimeout(() => {
          this.setState({
            flag: true
          })
        }, 3000)
      }

      this.setState({
        flag: false
      })
      

    }

  }
  render() {
    let { dispatch, recipientsReturn, loading } = this.props
    let { visible, record, editVisible } = this.state
    let { orderTableList, details, selectedRowKeys, selectedRow } = recipientsReturn
    let columnsApp = createOrderColumns(this)
    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: orderTableList,
      selectType: 'checkbox',
      selectedRowKeys,
      onSelect: (keys, rows, currentRows, e) => {
        dispatch({
          type: 'recipientsReturn/@change',
          payload: {
            selectedRow: rows,
            keys
          }
        })
      }
    }

    return (
      <>
        <Panel header={null}>
          <section className="block-wrap">
            {/* 申请信息 */}
            <div className="header">
              <span className="title">领用设备</span>
              <span>
                <Tooltip title="归还">
                  <Icon ilng type="lingyongguihuan" onClick={this.handleReturn} className="icon-item"></Icon>
                </Tooltip>
              </span>
            </div>
            <DataTable {...applyDataTableProps}></DataTable>
          </section>
        </Panel>
      </>
    )
  }
}

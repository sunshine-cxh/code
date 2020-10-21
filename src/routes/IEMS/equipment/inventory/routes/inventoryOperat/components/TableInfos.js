/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 17:50:27
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 14:21:27
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { createInventoryColumns } from './columns'
import { Form } from 'antd'
import DataTable, { Editable } from 'components/DataTable'
import Select from 'components/Select'
import TreeSelect from 'components/TreeSelect'
const { Item } = Form
import PageHelper from 'utils/pageHelper'
import Input from 'components/Input'
import { Modal, ModalForm } from 'components/Modal'
@connect(({ inventoryOperat, loading, inventory }) => ({
  inventoryOperat,
  loading: loading.models.inventoryOperat,
  inventory,
}))
export default class extends Component {
  state = {
    record: {},
    editVisible: false,
    searchObj: {},
  }
  handleEdit = (record) => {
    this.setState({
      record,
      editVisible: true,
    })
  }
  handleChangeForm = (key, val) => {
    let obj = {}
    obj[key] = val
    let {
      dispatch,
      inventoryOperat: { details, inventoryPageData },
    } = this.props

    let searchObj = { ...this.state.searchObj, ...obj }
    this.setState(
      {
        searchObj,
      },
      () => {
        let { operateName, status } = this.state.searchObj
        let newList = details.list.filter((item) => {
          if (operateName && status) {
            return item.name.includes(operateName) && item.detailState == status
          } else if (operateName && !status) {
            return item.name.includes(operateName)
          } else if (!operateName && status) {
            return item.detailState == status
          } else {
            return true
          }
        })
        inventoryPageData.list = newList
        dispatch({
          type: 'inventoryOperat/@change',
          payload: {
            inventoryPageData,
          },
        })
      }
    )
  }
  render() {
    let {
      loading,
      inventoryOperat: { inventoryPageData, inventoryRowKeys, details },
    } = this.props
    let columns = createInventoryColumns(this)
    let {
      editVisible,
      record,
      searchObj: { operateName, status },
    } = this.state
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'equipmentId',
      selectType: 'checkbox',
      dataItems: inventoryPageData,
      selectedRowKeys: inventoryRowKeys,
      onSelectRow: (record, selected, selectedRows, event) => {
      },
      onSelect: (keys, rows) => {
        let { dispatch } = this.props
        dispatch({
          type: 'inventoryOperat/@change',
          payload: {
            inventoryRowKeys: keys,
          },
        })
      },
      rowSelection: {
        onSelectAll: (selected, selectedRows, changeRows) => {
        },
        getCheckboxProps: record => ({
          disabled: record.detailStateDesc === '已盘点', // Column configuration not to be checked
        }),
      },
    }
    let modalFormProps = {
      record,
      visible: editVisible,
      columns,
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
        let { dispatch } = this.props
        let { inventoryLocation, detailRemark } = values
        dispatch({
          type: 'inventoryOperat/changeSite',
          payload: {
            success: () => {
              let index
              for (let i = 0; i < inventoryPageData.list.length; i++) {
                if (inventoryPageData.list[i].equipmentId === record.equipmentId) {
                  index = i
                }
              }
              let addItem = {
                ...values,
                equipmentId: record.equipmentId,
              }
              inventoryPageData.list.splice(index, 1, addItem)
              this.setState({
                record: {},
                editVisible: false,
              })
              if(inventoryRowKeys.includes(record.equipmentId)) {
                dispatch({
                  type: 'inventoryOperat/@change',
                  payload: {
                    inventoryPageData,
                  },
                })
              } else {
                dispatch({
                  type: 'inventoryOperat/@change',
                  payload: {
                    inventoryPageData,
                    inventoryRowKeys: [...inventoryRowKeys, record.equipmentId]
                  },
                })
              }
              
            },
            id: details.id,
            ledgerId: record.equipmentId,
            inventoryLocation,
            detailRemark,
          },
        })
      },
    }
    let statusList = [
      {
        code: 1,
        codeName: '未盘点',
      },
      {
        code: 2,
        codeName: '已盘点',
      },
    ]
    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">盘点信息</span>
        </div>
        <div className="search-bar">
          <Form>
            <Item
              style={{
                display: 'inline-block',
                width: '200px',
                marginRight: '40px',
              }}
            >
              <Input
                value={operateName}
                onChange={(val) => {
                  this.handleChangeForm('operateName', val)
                }}
                allowClear
                width="100%"
                placeholder="设备名称"
              />
            </Item>
            <Item
              style={{
                display: 'inline-block',
                width: '200px',
                marginRight: '40px',
              }}
            >
              <Select
                value={status}
                onChange={(val) => {
                  this.handleChangeForm('status', val)
                }}
                allowClear
                width="100%"
                placeholder="状态"
                options={statusList}
              />
            </Item>
          </Form>
        </div>
        <DataTable {...dataTableProps}></DataTable>
        <ModalForm {...modalFormProps}></ModalForm>
      </section>
    )
  }
}

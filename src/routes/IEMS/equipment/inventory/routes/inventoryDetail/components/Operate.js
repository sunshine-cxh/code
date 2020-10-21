/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-08-04 08:59:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:13:06
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import DataTable, { Editable } from 'components/DataTable'
import { createOperateColumns } from './columns'
import '../style/index.less'
import { Form } from 'antd'
const { Item } = Form
import { Modal, ModalForm } from 'components/Modal'
import $$ from 'cmn-utils'
import Select from 'components/Select'
import Input from 'components/Input'

const statusList = [
  {
    code: 1,
    codeName: '未盘点',
  },
  {
    code: 2,
    codeName: '已盘点',
  }
]
@connect(({ inventoryDetail, loading }) => ({
  inventoryDetail,
  loading: loading.models.inventoryDetail,
}))
export default class extends Component {
  state = {
    record: {},
    ModalText: '',
    editVisible: false,
    searchObj: {},
    confirmLoading: false,
  }

  handleEdit = (record)=> {
    this.setState({
      ModalText: `是否更新${record.name}的安装位置为${record.inventoryLocation}`,
      editVisible: true,
      record
    })
  }
  handleOk = () => {
    let { dispatch } = this.props
    let { record } = this.state
    this.setState({
      confirmLoading: true,
    });
    dispatch({
      type: 'inventoryDetail/updateSite',
      payload: {
        id: record.equipmentId,
        installationSite: record.inventoryLocation,
        success: ()=> {
          this.setState({
            editVisible: false,
            confirmLoading: false,
          });
        }
      }
    })
  };

  handleCancel = () => {
    this.setState({
      editVisible: false,
      confirmLoading: false
    });
  };
  handleChangeForm = (key, val) => {
    let obj = {}
    obj[key] = val
    let {
      dispatch,
      inventoryDetail: { details, operatePageData },
    } = this.props

    let searchObj = { ...this.state.searchObj, ...obj }
    this.setState({
      searchObj,
    }, ()=> {
      let { operateName, status } = this.state.searchObj
      let newList = details.list.filter(item=> {
        if(operateName && status) {
          return item.name.includes(operateName) && item.detailState == status
        } else if(operateName && !status) {
          return item.name.includes(operateName)
        } else if(!operateName && status) {
          return item.detailState == status
        } else {
          return true
        }
        
      })
      operatePageData.list = newList
      dispatch({
        type: 'inventoryDetail/@change',
        payload: {
          operatePageData
        }
      })
    })
  }
  render() {
    let { dispatch, inventoryDetail, loading } = this.props
    let { operatePageData } = inventoryDetail
    let {
      ModalText,
      editVisible,
      confirmLoading,
      searchObj: { status, operateName },
    } = this.state
    let operateColumns = createOperateColumns(this)

    let dataTableProps = {
      loading,
      showNum: true,
      columns: operateColumns,
      rowKey: 'id',
      dataItems: operatePageData,
    }

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
        <Modal
          title="注意"
          visible={editVisible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </section>
    )
  }
}

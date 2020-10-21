/*
 * @Descripttion : 门站信息
 * @Author       : caojiarong
 * @Date         : 2020-06-29 10:39:30
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-08 11:47:11
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import { ModalForm, Modal } from 'components/Modal'
import DataTable from 'components/DataTable'
import { createColumns } from './columns'

import './index.less'

let loaded = false
@connect(({ gateStationExit, loading, global }) => ({
  gateStationExit,
  loading: loading.models.gateStationExit,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: {},
    visible: false,
    codeEdit:true,
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'gateStationExit/init',
      })
    }
  }

  deleteFn = (record) => {
    let id = record.id
    this.props.dispatch({
      type: 'gateStationExit/delete',
      payload: {
        id,
        success: () => {},
      },
    })
  }
  handleDelete = (record) =>{
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
       this.deleteFn(record)
      },
      onCancel() {},
    })
  }

  handleAdd = () => {
    this.setState({visible:true, codeEdit:true})
  }

  handleEdit = (record) => {
    const { dispatch } =this.props
    this.setState({record,visible:true, codeEdit:false})
  }

  render() {
    let { record, visible } = this.state
    let {
      dispatch,
      gateStationExit,
      loading,
      global: { functionAuthority },
    } = this.props
    let { parameters, pageData } = gateStationExit
    let expand = { record, functionAuthority }
    let columns = createColumns(this, expand)

    let dataTableProps = {
      loading,
      showNum: true,
      columns: columns,
      rowKey: 'id',
      dataItems: pageData,
      pagination: true,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'gateStationExit/getPageInfo',
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
      modalOpts: {
        width: 740,
      },
      onCancel: () => {
        this.setState({
          record: {},
          visible: false,
        })
      },
      // 新增、修改都会进到这个方法中，可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        dispatch({
          type: 'gateStationExit/submit',
          payload: {
            values,
            success: () => {
              this.setState({
                record: {},
                visible: false,
              })
              dispatch({
                type: 'gateStationExit/getPageInfo',
                payload:{
                  pageData
                }
              })
            },
          },
        })
      },
    }
    
    return (
      <Layout>
        <Panel header={null}>
          <Toolbar>
            <Search
              placeholder="门站编号 / 门站名称"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'gateStationExit/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'gateStationExit/getPageInfo',
                  payload: {
                    values: {
                      keyword: value,
                    },
                    pageData: pageData.startPage(1, 10),
                  },
                })
              }}
            />
            <Button
              type="primary2"
              className="toolbar-item"
              icon="reload"
              onClick={() => {
                dispatch({
                  type: 'gateStationExit/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'gateStationExit/init',
                  payload: {
                    pageData: pageData.startPage(1, 10),
                  },
                })
              }}
            >
              刷新
            </Button>
            <Button type="primary2" className="toolbar-item" icon="plus" onClick={this.handleAdd}>
              新增
            </Button>
          </Toolbar>
          <DataTable {...dataTableProps} />
          <ModalForm {...modalFormProps} />
        </Panel>
      </Layout>
    )
  }
}

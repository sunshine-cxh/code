/*
 * @Descripttion : 实施人员-（已废弃，在后台管理那里去拉取）
 * @Author       : wuhaidong
 * @Date         : 2020-05-25 14:30:15
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-24 11:53:36
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import { ModalForm } from 'components/Modal'
import DataTable from 'components/DataTable'
import { createColumns } from './columns'

import './index.less'

let loaded = false
@connect(({ implementer, loading, global }) => ({
  implementer,
  loading: loading.models.implementer,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'implementer/init',
      })
    }
  }

  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'implementer/delete',
      payload: {
        id,
        success: () => {},
      },
    })
  }

  render() {
    let { record, visible } = this.state
    let {
      dispatch,
      implementer,
      loading,
      global: { functionAuthority },
    } = this.props
    let { parameters, pageData } = implementer
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
          type: 'implementer/getPageInfo',
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
          record: null,
          visible: false,
        })
      },
      // 新增、修改都会进到这个方法中，可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        dispatch({
          type: 'implementer/submit',
          payload: {
            values,
            success: () => {
              this.setState({
                record: null,
                visible: false,
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
              placeholder="实施人员名称 / 实施人员编号"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'implementer/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'implementer/getPageInfo',
                  payload: {
                    values: {
                      keyword: value,
                    },
                    pageData: pageData.startPage(),
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
                  type: 'implementer/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'implementer/init',
                  payload: {
                    pageData: pageData.startPage(),
                  },
                })
              }}
            >
              刷新
            </Button>
            <Button display={functionAuthority.indexOf('btnAdd') > -1} type="primary2" className="toolbar-item" icon="plus" onClick={this.onAdd}>
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

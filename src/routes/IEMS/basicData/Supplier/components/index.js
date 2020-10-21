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
@connect(({ supplier, loading, global }) => ({
  supplier,
  loading: loading.models.supplier,
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
        type: 'supplier/init',
      })
    }
  }

  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'supplier/delete',
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
      supplier,
      loading,
      global: { functionAuthority },
    } = this.props
    let { parameters, pageData } = supplier
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
          type: 'supplier/getPageInfo',
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
          type: 'supplier/submit',
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
              placeholder="供应商名称 / 供应商编号"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'supplier/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'supplier/getPageInfo',
                  payload: {
                    values: {
                      keyword: value,
                    },
                    pageData: pageData.startPage(1, 10, 'SortId', 'asc'),
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
                  type: 'supplier/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'supplier/init',
                  payload: {
                    pageData: pageData.startPage(1, 10, 'SortId', 'asc'),
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

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
import createColumns from './columns'

import './index.less'

let loaded = false
@connect(({ location, loading, global }) => ({
  location,
  loading: loading.models.location,
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
        type: 'location/init',
      })
    }
  }

  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'location/delete',
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
      location,
      loading,
      global: { functionAuthority },
    } = this.props
    let { parameters, listData, locationType, expandedRowKeys } = location
    let expand = { locationType, record, functionAuthority }
    let columns = createColumns(this, expand)
    let tableData = {
      list: listData,
    }

    let dataTableProps = {
      loading,
      columns: columns,
      rowKey: 'id',
      dataItems: tableData,
      expandable: true,
      expandedRowKeys,
      onExpand: (expanded, record) => {
        if (expanded) {
          expandedRowKeys.push(record.id)
        } else {
          let i = expandedRowKeys.indexOf(record.id)
          expandedRowKeys.splice(i, 1)
        }
        dispatch({
          type: 'location/@change',
          expandedRowKeys,
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
      onSubmit: (values) => {
        dispatch({
          type: 'location/submit',
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
              placeholder="存放地点名称 / 存放地点编号"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'location/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'location/getPageInfo',
                  payload: {
                    values: {
                      keyword: value,
                    },
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
                  type: 'location/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'location/init',
                  payload: {},
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

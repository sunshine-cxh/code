/*
 * @Descripttion : ApiResource
 * @Author       : wuhaidong
 * @Date         : 2020-01-04 14:48:30
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-01 17:12:00
 */

import React from 'react'
import { connect } from 'dva'
import BaseComponent from 'components/BaseComponent'
import Layout from 'components/Layout'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import { ModalForm } from 'components/Modal'
import DataTable from 'components/DataTable'
import createColumns from './columns'

import './index.less'

let loaded = false
@connect(({ apiResource, loading, global }) => ({
  apiResource,
  loading: loading.models.apiResource,
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
        type: 'apiResource/init',
      })
    }
  }

  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'apiResource/delete',
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
      apiResource,
      loading,
      global: { functionAuthority },
    } = this.props
    let { parameters, pageData } = apiResource
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
          type: 'apiResource/getPageInfo',
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

      onSubmit: (values) => {
        dispatch({
          type: 'apiResource/submit',
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
      <Layout className="full-layout page">
        <Layout.Content>
          <Panel header={null}>
            <Toolbar>
              <Search
                placeholder="API名称 / 展示名称"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'apiResource/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value,
                      },
                    },
                  })
                }}
                onSearch={(value) => {
                  dispatch({
                    type: 'apiResource/getPageInfo',
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
                    type: 'apiResource/@change',
                    payload: {
                      parameters: {},
                    },
                  })
                  dispatch({
                    type: 'apiResource/init',
                    payload: {
                      pageData: pageData.startPage(),
                    },
                  })
                }}
              >
                刷新
              </Button>
              <Button
                display={functionAuthority.indexOf('btnAdd') > -1}
                type="primary2"
                className="toolbar-item"
                icon="plus"
                onClick={this.onAdd}
              >
                新增
              </Button>
            </Toolbar>
            <DataTable {...dataTableProps} />
            <ModalForm {...modalFormProps} />
          </Panel>
        </Layout.Content>
      </Layout>
    )
  }
}

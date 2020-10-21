/*
 * @Descripttion : 客户端管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-04 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-01 17:11:15
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
@connect(({ client, loading, global }) => ({
  client,
  loading: loading.models.client,
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
        type: 'client/init',
      })
    }
  }

  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'client/delete',
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
      client,
      loading,
      global: { functionAuthority },
    } = this.props
    let { parameters, pageData, clientType } = client
    let expand = { clientType, record, functionAuthority }
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
          type: 'client/getPageInfo',
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
        values.isPublic = values.isPublic ? 1 : 0 //switch 值是true/false
        dispatch({
          type: 'client/submit',
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
                placeholder="客户端名称 / 客户端简称"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'client/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value,
                      },
                    },
                  })
                }}
                onSearch={(value) => {
                  dispatch({
                    type: 'client/getPageInfo',
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
                    type: 'client/@change',
                    payload: {
                      parameters: {},
                    },
                  })
                  dispatch({
                    type: 'client/init',
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

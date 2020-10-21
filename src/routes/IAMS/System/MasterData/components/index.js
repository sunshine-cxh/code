/*
 * @Descripttion : 数据字典类别
 * @Author       : wuhaidong
 * @Date         : 2020-01-04 17:48:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-01 17:09:31
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
@connect(({ masterData, loading, global }) => ({
  masterData,
  loading: loading.models.masterData,
  global
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'masterData/init'
      })
    }
  }

  handleDelete = records => {
    let { dispatch } = this.props
    let id = records[0].id
    dispatch({
      type: 'masterData/delete',
      payload: {
        id,
        success: () => { }
      }
    })
  }

  render() {
    let { record, visible } = this.state
    let { dispatch, masterData, loading, global: { functionAuthority } } = this.props
    let { parameters, listData, masterDataType, expandedRowKeys } = masterData
    let expand = { masterDataType, record, functionAuthority }
    let columns = createColumns(this, expand)
    let tableData = {
      list: listData
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
          type: 'masterData/@change',
          expandedRowKeys
        })
      }
    }

    let modalFormProps = {
      record,
      visible,
      columns: columns,
      modalOpts: {
        width: 740
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        })
      },
      onSubmit: values => {
        dispatch({
          type: 'masterData/submit',
          payload: {
            values,
            success: () => {
              this.setState({
                record: null,
                visible: false
              })
            }
          }
        })


      }
    }

    return (
      <Layout className="full-layout page">
        <Layout.Content>
          <Panel header={null}>
            <Toolbar>
              <Search
                placeholder="类别名称 / 类别编码"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'masterData/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value
                      },
                    }
                  })
                }}
                onSearch={value => {
                  dispatch({
                    type: 'masterData/getPageInfo',
                    payload: {
                      values: {
                        keyword: value,
                      }
                    }
                  })
                }}
              />
              <Button
                type="primary2"
                className="toolbar-item"
                icon="reload"
                onClick={() => {
                  dispatch({
                    type: 'masterData/@change',
                    payload: {
                      parameters: {},
                    }
                  })
                  dispatch({
                    type: 'masterData/init',
                    payload: {}
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

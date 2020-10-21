/*
 * @Descripttion : 组织管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-03 11:19:47
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-01 17:49:42
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
import Select from 'components/Select'
import createColumns from './columns'

import './index.less'

let loaded = false
@connect(({ organization, loading, global }) => ({
  organization,
  loading: loading.models.organization,
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
        type: 'organization/init',
      })
    }
  }

  // 删除
  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'organization/delete',
      payload: {
        id,
        success: () => {},
      },
    })
  }

  // 修改
  handleUpdate = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'organization/getOrganizationType',
      payload: {
        enterpriseId: record.enterpriseId,
        success: () => {
          this.setState({
            record,
            visible: true,
          })
        },
      },
    })
  }

  render() {
    let { record, visible } = this.state
    let {
      dispatch,
      organization: {
        parameters,
        listData,
        organizationType,
        expandedRowKeys,
        enterpriseList,
        toolbarSelectorValue,
        modalEnterpriseSelectorValue,
      },
      loading,
      global: { functionAuthority },
    } = this.props

    let expand = {
      organizationType,
      record,
      functionAuthority,
      enterpriseList,
      modalEnterpriseSelectorValue,
      toolbarSelectorValue,
    }
    let columns = createColumns(this, expand)
    let tableData = {
      list: listData,
    }

    // let selectProps = {
    //   options: enterpriseList,
    //   value: toolbarSelectorValue,
    //   onChange: (value, option) => {
    //     dispatch({
    //       type: 'organization/getPageInfo',
    //       payload: {
    //         values: {
    //           enterpriseId: value,
    //         },
    //       },
    //     })
    //     dispatch({
    //       type: 'organization/@change',
    //       payload: {
    //         toolbarSelectorValue: value,
    //       },
    //     })
    //     dispatch({
    //       type: 'organization/getOrganizationType',
    //       payload: {
    //         enterpriseId: value,
    //       },
    //     })
    //   },
    // }

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
          type: 'organization/@change',
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
          type: 'organization/submit',
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
              {/* <Select {...selectProps} /> */}
              <Search
                placeholder="组织名称 / 组织编码"
                // className="toolbar-item"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'organization/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value,
                      },
                    },
                  })
                }}
                onSearch={(value) => {
                  dispatch({
                    type: 'organization/getPageInfo',
                    payload: {
                      values: {
                        keyword: value,
                        enterpriseId: toolbarSelectorValue,
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
                    type: 'organization/@change',
                    payload: {
                      parameters: {},
                    },
                  })
                  dispatch({
                    type: 'organization/init',
                    payload: {},
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

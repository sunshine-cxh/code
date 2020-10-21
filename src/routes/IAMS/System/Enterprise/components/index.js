/*
 * @Descripttion : 企业管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-04 11:20:33
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-01 17:10:34
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
import { notice } from 'components/Notification'
import createColumns from './columns'

import './index.less'

import moment from 'moment'

let loaded = false
@connect(({ enterprise, loading, global }) => ({
  enterprise,
  loading: loading.models.enterprise,
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
        type: 'enterprise/init',
      })
    }
  }

  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'enterprise/delete',
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
      enterprise,
      loading,
      global: { functionAuthority },
    } = this.props
    let {
      parameters,
      pageData,
      organizationType,
      industryType,
      enterpriseScale,
    } = enterprise
    let expand = {
      organizationType,
      industryType,
      record,
      functionAuthority,
      enterpriseScale,
    }
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
          type: 'enterprise/getPageInfo',
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
        values.enableDate = values.enableDate.format('YYYY-MM-DD')
        values.expirationDate = values.expirationDate.format('YYYY-MM-DD')
        if (moment(values.enableDate).isBefore(values.expirationDate)) {
          dispatch({
            type: 'enterprise/submit',
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
        } else {
          notice.error('启用日期不能大于过期日期')
        }
      },
    }

    return (
      <Layout className="full-layout page">
        <Layout.Content>
          <Panel header={null}>
            <Toolbar>
              <Search
                placeholder="企业名称 / 企业编码"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'enterprise/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value,
                      },
                    },
                  })
                }}
                onSearch={(value) => {
                  dispatch({
                    type: 'enterprise/getPageInfo',
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
                    type: 'enterprise/@change',
                    payload: {
                      parameters: {},
                    },
                  })
                  dispatch({
                    type: 'enterprise/init',
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

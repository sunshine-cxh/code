import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { Switch } from 'dva/router'
import { createColumns, createFormColumns } from './columns'
import { Modal } from 'components/Modal'
import '../style/index.less'
import $$ from 'cmn-utils'
import SearchLayout from 'components/SearchLayout'
import { routesPrefix } from '../../../config'
import Layout from 'components/Layout'
import Panel from 'components/Panel'

let loaded = false
@connect(({ recipients, loading }) => ({
  recipients,
  loading: loading.models.recipients,
}))
export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
    visible: false,
  }
  componentDidMount() {
    if (!loaded) {
      loaded = true
      let { dispatch } = this.props
      dispatch({
        type: 'recipients/init',
      })
    }
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword) => {
    const {
      recipients: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'recipients/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(),
      },
    })
  }
  handleDetails = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'recipientsDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          $$.setStore('pre-route-path', `${routesPrefix}/recipients`)
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/recipients/subRecipientsDetail`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  handleCheck = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'recipients/getauditflowchart',
      payload: {
        id: record.id,
        success: () => {
          this.onVisible(true)
        },
      },
    })
  }
  handleReturn = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'recipientsReturn/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/recipients/subRecipientsReturn`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  deleteFn = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'recipients/delete',
      payload: {
        id: record.id,
        success: () => { },
      },
    })
  }
  handleDelete = (record) => {
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        this.deleteFn(record)
      },
      onCancel() { },
    })
  }
  onVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  // 新增采购计划
  handleAdd = () => {
    let { dispatch } = this.props
    // 跳转 新增采购计划 路由
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/recipients/subRecipientsAdd`,
      })
    )
  }
  // 刷新
  handleReload = () => {
    const {
      recipients: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'recipients/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'recipients/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  render() {
    const { state } = this
    let { dispatch, recipients, loading, routerData: { childRoutes }, } = this.props
    let { pageData, popoverVisible, parameters, isCurrentRoute } = recipients
    let columns = createColumns(this)
    let formColumns = createFormColumns(this)
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'recipients/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }), //表格有复选框选项
    }
    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          code: form.code,
          user: form.user,
          title: form.title,
          startTime: form.leadtime && form.leadtime[0] && form.leadtime[0].format('YYYY-MM-DD'),
          endTime: form.leadtime && form.leadtime[1] && form.leadtime[1].format('YYYY-MM-DD'),
        }
        const {
          recipients: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'recipients/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'recipients/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: pageData.startPage(),
          },
        })
      },
      popoverVisible,
      popoverChange: () => {
        dispatch({
          type: 'recipients/@change',
          payload: {
            popoverVisible: true,
          },
        })
      },
    }
    return (
      <Layout
        className="page"
        onClick={() => {
          dispatch({
            type: 'recipients/@change',
            payload: {
              popoverVisible: false,
            },
          })
        }}
      >
        {isCurrentRoute ? (
          <Panel header={null}>
            <section className="search-area">
              <Toolbar>
                <Search
                  placeholder="领用单号 / 标题"
                  value={parameters.keyword}
                  onChange={(e) => {
                    dispatch({
                      type: 'recipients/@change',
                      payload: {
                        parameters: {
                          keyword: e.target.value,
                        },
                      },
                    })
                  }}
                  onSearch={this.searchHandler}
                />

                <Button
                  type="primary2"
                  className="toolbar-item"
                  onClick={this.handleReload}
                  icon="reload"
                >
                  刷新
            </Button>

                <Button onClick={this.handleAdd} type="primary2" className="toolbar-item" icon="plus">
                  新增
            </Button>
                <SearchLayout {...searchLayoutProps}></SearchLayout>
              </Toolbar>
            </section>
            <DataTable {...dataTableProps} />
          </Panel>
        ) : null}
        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 11:21:57
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 14:51:32
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'
import { Switch } from 'dva/router'
const { Content } = Layout
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import SearchLayout from 'components/SearchLayout'
import { createFormColumns, createColumns } from './columns'
import { routerRedux } from 'dva/router'
import { Modal } from 'components/Modal'
import CheckFlow from './CheckFlow'
import { routesPrefix } from '../../../config'
import $$ from 'cmn-utils';
let loaded = false
@connect(({ sell, loading }) => ({
  sell,
  loading: loading.models.sell,
}))
export default class extends BaseComponent {
  state = {
    visible: false,
  }
  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'sell/init',
      })
    }
  }
  // 刷新
  handleReload = () => {
    const {
      sell: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'sell/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'sell/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  handleCheck = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'sell/getauditflowchart',
      payload: {
        id: record.id,
        success: () => {
          this.onVisible(true)
        },
      },
    })
  }
  onVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  deleteFn = (record) => {
    let {
      sell: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: `sell/delete`,
      payload: {
        id: record.id,
        success: () => {
          dispatch({
            type: 'sell/getPageInfo',
            payload: {
              pageData: pageData.startPage(),
            },
          })
        },
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
      onCancel() {},
    })
  }
  handleEdit = (record) => {
    let { dispatch } = this.props

    dispatch({
      type: 'sellAdd/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/sell/subSellAdd`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  handleDetails = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'sellDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          $$.setStore('pre-route-path', `${routesPrefix}/sell`)
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/sell/subSellDetail`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword) => {
    const {
      sell: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'sell/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(),
      },
    })
  }
  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/sell/subSellAdd`,
      })
    )
  }
  render() {
    let {
      routerData: { childRoutes },
      sell: { isCurrentRoute, parameters, pageData, popoverVisible },
      dispatch,
      loading,
    } = this.props
    let columns = createColumns(this)
    let formColumns = createFormColumns(this)
    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          code: form.code,
          createdName: form.createdName,
          isCommit: form.isCommit,
          startTime: form.applyTime && form.applyTime[0] && form.applyTime[0].format('YYYY-MM-DD'),
          endTime: form.applyTime && form.applyTime[1] && form.applyTime[1].format('YYYY-MM-DD'),
        }
        const {
          sell: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'sell/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'sell/getPageInfo',
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
          type: 'sell/@change',
          payload: {
            popoverVisible: true,
          },
        })
      },
    }
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'sell/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }), //表格有复选框选项
    }
    return (
      <Layout
        className="page"
        onClick={() => {
          dispatch({
            type: 'sell/@change',
            payload: {
              popoverVisible: false,
            },
          })
        }}
      >
        {isCurrentRoute ? (
          <Panel header={null}>
            <section>
              <Toolbar>
                <Search
                  placeholder="变卖单号 / 标题"
                  value={parameters.keyword}
                  onChange={(e) => {
                    dispatch({
                      type: 'sell/@change',
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
                <Button
                  type="primary2"
                  className="toolbar-item"
                  onClick={this.handleAdd}
                  icon="plus"
                >
                  新增
                </Button>
                <SearchLayout {...searchLayoutProps}></SearchLayout>
              </Toolbar>
            </section>
            <DataTable {...dataTableProps} />
            <CheckFlow visible={this.state.visible} onVisible={this.onVisible}></CheckFlow>
          </Panel>
        ) : null}

        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}

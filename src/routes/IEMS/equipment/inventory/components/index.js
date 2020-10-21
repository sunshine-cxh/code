/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 08:55:18
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-04 11:22:42
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'
import { Switch } from 'dva/router'
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import SearchLayout from 'components/SearchLayout'
import { createFormColumns, createColumns } from './columns'
import { routerRedux } from 'dva/router'
import Dispatch from './dispatch'
import '../style/index.less'
import PageHelper from 'utils/pageHelper'
import { PageHeader } from 'antd'
import { routesPrefix } from '../../../config'
import $$ from 'cmn-utils'
let loaded = false
@connect(({ inventory, loading }) => ({
  inventory,
  loading: loading.models.inventory,
}))
export default class extends BaseComponent {
  state = {
    visible: false,
  }
  componentDidMount() {
    let { dispatch } = this.props
    if (!loaded) {
      loaded = true
      dispatch({
        type: 'inventory/init',
      })
      dispatch({
        type: 'equipmentGlobal/getAllOrganization',
        payload: {
          enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
          namespace: 'inventory',
          valueField: 'organizationTree'
        },
      })
      dispatch({
        type: 'equipmentGlobal/getUser',
        payload: {
          namespace: 'inventory',
          valueField: 'allUserList',
        },
      })
    }
  }
  handleDetail = (record)=> {
    let { dispatch } = this.props
    dispatch({
      type: `inventoryDetail/getDetails`,
      payload: {
        id: record.id,
        pageData: PageHelper.create().startPage(1, 10000),
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/inventory/subInventoryDetail`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  // 刷新
  handleReload = () => {
    const {
      inventory: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'inventory/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'inventory/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  handleDispatch(record) {
    let { dispatch } = this.props
    this.onChangeVisible(true)
    dispatch({
      type: 'inventory/@change',
      payload: {
        currentId: record.id,
      },
    })
  }
  onChangeVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  handleEdit = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: `inventoryAdd/getDetails`,
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/inventory/subInventoryAdd`,
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
      inventory: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'inventory/getPageInfo',
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
        pathname: `${routesPrefix}/inventory/subInventoryAdd`,
      })
    )
  }
  handleInventory = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: `inventoryOperat/getDetailsForm`,
      payload: {
        id: record.id,
        pageData: PageHelper.create(),
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/inventory/subInventoryOperat`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  render() {
    let {
      routerData: { childRoutes },
      inventory: { isCurrentRoute, parameters, pageData, popoverVisible },
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
          operatorId: form.operatorId,
          state: form.state,
          scopeType: form.scopeType,
          planTimeStart: form.planTime && form.planTime[0] && form.planTime[0].format('YYYY-MM-DD'),
          planTimeEnd: form.planTime && form.planTime[1] && form.planTime[1].format('YYYY-MM-DD'),
        }
        const {
          inventory: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'inventory/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'inventory/getPageInfo',
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
          type: 'inventory/@change',
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
          type: 'inventory/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }), //表格有复选框选项
    }
    let dispatchProps = {
      visible: this.state.visible,
      onChangeVisible: (visible) => {
        this.setState({
          ...this.state,
          visible,
        })
      },
    }
    return (
      <Layout
        className="page"
        onClick={() => {
          dispatch({
            type: 'inventory/@change',
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
                  placeholder="盘点单号"
                  value={parameters.keyword}
                  onChange={(e) => {
                    dispatch({
                      type: 'inventory/@change',
                      payload: {
                        parameters: {
                          keyword: e.target.value,
                        },
                      },
                    })
                  }}
                  onSearch={this.searchHandler}
                />
                <Button type="primary2" className="toolbar-item" onClick={this.handleReload} icon="reload">
                  刷新
                </Button>
                <Button type="primary2" className="toolbar-item" onClick={this.handleAdd} icon="plus">
                  新增
                </Button>
                <SearchLayout {...searchLayoutProps}></SearchLayout>
              </Toolbar>
            </section>
            <DataTable {...dataTableProps} />
          </Panel>
        ) : null}

        <Switch>{childRoutes}</Switch>
        <Dispatch {...dispatchProps}></Dispatch>
      </Layout>
    )
  }
}

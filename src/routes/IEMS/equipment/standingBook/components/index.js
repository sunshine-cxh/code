/*
 * @Descripttion : 采购计划页面
 * @Author       : luo jun
 * @Date         : 2020-03-20 08:35:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 16:28:07
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
import { Link } from 'dva/router'
import SearchLayout from 'components/SearchLayout'
import { createFormColumns, createColumns } from './columns'
import { routerRedux } from 'dva/router'
import { Modal } from 'components/Modal'
import $$ from 'cmn-utils'
import { changeStorage } from 'utils/storage'
import { routesPrefix } from '../../../config'

let loaded = false
@connect(({ standingBook, loading }) => ({
  standingBook,
  loading: loading.models.standingBook,
}))
export default class extends BaseComponent {
  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'standingBook/init',
      })
    }
    this.props.dispatch({
      type: 'equipmentGlobal/getAddress',
      payload: {
        namespace: 'standingBook',
        valueField: 'addressList',
        success: () => {},
      },
    })
  }
  // 刷新
  handleReload = () => {
    const {
      standingBook: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'standingBook/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'standingBook/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  deleteFn = (record) => {
    let {
      standingBook: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: `standingBook/delete`,
      payload: {
        id: record.id,
        success: () => {
          dispatch({
            type: 'standingBook/getPageInfo',
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
  handleDetail = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'standingBookDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/standingBook/substandingBookDetail`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  handleEdit = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'standingBookAdd/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/standingBook/substandingBookAdd`,
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
      standingBook: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'standingBook/getPageInfo',
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
        pathname: `${routesPrefix}/standingBook/substandingBookAdd`,
      })
    )
  }
  render() {
    let {
      routerData: { childRoutes },
      standingBook: { isCurrentRoute, parameters, pageData, popoverVisible },
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
          name: form.name,
          cateId: form.cateId,
          gasStationDistrictId:
            form.gasStationDistrictId &&
            Array.isArray(form.gasStationDistrictId) &&
            form.gasStationDistrictId[form.gasStationDistrictId.length - 1],
          foreignType: form.foreignType,
        }
        const {
          standingBook: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'standingBook/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'standingBook/getPageInfo',
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
          type: 'standingBook/@change',
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
          type: 'standingBook/getPageInfo',
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
            type: 'standingBook/@change',
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
                  placeholder="设备编号 / 设备名称"
                  value={parameters.keyword}
                  onChange={(e) => {
                    dispatch({
                      type: 'standingBook/@change',
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
          </Panel>
        ) : null}

        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}

import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'

import { createColumns, createFormColumns } from './columns'
import CheckFlow from './CheckFlow'
import { Modal } from 'components/Modal'
// import  CheckFlow from './CheckFlowCopy'
import '../../style/queryMain.less'
import $$ from 'cmn-utils'
import SearchLayout from 'components/SearchLayout'
import { routesPrefix, routes } from '../../../../config'

let loaded = false
@connect(({ external, loading }) => ({
  external,
  loading: loading.models.external,
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
        type: 'external/init',
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
      external: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'external/getPageInfo',
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
      type: 'externalDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          $$.setStore('pre-route-path', `${routesPrefix}/external`)
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/external/subExternalDetail`,
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
      type: 'external/getauditflowchart',
      payload: {
        id: record.id,
        success: () => {
          this.onVisible(true)
        },
      },
    })
  }
  handleEdit = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'externalAdd/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/external/subExternalAdd`,
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
      type: 'external/delete',
      payload: {
        id: record.id,
        success: () => {},
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
        pathname: `${routesPrefix}/external/subExternalAdd`,
      })
    )
  }
  // 刷新
  handleReload = () => {
    const {
      external: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'external/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'external/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  render() {
    const { state } = this
    let { dispatch, external, loading } = this.props
    let { pageData, popoverVisible, parameters } = external
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
          type: 'external/getPageInfo',
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
          acceptance: form.acceptance,
          isCommit: form.auditStatus,
          startDate:
            form.createTime && form.createTime[0] && form.createTime[0].format('YYYY-MM-DD'),
          endDate: form.createTime && form.createTime[1] && form.createTime[1].format('YYYY-MM-DD'),
        }
        const {
          external: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'external/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'external/getPageInfo',
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
          type: 'external/@change',
          payload: {
            popoverVisible: true,
          },
        })
      },
    }
    return (
      <div className="procurement-plan__query">
        <section className="search-area">
          <Toolbar>
            <Search
              placeholder="设备编号 / 申请单号"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'external/@change',
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
        <CheckFlow visible={this.state.visible} onVisible={this.onVisible}></CheckFlow>
      </div>
    )
  }
}

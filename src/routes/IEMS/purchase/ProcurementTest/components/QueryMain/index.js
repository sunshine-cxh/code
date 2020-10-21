import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'

import { Link } from 'dva/router'
import { createColumns, createFormColumns } from './columns'
import SearchLayout from 'components/SearchLayout'
import $$ from 'cmn-utils'
import { Modal } from 'components/Modal'

import '../../style/queryMain.less'
import { routesPrefix } from '../../../../config'
let loaded = false
@connect(({ procurementTest, loading }) => ({
  procurementTest,
  loading: loading.models.procurementTest,
}))
export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
  }
  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'procurementTest/init',
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
      procurementTest: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'procurementTest/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(),
      },
    })
  }
  deleteFn = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'procurementTest/delete',
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
  handleAdd = () => {
    // 跳转 新增采购计划 路由
    this.props.dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/procurementTest/subProcurementTestAdd`,
      })
    )
  }
  handleReload = () => {
    const {
      procurementTest: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'procurementTest/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'procurementTest/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  handleDetails = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'procurementTestDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/procurementTest/subProcurementTestDetail`,
              search: `id=${record.id}`
            })
          )
        },
      },
    })
  }
  render() {
    let {
      dispatch,
      procurementTest: { parameters, pageData, popoverVisible },
      loading,
    } = this.props
    let columns = createColumns(this)
    let formColumns = createFormColumns(this)

    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      onChange({ pageNum, pageSize }) {
        dispatch({
          type: 'procurementTest/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }

    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          sn: form.sn,
          title: form.title,
          ApprovalTimeStart:
            form.ApprovalTime &&
            form.ApprovalTime[0] &&
            form.ApprovalTime[0].format('YYYY-MM-DD'),
          ApprovalTimeEnd:
            form.ApprovalTime &&
            form.ApprovalTime[1] &&
            form.ApprovalTime[1].format('YYYY-MM-DD'),
        }

        // 隐藏 popover
        dispatch({
          type: 'procurementTest/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'procurementTest/getPageInfo',
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
          type: 'procurementTest/@change',
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
              placeholder="编号 / 标题"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'procurementTest/@change',
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
              icon="reload"
              onClick={this.handleReload}
            >
              刷新
            </Button>
            <Button
              onClick={this.handleAdd}
              type="primary2"
              className="toolbar-item"
              icon="plus"
            >
              新增
            </Button>
            <SearchLayout {...searchLayoutProps}></SearchLayout>
          </Toolbar>
        </section>
        <DataTable {...dataTableProps} />
        <DataTable.Pagination {...dataTableProps} />
      </div>
    )
  }
}

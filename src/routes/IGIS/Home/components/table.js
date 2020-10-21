/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-07-01 15:13:59
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-10 11:32:47
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon } from 'antd'
import { routerRedux } from 'dva/router'

import Button from 'components/Button'
import Search from 'components/Search'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { createColumns } from './columns'
import { Modal } from 'components/Modal'

let loaded = false
@connect(({ geographyHome, loading }) => ({
  geographyHome,
  loading: loading.models.geographyHome,
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
    this.props.dispatch({
      type: 'geographyHome/init',
    })
  }
  // 搜索
  searchHandler = (keyword) => {
    const { dispatch } = this.props
    dispatch({
      type: 'geographyHome/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(1, 10, 'PublishDate', 'desc'),
      },
    })
  }
  // 详情
  handleDetails = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'geographyHome/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routePrefix}/content/subContentDetail`,
              search: `id=${record.id}&isApproval=${record.isApproval}`,
            })
          )
        },
      },
    })
  }

  onVisible = (visible) => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { state } = this
    let { geographyHome, loading, parameters, tableState } = this.props
    let { pageData } = geographyHome

    let columns = createColumns(this)
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'geographyHome/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }), //表格有复选框选项
    }

    return (
      <div className="table active">
        <div className="table-title">
          <h2>数据分析</h2>
          <div className="table-tool">
            <Search
              placeholder="关键字"
              value=""
              onChange={(e) => {
                dispatch({
                  type: 'Content/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={this.searchHandler}
            />
            <Icon
              type="close"
              className="table-icon"
              onClick={() => {
                this.props.tableChange()
              }}
            />
          </div>
        </div>

        <DataTable {...dataTableProps} className="table-content" />
      </div>
    )
  }
}

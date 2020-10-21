/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-07-01 15:13:59
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-24 11:36:40
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
@connect(({ geographyBackstage, loading }) => ({
  geographyBackstage,
  loading: loading.models.geographyBackstage,
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
      type: 'geographyBackstage/init',
    })
  }
  // 搜索
  searchHandler = (keyword) => {
    const { dispatch } = this.props
    dispatch({
      type: 'geographyBackstage/getPageInfo',
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
      type: 'geographyBackstage/getDetails',
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
  tableVisible(key) {
    let { dispatch } = this.props

    dispatch({
      type: 'geographyBackstage/@change',
      payload: {
        tableVisible: false,
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
    let { geographyBackstage, loading, parameters, tableState } = this.props
    let { pageData } = geographyBackstage

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
                this.tableVisible()
              }}
            />
          </div>
        </div>

        <DataTable {...dataTableProps} className="table-content" />
      </div>
    )
  }
}

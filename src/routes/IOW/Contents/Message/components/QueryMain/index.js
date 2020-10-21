import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'
import { createColumns } from './columns'
import { routePrefix } from '../../../../config'

import '../../style/queryMain.less'
import $$ from 'cmn-utils'
import SearchLayout from 'components/SearchLayout'
import { notice } from 'components/Notification'

let loaded = false
@connect(({ Message, loading }) => ({
  Message,
  loading: loading.models.Message,
}))
export default class Main extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
    visible: false,
  }
  componentDidMount() {
    $$.removeStore('message-id')
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'Message/init',
      })
    }
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  handleReload = () => {
    const {
      Message: { parameters},
      dispatch,
    } = this.props
    parameters.keyword = ''
    dispatch({
      type: 'Message/init',
    })
  }
  // 搜索
  searchHandler = (keyword) => {
    const {
      Message: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'Message/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(),
        success:()=>{
          for(var key in keyword){
            delete keyword[key]
          }
        }
      },
    })
  }
  // 详情
  handleDetails = (record, status) => {
    const { dispatch } = this.props

    dispatch({
      type: 'Message/getDetails',
      payload: {
        id: record.id,
        success: () => {
          $$.setStore('message-id', record.id)
          dispatch(
            routerRedux.push({
              pathname: `${routePrefix}//message/subMessageEdit`,
            })
          )
        },
      },
    })
  }
  // 删除
  handleDelete = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'Message/delete',
      payload: {
        id: record.id,
        success: () => {
          notice.success('删除成功')
        },
      },
    })
  }
  onVisible = (visible) => {
    this.setState({
      visible,
    })
  }

  render() {
    const { state } = this
    let { dispatch, Message, loading } = this.props
    let { pageData, popoverVisible, parameters } = Message
    let columns = createColumns(this, this.state.record)
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'Message/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },

        })
      },
      onSelect: (keys, rows) => this.setState({ rows }), //表格有复选框选项
    }
    return (
      <div className="procurement-plan__query">
        <section className="search-area">
          <Toolbar>
            <Search
              placeholder="关键字"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'Message/@change',
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
            {/* <SearchLayout {...searchLayoutProps}></SearchLayout> */}
          </Toolbar>
        </section>
        <DataTable {...dataTableProps} />
      </div>
    )
  }
}

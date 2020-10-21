import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { createColumns, createFormColumns } from './columns'
import $$ from 'cmn-utils'
import SearchLayout from 'components/SearchLayout'
import { Modal } from 'components/Modal'
import { routePrefix } from '../../../../config'

import '../../style/queryMain.less'

let loaded = false
@connect(({ Content, loading }) => ({
  Content,
  loading: loading.models.Content,
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
      type: 'Content/init',
    })
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  handleReload = () => {
    const {
      Content: { parameters },
      dispatch,
    } = this.props
    parameters.keyword = ''
    dispatch({
      type: 'Content/init',
    })
  }
  // 搜索
  searchHandler = (keyword) => {
    const {
      Content: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'Content/getPageInfo',
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
      type: 'Content/getDetails',
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
  // 编辑
  handleUpdate = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'Content/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routePrefix}/content/subContentEdit`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  // 删除
  handleDelete = (record) => {
    const { dispatch } = this.props
    Modal.confirm({
      title: '提示',
      content: `确定要删除${record.title}?`,
      onOk: () => {
        dispatch({
          type: 'Content/delete',
          payload: {
            id: record.id,
            success: () => {
              dispatch()
            },
          },
        })
      },
      onCancel() {},
    })
  }
  onVisible = (visible) => {
    this.setState({
      visible,
    })
  }

  render() {
    const { state } = this
    let { dispatch, Content, loading } = this.props
    let { pageData, popoverVisible, parameters } = Content
    let columns = createColumns(this, Content.contentType)
    let formColumns = createFormColumns(this, Content.contentType)
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'Content/getPageInfo',
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
        const {
          Content: { pageData },
          dispatch,
        } = this.props

        let forms = {
          contentType: form.contentType,
          title: form.title,
          isApproval: form.isApproval,
          isDisplay: form.isDisplay,
          isPublic: form.isPublic,
          publishDateBegin: form.createTime && form.createTime[0] && form.createTime[0].format('YYYY-MM-DD'),
          publishDateEnd: form.createTime && form.createTime[1] && form.createTime[1].format('YYYY-MM-DD'),
        }
        dispatch({
          type: 'Content/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: pageData.startPage(1, 10, 'PublishDate', 'desc'),
            success: () => {},
          },
        })

        // 隐藏 popover
        dispatch({
          type: 'Content/@change',
          payload: {
            popoverVisible: false,
          },
        })
      },
      popoverVisible,
      popoverChange: () => {
        dispatch({
          type: 'Content/@change',
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
              placeholder="标题"
              value={parameters.keyword}
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
            <Button type="primary2" className="toolbar-item" icon="reload" onClick={this.handleReload}>
              刷新
            </Button>
            <Link to={`${routePrefix}/content/subContentEdit`}>
              <Button type="primary2" className="toolbar-item" icon="plus">
                新增
              </Button>
            </Link>
            <SearchLayout {...searchLayoutProps}></SearchLayout>
          </Toolbar>
        </section>
        <DataTable {...dataTableProps} />
      </div>
    )
  }
}

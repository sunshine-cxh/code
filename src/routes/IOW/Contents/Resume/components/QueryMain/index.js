import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import downloadFile, { getFileType } from 'utils/fileHandler'
import { routePrefix } from '../../../../config'

import { createColumns, createFormColumns } from './columns'

import '../../style/queryMain.less'
import $$ from 'cmn-utils'
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ Resume, loading }) => ({
  Resume,
  loading: loading.models.Resume,
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
      this.props.dispatch({
        type: 'Resume/init',
      })
    }
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  // 刷新
  handleReload = () => {
    const {
      Resume: { parameters},
      dispatch,
    } = this.props
    parameters.keyword = ''
    dispatch({
      type: 'Resume/init',
    })
  }
  // 搜索
  searchHandler = (keyword) => {
    const {
      Resume: { pageData},
      dispatch,
    } = this.props

    dispatch({
      type: 'Resume/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(),
        success: () => {
          keyword = ''
        },
      },
    })
  }
  // 详情
  handleDownload = (record) => {
    let recordFileId = { id: record.fileId }
    downloadFile(recordFileId)
  }
  // 编辑
  handleUpdate = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'Resume/getDetails',
      payload: {
        id: record.id,
        success: () => {
          $$.setStore('resume-id', record.id)
          dispatch(
            routerRedux.push({
              pathname: `${routePrefix}/Resume/SubContentEdit`,
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
      type: 'Resume/delete',
      payload: {
        id: record.id,
        success: () => {
          $$.setStore('resume-id', record.id)
          dispatch()
          // routerRedux.push({
          //   pathname: `/officialWebsite/content`,
          // })
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
    let { dispatch, Resume, loading } = this.props
    let { pageData, popoverVisible, parameters } = Resume
    let columns = createColumns(this, this.state.record)
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
          type: 'Resume/getPageInfo',
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
          Resume: { pageData },
          dispatch,
        } = this.props

        let forms = {
          contentType: form.contentType,
          title: form.title,
          isApproval: form.isApproval,
          isDisplay: form.isDisplay,
          isPublic: form.isPublic,
          createTimeStart:
            form.createTime &&
            form.createTime[0] &&
            form.createTime[0].format('YYYY-MM-DD'),
          createTimeEnd:
            form.createTime &&
            form.createTime[1] &&
            form.createTime[1].format('YYYY-MM-DD'),
        }
        dispatch({
          type: 'Resume/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: pageData.startPage(),
          },
        })

        // 隐藏 popover
        dispatch({
          type: 'Resume/@change',
          payload: {
            popoverVisible: false,
          },
        })
      },
      popoverVisible,
      popoverChange: () => {
        dispatch({
          type: 'Resume/@change',
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
                  type: 'Resume/@change',
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

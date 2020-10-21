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
import { routesPrefix } from '../../../../config'
let loaded = false
@connect(({ procurementPlan, loading }) => ({
  procurementPlan,
  loading: loading.models.procurementPlan,
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
        type: 'procurementPlan/init',
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
      procurementPlan: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'procurementPlan/getPageInfo',
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
      type: 'procurementPlanDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          $$.setStore('pre-route-path', `${routesPrefix}/procurementPlan`)
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/procurementPlan/subProcurementPlanDetail`,
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
      type: 'procurementPlan/getauditflowchart',
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
      type: 'procurementPlanAdd/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/procurementPlan/subProcurementPlanAdd`,
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
      type: 'procurementPlan/delete',
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
        pathname: `${routesPrefix}/procurementPlan/subProcurementPlanAdd`,
      })
    )
  }
  // 刷新
  handleReload = () => {
    const {
      procurementPlan: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'procurementPlan/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'procurementPlan/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  render() {
    const { state } = this
    let { dispatch, procurementPlan, loading } = this.props
    let { pageData, popoverVisible, parameters } = procurementPlan
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
          type: 'procurementPlan/getPageInfo',
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
          sn: form.sn,
          title: form.title,
          auditStatus: form.auditStatus,
          createTimeStart:
            form.createTime && form.createTime[0] && form.createTime[0].format('YYYY-MM-DD'),
          createTimeEnd:
            form.createTime && form.createTime[1] && form.createTime[1].format('YYYY-MM-DD'),
        }
        const {
          procurementPlan: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'procurementPlan/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'procurementPlan/getPageInfo',
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
          type: 'procurementPlan/@change',
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
              placeholder="计划单号 / 标题"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'procurementPlan/@change',
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

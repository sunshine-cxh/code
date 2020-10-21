/*
 * @Descripttion : 巡检计划页面
 * @Author       : caojiarong
 * @Date         : 2020-06-08 11:15:10
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 10:10:54
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { routesPrefix } from '../../../config'
import { Modal } from 'components/Modal'
import { createColumns, createFormColumns } from './columns'

import '../style/index.less'
import $$ from 'cmn-utils'
import SearchLayout from 'components/SearchLayout'
// import CheckFlow from './CheckFlow'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import { Switch } from 'dva/router'
import PageHelper from 'utils/pageHelper'
let loaded = false
@connect(({ patrolPlan, loading }) => ({
  patrolPlan,
  loading: loading.models.patrolPlan,
}))
export default class patrolPlan extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
    visible: false,
    // flowVisible:false
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'patrolPlan/init',
    })

    this.props.dispatch({
      type: 'patrolPlan/@change',
      payload: {
        popoverVisible: false,
      },
    })
    this.props.dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'patrolPlan',
        valueField: 'allUserList',
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
      patrolPlan: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'patrolPlan/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(),
      },
    })
  }
  // 停止函数
  stopFn = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'patrolPlan/stopPlan',
      payload: {
        id: record.id,
        success: () => {
          dispatch({
            type: 'patrolPlan/getPageInfo',
            payload: {
              values: {},
              pageData: PageHelper.create(),
            },
          })
        },
      },
    })
  }

  handleStop = (record) => {
    Modal.confirm({
      title: '注意',
      content: '是否要停止这个任务？',
      onOk: () => {
        this.stopFn(record)
      },
      onCancel() {},
    })
  }

  // 巡检计划详情
  handleDetails = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'patrolPlanDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/patrolPlan/subPatrolPlanDetail`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }

  // 修改巡检标注 TODO
  handleEdit = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'patrolPlanAdd/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/patrolPlan/subPatrolPlanAdd`,
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
      patrolPlan: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'patrolPlan/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'patrolPlan/getPageInfo',
      payload: {
        values: {},
        pageData: pageData.startPage(),
      },
    })
  }
  render() {
    let {
      dispatch,
      patrolPlan,
      loading,
      routerData: { childRoutes },
    } = this.props
    let { pageData, popoverVisible, warehouseList, isCurrentRoute, parameters } = patrolPlan
    let columns = createColumns(this, this.state.record)
    let formColumns = createFormColumns(this, warehouseList)
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'patrolPlan/getPageInfo',
          payload: {
            values: {},
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }), //表格有复选框选项
    }
    let filterLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          code: form.code,
          name: form.name,
          responserIds: form.responserIds,
          planStatus: form.planStatus
        }
        const {
          patrolPlan: { pageData },
          dispatch,
        } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'patrolPlan/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'patrolPlan/getPageInfo',
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
          type: 'patrolPlan/@change',
          payload: {
            popoverVisible: true,
          },
        })
      },
    }
    return (
      <Layout
        className="page"
        onClick={() => {
          dispatch({
            type: 'patrolPlan/@change',
            payload: {
              popoverVisible: false,
            },
          })
        }}
      >
        {isCurrentRoute ? (
          <Panel header={null}>
            <section className="search-area">
              <Toolbar>
                <Search
                  placeholder="计划编号 / 计划名称"
                  onSearch={this.searchHandler}
                  value={parameters.keyword}
                  onChange={(e) => {
                    dispatch({
                      type: 'patrolPlan/@change',
                      payload: {
                        parameters: {
                          keyword: e.target.value,
                        },
                      },
                    })
                  }}
                />
                <Button
                  type="primary2"
                  className="toolbar-item"
                  onClick={this.handleReload}
                  icon="reload"
                >
                  刷新
                </Button>
                <Link to={`${routesPrefix}/patrolPlan/subPatrolPlanAdd`}>
                  <Button type="primary2" className="toolbar-item" icon="plus">
                    新增
                  </Button>
                </Link>
                <SearchLayout {...filterLayoutProps} />
              </Toolbar>
            </section>
            <DataTable {...dataTableProps} />
            {/* <CheckFlow visible={this.state.flowVisible} onVisible={this.onFlowVisible}/> */}
          </Panel>
        ) : null}
        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}

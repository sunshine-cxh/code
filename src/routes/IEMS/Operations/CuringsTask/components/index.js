/*
 * @Descripttion : 养护任务
 * @Author       : hezihua
 * @Date         : 2020-06-08 11:35:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-07 18:12:52
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
import SearchLayout from 'components/SearchLayout'
import { createFormColumns, createColumns } from './columns'
import { routerRedux } from 'dva/router'
import '../style/index.less'
import { routesPrefix } from '../../../config'
import Dispatch from './dispatch'
import $$ from 'cmn-utils'
import { Modal } from 'components/Modal'
import PageHelper from 'utils/pageHelper'
let loaded = false
@connect(({ curingsTask, loading }) => ({
  curingsTask,
  loading: loading.models.curingsTask,
}))
export default class extends BaseComponent {
  componentDidMount() {
    const { dispatch } = this.props
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'curingsTask/init'
      })
    }
    this.props.dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'curingsTask',
        valueField: 'organizationTree'
      },
    })
    this.props.dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'curingsTask',
        valueField: 'allUserList',
      },
    })
  }
  state = {
    visible: false
  }
  // 刷新
  handleReload = () => {
    const { curingsTask: { pageData }, dispatch } = this.props
    dispatch({
      type: 'curingsTask/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'curingsTask/getPageInfo',
      payload: {
        pageData: pageData.startPage()
      }
    })
  }
  /**
   * 跳转详情页
   */
  handleDetail = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'curingsTaskDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/curingsTask/subCuringsTaskDetail`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
    
  }
  /**
   * 跳转执行页
   */
  handleOperate = (record) => {
    let { dispatch } = this.props
    dispatch(routerRedux.push({
      pathname: `${routesPrefix}/curingsTask/subCuringsTaskOperate`,
      search: `id=${record.id}`,
    }))
  }
  /**
   * 跳转上报页
   */
  handleSubmit = (record) => {
    let { dispatch } = this.props
    dispatch(routerRedux.push({
      pathname: `${routesPrefix}/curingsTask/subCuringsTaskSubmit`,
      search: `id=${record.id}`,
    }))
  }
  onChangeVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  handleDispatch(record) {
    let { dispatch } = this.props
    this.onChangeVisible(true)
    dispatch({
      type: 'curingsTask/@change',
      payload: {
        record
      },
    })
  }
  // 停止函数
  stopFn = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'curingsTask/stopTask',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch({
            type: 'curingsTask/getPageInfo',
            payload: {
              values: {},
              pageData: PageHelper.create()
            }
          })
        }
      }
    })
  }

  handleStop = (record) => {
    Modal.confirm({
      title: '注意',
      content: '是否要停止这个任务？',
      onOk: () => {
        this.stopFn(record)
      },
      onCancel() { },
    })
  }

  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword) => {
    const { curingsTask: { pageData }, dispatch } = this.props

    dispatch({
      type: 'curingsTask/getPageInfo',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }
  render() {
    let {
      routerData: { childRoutes },
      curingsTask: {
        parameters,
        pageData,
        popoverVisible,
        isCurrentRoute
      },
      dispatch,
      loading } = this.props
    let columns = createColumns(this)
    let formColumns = createFormColumns(this)
    let dispatchProps = {
      visible: this.state.visible,
      onChangeVisible: (visible) => {
        this.setState({
          visible,
        })
      },
    }
    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          status: parseInt(form.status),
          code: form.code,
          curingPlanName: form.curingPlanName,
          personLiableId: form.personLiableId,
          queryTime: form.queryTime
        }

        // 隐藏 popover
        dispatch({
          type: 'curingsTask/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'curingsTask/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: pageData.startPage()
          }
        })
      },
      popoverVisible,
      popoverChange: () => {
        dispatch({
          type: 'curingsTask/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
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
          type: 'curingsTask/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }) //表格有复选框选项
    }
    return (
      <Layout className="page" onClick={() => {
        dispatch({
          type: 'curingsTask/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
        {
          isCurrentRoute ? (<Panel header={null}>
            <Toolbar>
              <Search
                placeholder="任务编号 / 计划名称"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'curingsTask/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value
                      },
                    }
                  })
                }}
                onSearch={this.searchHandler}
              />

              <Button
                type="primary2" className="toolbar-item"
                onClick={this.handleReload}
                icon="reload">
                刷新
            </Button>
              <SearchLayout {...searchLayoutProps} />
            </Toolbar>
            <DataTable {...dataTableProps} />
          </Panel>) : null
        }

        <Switch>{childRoutes}</Switch>
        <Dispatch {...dispatchProps}></Dispatch>
      </Layout>
    )
  }
}

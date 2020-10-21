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
import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'
// import CheckFlow from './CheckFlow'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import { Switch } from 'dva/router'
let loaded = false
@connect(({ patrolStandard, loading }) => ({
  patrolStandard,
  loading: loading.models.patrolStandard
}))
export default class patrolStandard extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
    visible: false,
    keyword: ''
    // flowVisible:false
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'patrolStandard/init'
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'patrolStandard',
        valueField: 'typeList',
        success: () => {}
      }
    })

  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword) => {
    const { patrolStandard: { pageData }, dispatch } = this.props

    dispatch({
      type: 'patrolStandard/getPageInfo',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }

  // 新增领料申请管理
  handleAdd = () => {
    this.props.dispatch(routerRedux.push({
      pathname: `${routesPrefix}/patrolStandard/subPatrolStandardAdd`
    }))
  }

  // 删除巡检标准 TODO
  deleteFn = (record) => {
    const { patrolStandard: { pageData }, dispatch } = this.props
    dispatch({
      type: 'patrolStandard/deleteRecord',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch({
            type: 'patrolStandard/getPageInfo',
            payload: {
              values: {},
              pageData: pageData.startPage()
            }
          })
        }
      }
    })
  }

  handleDelete = (record) => {
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        this.deleteFn(record)
      },
      onCancel() { },
    })
  }

  // 修改巡检标注 TODO
  handleEdit = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'patrolStandardAdd/getDetail',
      payload: {
        id: record.id,
        success: () => {
          // $$.setStore('equipment-editPatrolStandard-id', record.id)
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/patrolStandard/subPatrolStandardAdd`,
            search: `id=${record.id}`
          }))
        }
      }
    })
  }

  // 刷新
  handleReload = () => {
    const { patrolStandard: { pageData }, dispatch } = this.props
    dispatch({
      type: 'patrolStandard/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'patrolStandard/getPageInfo',
      payload: {
        pageData: pageData.startPage()
      }
    })
    this.setState({ keyword: '' })
  }
  clearEditId = () => {
    $$.setStore('equipment-editPatrolStandard-id', '')
  }
  render() {
    const { keyword } = this.state
    let { dispatch, patrolStandard, loading, routerData: {childRoutes} } = this.props
    let { pageData, popoverVisible, isCurrentRoute } = patrolStandard
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
          type: 'patrolStandard/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }) //表格有复选框选项
    }
    let filterLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          code: form.code,
          name: form.name,
          type: parseInt(form.type),
          startTime : form.createdOn && form.createdOn[0] && form.createdOn[0].format('YYYY-MM-DD'),
          endTime : form.createdOn && form.createdOn[1] && form.createdOn[1].format('YYYY-MM-DD')
        }
        const { patrolStandard: { pageData }, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'patrolStandard/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'patrolStandard/getPageInfo',
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
          type: 'patrolStandard/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }
    return (
      <Layout className="page" onClick={() => {
        dispatch({
          type: 'patrolStandard/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
        {isCurrentRoute ?
          <Panel header={null}>
            <section className="search-area">
              <Toolbar>
                <Search
                  placeholder="标准编号 / 标准名称"
                  onSearch={this.searchHandler}
                  value={keyword}
                  onChange={e => this.setState({ keyword: e.target.value })}
                />
                <Button
                  type="primary2" className="toolbar-item"
                  onClick={this.handleReload}
                  icon="reload">
                  刷新
            </Button>
                <Link to={`${routesPrefix}/patrolStandard/subPatrolStandardAdd`}>
                  <Button
                    type="primary2" className="toolbar-item"
                    icon="plus" onClick={() => this.clearEditId()} >
                    新增
              </Button>
                </Link>
                <SearchLayout {...filterLayoutProps} />
              </Toolbar>
            </section>
            <DataTable {...dataTableProps} />
          </Panel> : null
        }

        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}
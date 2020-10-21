/*
 * @Descripttion : 采购申请列表页
 * @Author       : 贺子华
 * @Date         : 2020-04-14 13:34:32
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:19:37
 * @FilePath     : \ilng-shuaizhen-admin\src\routes\SubEquipment\Equipment\ProcurementApply\components\index.js
 */
import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { createColumns, createFormColumns } from './columns'
import { Switch } from 'dva/router'
import SearchLayout from 'components/SearchLayout'
import { Modal } from 'components/Modal'
import { routesPrefix } from '../../../config'

import $$ from 'cmn-utils'

import '../style/index.less'

import CheckFlow from './CheckFlow'

let loaded = false
@connect(({ procurementapply, loading }) => ({
  procurementapply,
  loading: loading.models.procurementapply,
}))
export default class extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
  }
  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'procurementapply/init',
      })
    }
  }
  onAddEquipment = () => {
    // 跳转 新增采购计划 路由
    this.props.dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/procurementApplyEquipment`,
      })
    )
  }
  onAddConsumables = () => {
    // 跳转 新增采购计划 路由
    this.props.dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/procurementApplyConsumables`,
      })
    )
  }
  handleReload = () => {
    const {
      procurementapply: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'procurementapply/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'procurementapply/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  handleDetails = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'procurementApplyDetail/getDetails',
      payload: {
        id: record.id,
        success: () => {
          $$.setStore('pre-route-path', `${routesPrefix}/procurementApply`)
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/procurementApply/subProcurementApplyDetail`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  handleAddConsumables = () => {
    let { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/procurementApply/subProcurementApplyConsumables`,
      })
    )
  }
  handleAddEquipment = () => {
    let { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/procurementApply/subProcurementApplyEquipment`,
      })
    )
  }
  handleEdit = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'procurementApplyConsumables/getDetails',
      payload: {
        id: record.id,
        success: () => {
          if (record.type === '1') {
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/procurementApply/subProcurementApplyConsumables`,
                search: `id=${record.id}`,
              })
            )
          } else if (record.type === '0') {
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/procurementApply/subProcurementApplyEquipment`,
                search: `id=${record.id}`,
              })
            )
          }
        },
      },
    })
  }
  deleteFn = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'procurementapply/delete',
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
  handleCheck = (record) => {
    const { dispatch } = this.props

    dispatch({
      type: 'procurementapply/getauditflowchart',
      payload: {
        id: record.id,
        success: () => {
          this.onVisible(true)
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
    let {
      dispatch,
      procurementapply,
      loading,
      routerData: { childRoutes },
    } = this.props
    let { pageData, popoverVisible, parameters, isCurrentRoute } = procurementapply
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
          type: 'procurementapply/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }), //表格有复选框选项
    }
    const style = {
      width: '180px',
    }
    const style1 = {
      width: '150px',
    }
    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          sn: form.sn,
          title: form.title,
          type: form.type,
          auditStatus: form.auditStatus,
          createTimeStart: form.createTime && form.createTime[0] && form.createTime[0].format('YYYY-MM-DD'),
          createTimeEnd: form.createTime && form.createTime[1] && form.createTime[1].format('YYYY-MM-DD'),
        }
        const {
          procurementapply: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'procurementapply/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'procurementapply/getPageInfo',
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
          type: 'procurementapply/@change',
          payload: {
            popoverVisible: true,
          },
        })
      },
    }
    return (
      <Layout
        className="full-layout page operate-brand-page"
        onClick={() => {
          dispatch({
            type: 'procurementapply/@change',
            payload: {
              popoverVisible: false,
            },
          })
        }}
      >
        {isCurrentRoute ? (
          <Panel header={null}>
            <Toolbar>
              <Search
                placeholder="申请单号 / 采购标题"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'procurementapply/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value,
                      },
                    },
                  })
                }}
                onSearch={(keyword) => {
                  dispatch({
                    type: 'procurementapply/getPageInfo',
                    payload: {
                      values: {
                        keyword,
                      },
                      pageData: pageData.startPage(),
                    },
                  })
                }}
              />
              <Button type="primary2" className="toolbar-item" icon="reload" onClick={this.handleReload}>
                刷新
              </Button>
              <Button onClick={this.handleAddConsumables} type="primary2" className="toolbar-item" style={style} icon="plus">
                备件耗材采购
              </Button>

              <Button onClick={this.handleAddEquipment} type="primary2" className="toolbar-item" style={style1} icon="plus">
                设备采购
              </Button>
              <SearchLayout {...searchLayoutProps}></SearchLayout>
            </Toolbar>
            <DataTable {...dataTableProps} />
            <CheckFlow visible={this.state.visible} onVisible={this.onVisible}></CheckFlow>
          </Panel>
        ) : null}

        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}

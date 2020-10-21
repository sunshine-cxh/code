/*
 * @Descripttion : 我发出的审批
 * @Author       : hezihua
 * @Date         : 2020-05-29 08:55:54
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:36:33
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { routerRedux } from 'dva/router'
import Select from 'components/Select'
const { Content } = Layout
import { createColumns1, columns2 } from './columns'
import CheckFlow from './CheckFlow'
import $$ from 'cmn-utils'

import '../style/index.less'
import { routesPrefix } from '../../../../../IEMS/config'

let loaded = false
@connect(({ willCheck, loading, global, checkGlobal }) => ({
  willCheck,
  loading: loading.models.willCheck,
  checkGlobal,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    updatePasswordVisible: false,
    updatePasswordRecord: [],
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'willCheck/init',
      })
    }
  }
  onVisible = (visible) => {
    this.setState({
      ...this.state,
      visible,
    })
  }

  handleApproval = (record) => {
    const { dispatch } = this.props
    console.log(record)
    if (record.processType === 0) {
      dispatch({
        type: 'checkGlobal/getPurchaseapplyDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/willCheck')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/procurementApply/subProcurementApplyDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    } else if (record.processType === 1) {
      dispatch({
        type: 'checkGlobal/getPurchaseplanDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/willCheck')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/procurementPlan/subProcurementPlanDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    } else if (record.processType === 2) {
      dispatch({
        type: 'checkGlobal/getMoveDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/willCheck')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/move/subMoveDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    } else if (record.processType === 3) {
      dispatch({
        type: 'checkGlobal/getRepairDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/willCheck')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/external/subExternalDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    } else if(record.processType === 4) {
      dispatch({
        type: 'checkGlobal/getPickingDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/willCheck')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/pickingApply/subPickingApplyDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    } else if (record.processType === 5) {
      dispatch({
        type: 'checkGlobal/getScrapDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/willCheck')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/scrap/subScrapDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    } else if (record.processType === 6) {
      dispatch({
        type: 'checkGlobal/getSellDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/willCheck')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/sell/subSellDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    }
  }
  handleCheck = (record) => {
    const { dispatch } = this.props
    console.log(record)
    let type
    if (record.processType === 1) {
      type = 'PurchasePlan'
    } else if (record.processType === 0) {
      type = 'Purchase'
    } else if (record.processType === 2) {
      type = 'EquipmentAllocation'
    } else if (record.processType === 3) {
      type = 'EquipmentRepairCommission'
    } else if (record.processType === 4) {
      type = 'Stkpicking'
    }
    dispatch({
      type: 'willCheck/getauditflowchart',
      payload: {
        id: record.processSchemeId,
        type,
        success: () => {
          this.onVisible(true)
        },
      },
    })
  }
  render() {
    let { record, visible, updatePasswordVisible, updatePasswordRecord } = this.state
    let {
      dispatch,
      willCheck: {
        parameters,
        pageData,
        role,
        accountType,
        organizationTree,
        enterpriseList,
        toolbarSelectorValue,
      },
      loading,
      global: { functionAuthority },
    } = this.props

    let expand = {
      role,
      accountType,
      organizationTree,
      record,
      functionAuthority,
      enterpriseList,
      toolbarSelectorValue,
    }
    let columns = createColumns1(this, expand)

    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      pagination: true,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'willCheck/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
            values: {
              entity: {
                type: 3,
              },
            },
          },
        })
      },
      onSelect: (keys, rows) => {}, //表格有复选框选项
    }

    return (
      <Layout className="full-layout page">
        <Content>
          <Panel header={null}>
            <Toolbar>
              <Search
                placeholder="标题 / 提交人"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'willCheck/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value,
                      },
                    },
                  })
                }}
                onSearch={(value) => {
                  dispatch({
                    type: 'willCheck/getPageInfo',
                    payload: {
                      values: {
                        entity: {
                          type: 3,
                          title: value,
                        },
                      },
                      pageData: pageData.startPage(),
                    },
                  })
                }}
              />
              <Button
                type="primary2"
                className="toolbar-item"
                icon="reload"
                onClick={() => {
                  dispatch({
                    type: 'willCheck/@change',
                    payload: {
                      parameters: {},
                    },
                  })
                  dispatch({
                    type: 'willCheck/init',
                    payload: {
                      pageData: pageData.startPage(),
                    },
                  })
                }}
              >
                刷新
              </Button>
              <Button
                display={functionAuthority.indexOf('btnAdd') > -1} //功能权限控制
                type="primary2"
                className="toolbar-item"
                icon="plus"
                onClick={this.onAdd}
              >
                新增
              </Button>
            </Toolbar>
            <DataTable {...dataTableProps} />
            <CheckFlow visible={this.state.visible} onVisible={this.onVisible}></CheckFlow>
          </Panel>
        </Content>
      </Layout>
    )
  }
}

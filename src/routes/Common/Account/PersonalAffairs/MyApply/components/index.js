/*
 * @Descripttion : 我发出的审批
 * @Author       : hezihua
 * @Date         : 2020-05-29 08:55:54
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-09-08 19:43:57
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
import Iframe from 'components/Iframe'
import Spin from 'components/Spin'
import { ModalNormal } from 'components/Modal'
import { routerRedux } from 'dva/router'
import { columns } from './columns'
import $$ from 'cmn-utils'
import { routesPrefix } from '../../../../../IEMS/config'
import CheckFlow from './CheckFlow'
import '../style/index.less'

let loaded = false
@connect(({ myApply, loading, global, checkGlobal }) => ({
  myApply,
  loading: loading.models.myApply,
  global,
  checkGlobal,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    updatePasswordVisible: false,
    updatePasswordRecord: [],
    iframeModalState: false,
    iframeOnLoad: false,
    iframeSrc: '',
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'myApply/init',
      })
    }
  }

  handleDetails = (record) => {
    const { dispatch } = this.props
    console.log(record)
    if (record.processType === 0) {
      dispatch({
        type: 'checkGlobal/getPurchaseapplyDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/myApply')
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
            $$.setStore('pre-route-path', '/account/myApply')
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
            $$.setStore('pre-route-path', '/account/myApply')
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
            $$.setStore('pre-route-path', '/account/myApply')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/external/subExternalDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    } else if (record.processType === 4) {
      dispatch({
        type: 'checkGlobal/getPickingDetails',
        payload: {
          id: record.processSchemeId,
          success: () => {
            $$.setStore('pre-route-path', '/account/myApply')
            dispatch(
              routerRedux.push({
                pathname: `${routesPrefix}/pickingApply/subPickingApplyDetail`,
                search: `id=${record.processSchemeId}`,
              })
            )
          },
        },
      })
    }
  }

  onVisible = (visible) => {
    this.setState({
      ...this.state,
      visible,
    })
  }

  handleCheck = (record) => {
    const { dispatch } = this.props
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
      type: 'myApply/getauditflowchart',
      payload: {
        id: record.processSchemeId,
        type,
        success: () => {
          this.onVisible(true)
        },
      },
    })
  }

  //查看详情
  handleDetail = (type, id) => {
    let origin = window.location.origin
    this.setState({
      iframeModalState: true,
      iframeSrc: `${origin}/#/iems/standingBook/substandingBookDetail?id=${id}`,
    })
  }

  render() {
    let { record, iframeModalState, iframeOnLoad, iframeSrc } = this.state
    let {
      dispatch,
      myApply: { parameters, pageData },
      loading,
      global: { functionAuthority },
    } = this.props

    let dataTableProps = {
      loading,
      showNum: true,
      columns: columns(this),
      rowKey: 'id',
      dataItems: pageData,
      pagination: true,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'myApply/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => {}, //表格有复选框选项
    }

    //功能管理modal
    let modalNormalProps = {
      title: `详情`,
      loading,
      record,
      visible: iframeModalState,
      modalOpts: {
        width: 1400,
      },
      onCancel: () => {
        this.setState({
          iframeModalState: false,
          iframeOnLoad: false,
        })
      },
    }

    return (
      <Layout className="my-apply">
        <Panel header={null}>
          <Toolbar>
            <Search
              placeholder="标题"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'myApply/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'myApply/getPageInfo',
                  payload: {
                    values: {
                      keyword: value,
                      entity: {
                        type: 1,
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
                  type: 'myApply/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'myApply/init',
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
            <Button
              type="primary2"
              className="toolbar-item"
              icon="plus"
              onClick={() => {
                this.handleDetail(1, '1ba6e5c3-96dd-4d17-a51e-ac2200a53142')
              }}
            >
              页面详情
            </Button>
          </Toolbar>
          <DataTable {...dataTableProps} />
          <CheckFlow visible={this.state.visible} onVisible={this.onVisible}></CheckFlow>
          {iframeModalState && (
            <ModalNormal {...modalNormalProps} className="modal-iframe">
              <Iframe
                src={iframeSrc}
                height={720}
              />
            </ModalNormal>
          )}
        </Panel>
      </Layout>
    )
  }
}

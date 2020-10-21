/*
 * @Descripttion : 采购计划弹框列表
 * @Author       : hezihua
 * @Date         : 2020-05-12 11:24:51
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-01 10:50:06
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import { createColumnsPlan } from './columns'

@connect(({ procurementApplyConsumables, loading }) => ({
  procurementApplyConsumables,
  loading: loading.models.procurementApplyConsumables,
}))
export default class extends Component {
  componentDidMount() {
    const {
      dispatch,
      procurementApplyConsumables: { planDataList },
    } = this.props

    dispatch({
      type: 'procurementApplyConsumables/getPurchasePlanList',
      payload: {
        planDataList,
        values: {
          entity: {
            auditStatus: 2,
            sourceType: 1,
            type: '1'
          }
        }
      },
    })
  }
  state = {
    planrow: [],
    planrowkeys: [],
  }
  handleSearch = (keyword) => {
    const {
      procurementApplyConsumables: { planDataList },
      dispatch,
    } = this.props

    dispatch({
      type: 'procurementApplyConsumables/getPurchasePlanList',
      payload: {
        values: {
          keyword,
          entity: {
            auditStatus: 2,
            sourceType: 1,
            type: '1'
          }
        },
        planDataList,
      },
    })
  }
  handleReload = () => {
    const {
      procurementApplyConsumables: { planDataList },
      dispatch,
    } = this.props
    dispatch({
      type: 'procurementApplyConsumables/@change',
      payload: {
        planParameters: {},
      },
    })
    dispatch({
      type: 'procurementApplyConsumables/getPurchasePlanList',
      payload: {
        planDataList,
        values: {
          entity: {
            auditStatus: 2,
            sourceType: 1,
            type: '1'
          }
        }
      },
    })
  }
  render() {
    let {
      procurementApplyConsumables: {
        planDataList,
        planRow,
        planRowKeys,
        planParameters,
      },
      loading,
      visible,
      dispatch,
      changeVisible,
    } = this.props
    let columns = createColumnsPlan(this)
    let modalNormalProps = {
      title: '选择采购计划单',
      visible,
      modalOpts: {
        width: 740,
      },
      footer: [],
      onSubmitTitle: '确定',
      onCancel: () => {
        changeVisible(false)
      },
      onSubmit: () => {
        dispatch({
          type: 'procurementApplyConsumables/@change',
          payload: {
            planRow: this.state.planrow.length ? this.state.planrow : [],
            planRowKeys: this.state.planrowkeys,
          },
        })
        changeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns,
      dataItems: planDataList,
      rowKey: 'id',
      pagination: true,
      selectType: 'radio',
      onSelect: (keys, rows) => {
        this.state.planrow = rows
        this.state.planrowkeys = keys
      },
      selectedRowKeys: planRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'procurementApplyConsumables/getPurchasePlanList',
          payload: {
            planDataList: planDataList.jumpPage(pageNum, pageSize),
            values: {
              entity: {
                auditStatus: 2,
                sourceType: 1,
                type: '1'
              }
            }
          },
        })
      },
    }

    return (
      <ModalNormal {...modalNormalProps}>
        <div className="module-function-wrap">
          <Toolbar>
            <Search
              placeholder="计划单号 / 标题"
              value={planParameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'procurementApplyConsumables/@change',
                  payload: {
                    planParameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={this.handleSearch}
            />
            <Button
              onClick={() => {
                this.handleReload()
              }}
              type="primary2"
              className="toolbar-item"
              icon="reload"
            >
              刷新
            </Button>
          </Toolbar>
          <DataTable {...dataTableSelectProps} />
        </div>
      </ModalNormal>
    )
  }
}

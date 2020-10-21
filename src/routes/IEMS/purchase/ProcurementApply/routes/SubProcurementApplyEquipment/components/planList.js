/*
 * @Descripttion : 采购计划弹框列表
 * @Author       : hezihua
 * @Date         : 2020-05-12 11:24:51
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-01 10:51:47
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import { createColumnsPlan } from './columns'

@connect(({ procurementApplyEquipment, loading }) => ({
  procurementApplyEquipment,
  loading: loading.models.procurementApplyEquipment,
}))
export default class extends Component {
  componentDidMount() {
    const {
      dispatch,
      procurementApplyEquipment: { planDataList },
    } = this.props

    dispatch({
      type: 'procurementApplyEquipment/getPurchasePlanList',
      payload: {
        planDataList,
        values: {
          entity: {
            auditStatus: 2,
            sourceType: 1,
            type: '0'
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
      procurementApplyEquipment: { planDataList },
      dispatch,
    } = this.props

    dispatch({
      type: 'procurementApplyEquipment/getPurchasePlanList',
      payload: {
        values: {
          keyword,
          entity: {
            auditStatus: 2,
            sourceType: 1,
            type: '0'
          }
        },
        planDataList,
      },
    })
  }
  handleReload = () => {
    const {
      procurementApplyEquipment: { planDataList },
      dispatch,
    } = this.props
    dispatch({
      type: 'procurementApplyEquipment/@change',
      payload: {
        planParameters: {},
      },
    })
    dispatch({
      type: 'procurementApplyEquipment/getPurchasePlanList',
      payload: {
        planDataList,
        values: {
          entity: {
            auditStatus: 2,
            sourceType: 1,
            type: '0'
          }
        }
      },
    })
  }
  render() {
    let {
      procurementApplyEquipment: {
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
          type: 'procurementApplyEquipment/@change',
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
          type: 'procurementApplyEquipment/getPurchasePlanList',
          payload: {
            planDataList: planDataList.jumpPage(pageNum, pageSize),
            values: {
              entity: {
                auditStatus: 2,
                sourceType: 1,
                type: '0'
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
                  type: 'procurementApplyEquipment/@change',
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

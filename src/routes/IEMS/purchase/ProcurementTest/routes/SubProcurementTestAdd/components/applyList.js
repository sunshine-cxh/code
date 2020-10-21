/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-29 10:57:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-22 11:16:33
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import { createColumnsApply } from './columns'

@connect(({ procurementTestAdd, loading }) => ({
  procurementTestAdd,
  loading: loading.models.procurementTestAdd,
}))
export default class extends Component {
  componentDidMount() {
    const {
      dispatch,
      procurementTestAdd: { applyDataList },
    } = this.props

    dispatch({
      type: 'procurementTestAdd/getApplyList',
      payload: {
        applyDataList,
        values: {
          entity: {
            auditStatus: 2
          }
        }
      },
    })
  }
  state = {
    applyrow: [],
    applyrowkeys: [],
  }
  handleSearch = (keyword) => {
    const {
      procurementTestAdd: { applyDataList },
      dispatch,
    } = this.props

    dispatch({
      type: 'procurementTestAdd/getApplyList',
      payload: {
        values: {
          keyword,
          entity: {
            auditStatus: 2
          }
        },
        applyDataList,
      },
    })
  }
  handleReload = () => {
    const {
      procurementTestAdd: { applyDataList },
      dispatch,
    } = this.props
    dispatch({
      type: 'procurementTestAdd/@change',
      payload: {
        applyParameters: {},
      },
    })
    dispatch({
      type: 'procurementTestAdd/getApplyList',
      payload: {
        applyDataList,
        values: {
          entity: {
            auditStatus: 2
          }
        }
      },
    })
  }
  render() {
    let {
      procurementTestAdd: {
        applyDataList,
        applyRow,
        applyRowKeys,
        applyParameters,
      },
      loading,
      visible,
      dispatch,
      changeVisible,
    } = this.props
    let columns = createColumnsApply(this)
    let modalNormalProps = {
      title: '选择采购申请单',
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
          type: 'procurementTestAdd/@change',
          payload: {
            applyRow: this.state.applyrow.length ? this.state.applyrow : [],
          },
        })
        dispatch({
          type: 'procurementTestAdd/@change',
          payload: {
            applyRowKeys: this.state.applyrowkeys,
          },
        })
        changeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns,
      dataItems: applyDataList,
      rowKey: 'id',
      pagination: true,
      selectType: 'radio',
      onSelect: (keys, rows) => {
        this.state.applyrow = rows
        this.state.applyrowkeys = keys
      },
      selectedRowKeys: applyRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'procurementTestAdd/getApplyList',
          payload: {
            applyDataList: applyDataList.jumpPage(pageNum, pageSize),
            values: {
              entity: {
                auditStatus: 2
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
              placeholder="申请单号 / 标题"
              value={applyParameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'procurementTestAdd/@change',
                  payload: {
                    applyParameters: {
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

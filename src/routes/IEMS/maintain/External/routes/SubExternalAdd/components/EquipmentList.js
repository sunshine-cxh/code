/*
 * @Descripttion : 采购计划弹框列表
 * @Author       : hezihua
 * @Date         : 2020-05-12 11:24:51
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-02 09:47:30
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import { createColumnsEquipment } from './columns'

@connect(({ externalAdd, loading }) => ({
  externalAdd,
  loading: loading.models.externalAdd,
}))
export default class extends Component {
  componentDidMount() {
    const {
      dispatch,
      externalAdd: { equipmentDataList },
    } = this.props

    dispatch({
      type: 'externalAdd/getEquipmentList',
      payload: {
        equipmentDataList,
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
    equipmentRow: [],
    equipmentRowKeys: [],
  }
  handleSearch = (keyword) => {
    const {
      externalAdd: { equipmentDataList },
      dispatch,
    } = this.props

    dispatch({
      type: 'externalAdd/getEquipmentList',
      payload: {
        values: {
          keyword,
          entity: {
            auditStatus: 2,
            sourceType: 1,
            type: '1'
          }
        },
        equipmentDataList,
      },
    })
  }
  handleReload = () => {
    const {
      externalAdd: { equipmentDataList },
      dispatch,
    } = this.props
    dispatch({
      type: 'externalAdd/@change',
      payload: {
        equipmentParameters: {},
      },
    })
    dispatch({
      type: 'externalAdd/getEquipmentList',
      payload: {
        equipmentDataList,
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
      externalAdd: {
        equipmentDataList,
        equipmentRow,
        equipmentRowKeys,
        equipmentParameters,
      },
      loading,
      visible,
      dispatch,
      changeVisible,
    } = this.props
    let columns = createColumnsEquipment(this)
    let modalNormalProps = {
      title: '选择设备',
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
          type: 'externalAdd/@change',
          payload: {
            equipmentRow: this.state.equipmentRow.length ? this.state.equipmentRow : [],
            equipmentRowKeys: this.state.equipmentRowKeys,
          },
        })
        changeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns,
      dataItems: equipmentDataList,
      rowKey: 'id',
      pagination: true,
      selectType: 'radio',
      onSelect: (keys, rows) => {
        this.state.equipmentRow = rows
        this.state.equipmentRowKeys = keys
      },
      selectedRowKeys: equipmentRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'externalAdd/getEquipmentList',
          payload: {
            equipmentDataList: equipmentDataList.jumpPage(pageNum, pageSize),
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
              placeholder="设备编号 / 设备名称"
              value={equipmentParameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'externalAdd/@change',
                  payload: {
                    equipmentParameters: {
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

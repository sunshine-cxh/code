/*
 * @Descripttion : 选择关联设备弹窗
 * @Author       : caojiarong
 * @Date         : 2020-06-02 10:28:26
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-23 14:06:15
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Format from 'utils/format'
import DataTable from 'components/DataTable'
import  { createColumnsProduct } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'

@connect(({ patrolStandardAdd, loading }) => ({
  patrolStandardAdd,
  loading: loading.models.patrolStandardAdd
}))
export default class extends Component{
  searchHandler = (keyword)=> {
    const { patrolStandardAdd: { selectDataList }, dispatch } = this.props

    dispatch({
      type: 'patrolStandardAdd/getEquipmentData',
      payload: {
        values: {
          keyword
        },
        selectDataList: selectDataList.startPage()
      }
    })
  }

  handleReload = ()=> {
    const { patrolStandardAdd: { selectDataList }, dispatch } = this.props
    dispatch({
      type: 'patrolStandardAdd/@change',
      payload: {
        parameters: {},
      }
    })
    this.props.dispatch({
      type: 'patrolStandardAdd/@change',
      payload: {
        checkedKeys: []
      }
    })
    dispatch({
      type: 'patrolStandardAdd/getEquipmentData',
      payload: {
        selectDataList: selectDataList.startPage()
      }
    })
  }
  render (){
    let { dispatch, patrolStandardAdd, loading, visible, onChangeVisible } = this.props
    let { 
      appPageData, 
      selectDataList,
      selectedRow, 
      selectedRowKeys, 
      parameters 
    } = patrolStandardAdd
    let columnsProduct = createColumnsProduct(this)
    let modalNormalProps = {
      title: '设备选择',
      visible,
      modalOpts: {
        width: 1198,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        onChangeVisible(false)
      },
      onSubmit: (values) => {
        appPageData.list = selectedRow

        dispatch({
          type: 'patrolStandardAdd/@change',
          payload: {
            appPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: selectDataList,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'checkbox',
      onSelect: (keys, rows, currentRows, e) => {
        // 更新row
        for (let item of rows) {
          let flag = true
          for (let item1 of selectedRow) {
            if (item1.id === item.id) {
              flag = false
            }
          }
          if (flag) {
            selectedRow.push(item)
          }
          
        }
        selectedRow = selectedRow.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'patrolStandardAdd/@change',
          payload: {
            selectedRow,
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'patrolStandardAdd/getEquipmentData',
          payload: {
            selectDataList: selectDataList.jumpPage(pageNum, pageSize),
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
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'patrolStandardAdd/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value
                    },
                  }
                })
              }}
              onSearch={keyword => {
                this.searchHandler(keyword)
              }}
            />
            <Button
              type="primary2"
              className="toolbar-item"
              icon="reload"
              onClick={this.handleReload}
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
/*
 * @Descripttion : 选择关联设备弹窗
 * @Author       : hezihua
 * @Date         : 2020-06-02 10:28:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 16:19:58
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



@connect(({ curingsStandardAdd, loading }) => ({
  curingsStandardAdd,
  loading: loading.models.curingsStandardAdd
}))
export default class extends Component{
  searchHandler = (keyword)=> {
    const { curingsStandardAdd: { selectDataList }, dispatch } = this.props

    dispatch({
      type: 'curingsStandardAdd/getEquipmentData',
      payload: {
        values: {
          keyword
        },
        selectDataList: selectDataList.startPage()
      }
    })
  }

  handleReload = ()=> {
    const { curingsStandardAdd: { selectDataList }, dispatch } = this.props
    dispatch({
      type: 'curingsStandardAdd/@change',
      payload: {
        parameters: {},
      }
    })
    this.props.dispatch({
      type: 'curingsStandardAdd/@change',
      payload: {
        checkedKeys: []
      }
    })
    dispatch({
      type: 'curingsStandardAdd/getEquipmentData',
      payload: {
        selectDataList: selectDataList.startPage()
      }
    })
  }
  render (){
    let { dispatch, curingsStandardAdd, loading, visible, onChangeVisible } = this.props
    let { 
      appPageData, 
      selectDataList,
      selectedRow, 
      selectedRowKeys, 
      parameters 
    } = curingsStandardAdd
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
          type: 'curingsStandardAdd/@change',
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
          type: 'curingsStandardAdd/@change',
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
          type: 'curingsStandardAdd/getEquipmentData',
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
                  type: 'curingsStandardAdd/@change',
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
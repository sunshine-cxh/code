/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 16:29:54
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-15 14:29:30
 */ 
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createSellAddColumns } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import SearchLayout from 'components/SearchLayout'
import $$ from 'cmn-utils'

@connect(({ sellAdd, loading }) => ({
  sellAdd,
  loading: loading.models.sellAdd,
}))
export default class extends Component {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'sellAdd/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
      },
    })
  }
  handleReload = () => {
    const {
      sellAdd: { sellAddPageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'sellAdd/@change',
      payload: {
        parameter: {},
      },
    })
    dispatch({
      type: 'sellAdd/getEquipmentPageInfo',
      payload: {
        sellAddPageData: sellAddPageData.startPage(),
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      sellAdd: { sellAddPageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'sellAdd/getEquipmentPageInfo',
      payload: {
        values: {
          keyword,
        },
        sellAddPageData: sellAddPageData.startPage(),
      },
    })
  }
  render() {
    let { dispatch, sellAdd, loading, visible, onChangeVisible } = this.props
    let { sellInfoPageData, sellAddPageData, selectedRow, selectedRowKeys, parameter } = sellAdd
    let columnsProduct = createSellAddColumns(this)
    let modalNormalProps = {
      title: '调拨新增',
      visible,
      modalOpts: {
        width: 740,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        onChangeVisible(false)
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        sellInfoPageData.list = selectedRow
        dispatch({
          type: 'sellAdd/@change',
          payload: {
            sellInfoPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: sellAddPageData,
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
            item.owner = `${item.foreignTypeDesc}/${item.foreignName}`
            selectedRow.push(item)
          }
        }
        selectedRow = selectedRow.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'sellAdd/@change',
          payload: {
            selectedRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'sellAdd/@change',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys: selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'sellAdd/getEquipmentPageInfo',
          payload: {
            sellAddPageData: sellAddPageData.jumpPage(pageNum, pageSize),
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
              value={parameter.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'sellAdd/@change',
                  payload: {
                    parameter: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(keyword) => {
                this.searchHandler(keyword)
              }}
            />
            <Button type="primary2" className="toolbar-item" icon="reload" onClick={this.handleReload}>
              刷新
            </Button>
          </Toolbar>
          <DataTable {...dataTableSelectProps} />
        </div>
      </ModalNormal>
    )
  }
}
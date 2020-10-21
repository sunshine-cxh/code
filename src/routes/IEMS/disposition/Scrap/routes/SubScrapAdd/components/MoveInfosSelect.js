/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 16:29:54
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 16:42:01
 */ 
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createscrapAddColumns } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import SearchLayout from 'components/SearchLayout'
import $$ from 'cmn-utils'

@connect(({ scrapAdd, loading }) => ({
  scrapAdd,
  loading: loading.models.scrapAdd,
}))
export default class extends Component {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'scrapAdd/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
      },
    })
  }
  handleReload = () => {
    const {
      scrapAdd: { scrapAddPageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'scrapAdd/@change',
      payload: {
        parameter: {},
      },
    })
    dispatch({
      type: 'scrapAdd/getEquipmentPageInfo',
      payload: {
        scrapAddPageData: scrapAddPageData.startPage(),
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      scrapAdd: { scrapAddPageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'scrapAdd/getEquipmentPageInfo',
      payload: {
        values: {
          keyword,
        },
        scrapAddPageData: scrapAddPageData.startPage(),
      },
    })
  }
  render() {
    let { dispatch, scrapAdd, loading, visible, onChangeVisible } = this.props
    let { scrapInfoPageData, scrapAddPageData, selectedRow, selectedRowKeys, parameter } = scrapAdd
    let columnsProduct = createscrapAddColumns(this)
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
        scrapInfoPageData.list = selectedRow
        dispatch({
          type: 'scrapAdd/@change',
          payload: {
            scrapInfoPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: scrapAddPageData,
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
          type: 'scrapAdd/@change',
          payload: {
            selectedRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'scrapAdd/@change',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys: selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'scrapAdd/getEquipmentPageInfo',
          payload: {
            scrapAddPageData: scrapAddPageData.jumpPage(pageNum, pageSize),
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
                  type: 'scrapAdd/@change',
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
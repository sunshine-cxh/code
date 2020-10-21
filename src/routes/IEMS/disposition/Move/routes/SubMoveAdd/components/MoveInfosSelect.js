/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 16:29:54
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 16:39:45
 */ 
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createMoveAddColumns } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import SearchLayout from 'components/SearchLayout'
import $$ from 'cmn-utils'

@connect(({ moveAdd, loading }) => ({
  moveAdd,
  loading: loading.models.moveAdd,
}))
export default class extends Component {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'moveAdd/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
      },
    })
  }
  handleReload = () => {
    const {
      moveAdd: { moveAddPageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'moveAdd/@change',
      payload: {
        parameter: {},
      },
    })
    dispatch({
      type: 'moveAdd/getEquipmentPageInfo',
      payload: {
        moveAddPageData: moveAddPageData.startPage(),
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      moveAdd: { moveAddPageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'moveAdd/getEquipmentPageInfo',
      payload: {
        values: {
          keyword,
        },
        moveAddPageData: moveAddPageData.startPage(),
      },
    })
  }
  render() {
    let { dispatch, moveAdd, loading, visible, onChangeVisible } = this.props
    let { moveInfoPageData, moveAddPageData, moveRow, moveRowKeys, parameter } = moveAdd 
    let columnsProduct = createMoveAddColumns(this)
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
        moveInfoPageData.list = moveRow
        dispatch({
          type: 'moveAdd/@change',
          payload: {
            moveInfoPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: moveAddPageData,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'checkbox',
      onSelect: (keys, rows, currentRows, e) => {
        // 更新row
        for (let item of rows) {
          let flag = true
          for (let item1 of moveRow) {
            if (item1.id === item.id) {
              flag = false
            }
          }
          if (flag) {
            item.owner = `${item.foreignTypeDesc}/${item.foreignName}`
            item.callOutDepart = item.orgName
            item.callOutLocation = item.installationSite
            moveRow.push(item)
          }
        }
        moveRow = moveRow.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'moveAdd/@change',
          payload: {
            moveRow,
            moveRowKeys: keys,
          },
        })
      },
      selectedRowKeys: moveRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'moveAdd/getEquipmentPageInfo',
          payload: {
            moveAddPageData: moveAddPageData.jumpPage(pageNum, pageSize),
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
                  type: 'moveAdd/@change',
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
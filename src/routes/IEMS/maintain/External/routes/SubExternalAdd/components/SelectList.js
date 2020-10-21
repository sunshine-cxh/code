/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-15 09:22:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-02 10:06:11
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createColumnsProduct } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import SearchLayout from 'components/SearchLayout'
import $$ from 'cmn-utils'
import Format from 'utils/format'

@connect(({ externalAdd, loading }) => ({
  externalAdd,
  loading: loading.models.externalAdd,
}))
export default class extends Component {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'externalAdd',
        valueField: 'organizationTree',
      },
    })
  }
  handleReload = () => {
    const {
      externalAdd: { selectDataList },
      dispatch,
    } = this.props
    dispatch({
      type: 'externalAdd/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'externalAdd/getSelectList',
      payload: {
        selectDataList: selectDataList.startPage(),
      },
    })
  }
  handleSelect = () => {
    let { dispatch } = this.props
    dispatch({
      type: 'externalAdd/@change',
      payload: {
        popoverVisible: true,
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      externalAdd: { selectDataList },
      dispatch,
    } = this.props

    dispatch({
      type: 'externalAdd/getSelectList',
      payload: {
        values: {
          keyword,
        },
        selectDataList: selectDataList.startPage(),
      },
    })
  }
  render() {
    let { dispatch, externalAdd, loading, visible, onChangeVisible } = this.props
    let { appPageData, selectDataList, addRow, selectedRow, selectedRowKeys, parameters } = externalAdd
    let columnsProduct = createColumnsProduct(this)
    let modalNormalProps = {
      title: '添加产品',
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
        appPageData.list = selectedRow
        dispatch({
          type: 'externalAdd/@change',
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
          type: 'externalAdd/@change',
          payload: {
            selectedRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'externalAdd/@change',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'externalAdd/getSelectList',
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
              placeholder="设备编号/ 设备名称"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'externalAdd/@change',
                  payload: {
                    parameters: {
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

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-15 09:22:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-17 16:43:10
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createColumnsProduct, createFormColumns } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import SearchLayout from 'components/SearchLayout'
import $$ from 'cmn-utils'
import Format from 'utils/format'

@connect(({ procurementTestAdd, loading }) => ({
  procurementTestAdd,
  loading: loading.models.procurementTestAdd,
}))
export default class extends Component {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'procurementTestAdd',
        valueField: 'organizationTree',
      },
    })
  }
  handleReload = () => {
    const {
      procurementTestAdd: { selectDataList },
      dispatch,
    } = this.props
    dispatch({
      type: 'procurementTestAdd/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'procurementTestAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
      },
    })
  }
  handleSelect = () => {
    let { dispatch } = this.props
    dispatch({
      type: 'procurementTestAdd/@change',
      payload: {
        popoverVisible: true,
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      procurementTestAdd: { selectDataList },
      dispatch,
    } = this.props

    dispatch({
      type: 'procurementTestAdd/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        selectDataList: selectDataList.startPage(),
      },
    })
  }
  render() {
    let { dispatch, procurementTestAdd, loading, visible, onChangeVisible } = this.props
    let { appPageData, selectDataList, popoverVisible, addRow, selectedRow, selectedRowKeys, parameters } = procurementTestAdd
    let columnsProduct = createColumnsProduct(this)
    let formColumns = createFormColumns(this)
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
        let items = []
        selectedRow.forEach((item, index) => {
          items.push({
            ...item,
            index: addRow.length + index,
          })
        })
        let list = [...addRow, ...items]
        appPageData.list = Format.newTableArr(appPageData.list, list, 'id')
        dispatch({
          type: 'procurementTestAdd/@change',
          payload: {
            appPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        const {
          procurementTestAdd: { selectDataList },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'procurementTestAdd/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'procurementTestAdd/getPageInfo',
          payload: {
            values: {
              entity: form,
            },
            selectDataList: selectDataList.startPage(),
          },
        })
      },
      popoverVisible,
      popoverChange: () => {
        dispatch({
          type: 'procurementTestAdd/@change',
          payload: {
            popoverVisible: true,
          },
        })
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
          type: 'procurementTestAdd/@change',
          payload: {
            selectedRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'procurementTestAdd/@change',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'procurementTestAdd/getPageInfo',
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
                  type: 'procurementTestAdd/@change',
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
            <SearchLayout {...searchLayoutProps}></SearchLayout>
          </Toolbar>
          <DataTable {...dataTableSelectProps} />
        </div>
      </ModalNormal>
    )
  }
}

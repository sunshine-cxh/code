/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-19 14:34:15
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-09 17:40:02
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createChildAddColumns } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import SearchLayout from 'components/SearchLayout'
import $$ from 'cmn-utils'

@connect(({ standingBookAdd, loading }) => ({
  standingBookAdd,
  loading: loading.models.standingBookAdd,
}))
export default class extends Component {
  componentDidMount() {
    // let { dispatch } = this.props
    // dispatch({
    //   type: 'standingBookAdd/getAllOrganization',
    //   payload: {
    //     enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
    //   },
    // })
  }
  handleReload = () => {
    const {
      standingBookAdd: { parentAddPageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        childParameter: {},
      },
    })
    dispatch({
      type: 'standingBookAdd/getParentPageInfo',
      payload: {
        parentAddPageData: parentAddPageData.startPage(),
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      standingBookAdd: { parentAddPageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'standingBookAdd/getParentPageInfo',
      payload: {
        values: {
          keyword,
        },
        parentAddPageData: parentAddPageData.startPage(),
      },
    })
  }
  render() {
    let { dispatch, standingBookAdd, loading, visible, onChangeVisible } = this.props
    let {parentRow, parentRowKeys, childParameter, parentPageData, parentAddPageData } = standingBookAdd
    let columnsProduct = createChildAddColumns(this)
    let modalNormalProps = {
      title: '设备选择',
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
        parentPageData.list = parentRow
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            parentPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: parentAddPageData,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'radio',
      onSelect: (keys, rows, currentRows, e) => {
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            parentRow: rows,
            parentRowKeys: keys,
          },
        })
      },
      selectedRowKeys: parentRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'standingBookAdd/getParentPageInfo',
          payload: {
            parentAddPageData: parentAddPageData.jumpPage(pageNum, pageSize),
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
              value={childParameter.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'standingBookAdd/@change',
                  payload: {
                    childParameter: {
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

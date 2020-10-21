/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 09:47:47
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-12 16:04:06
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createLayoutColumns } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import PageHelper from 'utils/pageHelper'

@connect(({ inventory, loading }) => ({
  inventory,
  loading: loading.models.inventory,
}))
export default class extends Component {
  componentDidMount() {
    let { dispatch } = this.props
    // dispatch({
    //   type: 'equipmentGlobal/getAllOrganization',
    //   payload: {
    //     enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
    //     namespace: 'inventory',

    //   },
    // })
  }
  state = {
    userRow: [],
    userRowKeys: [],
    operateId: ''
  }
  handleReload = () => {
    const {
      inventory: { layoutData },
      dispatch,
    } = this.props
    dispatch({
      type: 'inventory/@change',
      payload: {
        layoutParameters: {},
      },
    })
    dispatch({
      type: 'inventory/getLayoutData',
      payload: {
        layoutData: layoutData.startPage(),
      },
    })
  }
  searchHandler = (keyword) => {
    const {
      inventory: { layoutData },
      dispatch,
    } = this.props

    dispatch({
      type: 'inventory/getLayoutData',
      payload: {
        values: {
          keyword,
        },
        layoutData: layoutData.startPage(),
      },
    })
  }
  render() {
    let { dispatch, inventory, loading, visible, onChangeVisible } = this.props
    let { layoutData, layoutParameters } = inventory
    let { userRowKeys } = this.state
    let columnsProduct = createLayoutColumns(this)
    let modalNormalProps = {
      title: '重新分派',
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
        let {inventory: {currentId}} = this.props
        dispatch({
          type: 'inventory/updateoperator',
          payload: {
            id: currentId,
            operateId: userRowKeys[0],
            success: ()=> {
              onChangeVisible(false)
              dispatch({
                type: 'inventory/getPageInfo',
                payload: {
                  pageData: PageHelper.create(),
                  values: {}
                }
              })
            }
          },
        })
        // 
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: layoutData,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'radio',
      onSelect: (keys, rows, currentRows, e) => {
        this.setState({
          ...this.state,
          userRow: rows,
          userRowKeys: keys
        })
      },
      onSelectRow: (record, selected, selectedRows, event)=> {
        console.log(record, selected, selectedRows, event)
      },
      selectedRowKeys: userRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'inventory/getLayoutData',
          payload: {
            layoutData: layoutData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps}>
        <div className="module-function-wrap">
          <Toolbar>
            <Search
              placeholder="姓名"
              value={layoutParameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'inventory/@change',
                  payload: {
                    layoutParameters: {
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

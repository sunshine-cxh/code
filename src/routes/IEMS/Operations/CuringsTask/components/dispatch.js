/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 09:47:47
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 10:21:18
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

@connect(({ curingsTask, loading }) => ({
  curingsTask,
  loading: loading.models.curingsTask,
}))
export default class extends Component {
  state = {
    userRow: [],
    userRowKeys: [],
    operateId: ''
  }
  searchHandler = (keyword) => {
    const {
      curingsTask: { layoutData },
      dispatch,
    } = this.props

    dispatch({
      type: 'curingsTask/getLayoutData',
      payload: {
        values: {
          keyword,
        },
        layoutData: layoutData.startPage(),
      },
    })
  }
  render() {
    let { dispatch, curingsTask, loading, visible, onChangeVisible } = this.props
    let { layoutData, layoutParameters } = curingsTask
    let { userRowKeys } = this.state
    let columnsProduct = createLayoutColumns(this)
    let modalNormalProps = {
      title: '转派',
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
        let { curingsTask: { record } } = this.props
        record.personLiableId = userRowKeys.length > 0 ? userRowKeys[0] : null
        dispatch({
          type: 'curingsTask/transfer',
          payload: {
            record,
            success: () => {
              onChangeVisible(false)
              dispatch({
                type: 'curingsTask/getPageInfo',
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
      onSelectRow: (record, selected, selectedRows, event) => {
        console.log(record, selected, selectedRows, event)
      },
      selectedRowKeys: userRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'curingsTask/getLayoutData',
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
                  type: 'curingsTask/@change',
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
          </Toolbar>
          <DataTable {...dataTableSelectProps} />
        </div>
      </ModalNormal>
    )
  }
}

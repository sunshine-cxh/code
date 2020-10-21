/*
 * @Descripttion : 选择养护路线弹窗
 * @Author       : hezihua
 * @Date         : 2020-06-09 10:28:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 16:11:01
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Format from 'utils/format'
import DataTable from 'components/DataTable'
import { createComsumablesColumns } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import TreeSelect from 'components/TreeSelect'
@connect(({ curingsTaskOperate, loading }) => ({
  curingsTaskOperate,
  loading: loading.models.curingsTaskOperate,
}))
export default class extends Component {
  componentDidMount() {
    const { dispatch, curingsTaskOperate } = this.props
    let { stkpickingPageInfo } = curingsTaskOperate
    dispatch({
      type: 'curingsTaskOperate/getApplyList',
      payload: {
        stkpickingPageInfo,
      },
    })
  }

  searchHandler = (keyword) => {
    const {
      curingsTaskOperate: { stkpickingPageInfo },
      dispatch,
    } = this.props
    dispatch({
      type: 'curingsTaskOperate/getApplyList',
      payload: {
        values: {
          keyword,
        },
        stkpickingPageInfo: stkpickingPageInfo.startPage(),
      },
    })
  }

  handleReload = () => {
    const {
      curingsTaskOperate: { stkpickingPageInfo },
      dispatch,
    } = this.props
    dispatch({
      type: 'curingsTaskOperate/getApplyList',
      payload: {
        values: {},
        stkpickingPageInfo: stkpickingPageInfo.startPage(),
      },
    })
  }

  render() {
    let { dispatch, curingsTaskOperate, loading, comsumablesVisible, onChangeVisible } = this.props
    let {
      itemPageData,
      stkpickingPageInfo,
      selectedPickingRow,
      selectedPickingRowKeys,
      selectedPickingRowLocal,
      selectedPickingRowKeysLocal,
    } = curingsTaskOperate
    let columnsProduct = createComsumablesColumns(this)
    let modalNormalProps = {
      title: '选择设备',
      visible: comsumablesVisible,
      modalOpts: {
        width: 1198,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        dispatch({
          type: 'curingsTaskOperate/@change',
          payload: {
            selectedPickingRowLocal: selectedPickingRow,
            selectedPickingRowKeysLocal: selectedPickingRowKeys
          },
        })
        onChangeVisible(false)
      },

      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        let comsumablesArr = []
        selectedPickingRowLocal.forEach(item=> {
          comsumablesArr.push(...item.purchaseDataList)
        })
        itemPageData.list = comsumablesArr
        dispatch({
          type: 'curingsTaskOperate/@change',
          payload: {
            itemPageData,
            selectedPickingRow: selectedPickingRowLocal,
            selectedPickingRowKeys: selectedPickingRowKeysLocal
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: stkpickingPageInfo,
      rowKey: 'id',
      pagination: true,
      showSizeChanger: false,
      selectType: 'checkbox',
      onSelect: (keys, rows) => {
        // 更新row
        for (let item of rows) {
          let flag = true
          for (let item1 of selectedPickingRowLocal) {
            if (item1.id === item.id) {
              flag = false
            }
          }
          if (flag) {
            selectedPickingRowLocal.push(item)
          }
        }
        selectedPickingRowLocal = selectedPickingRowLocal.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'curingsTaskOperate/@change',
          payload: {
            selectedPickingRowLocal,
            selectedPickingRowKeysLocal: keys,
          },
        })
      },
      selectedRowKeys: selectedPickingRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'curingsTaskOperate/getApplyList',
          payload: {
            stkpickingPageInfo: stkpickingPageInfo.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps}>
        <div className="module-function-wrap">
          <DataTable {...dataTableSelectProps} />
        </div>
      </ModalNormal>
    )
  }
}

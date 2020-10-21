/*
 * @Descripttion : 入库管理
 * @Author       : caojiarong
 * @Date         : 2020-05-12 10:57:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 14:25:18
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import  { createColumnsApply } from './columns'

@connect(({ inWarehouseAdd, loading }) => ({
  inWarehouseAdd,
  loading: loading.models.inWarehouseAdd
}))

export default class extends Component {
  componentDidMount() {
    const { dispatch, inWarehouseAdd: {applyDataList} } = this.props

    dispatch({
      type: 'inWarehouseAdd/getApplyList',
      payload: {
        applyDataList
      }
    })
  }
  state = {
    applyrow: [],
    applyrowkeys: []
  }
  handleSearch = (keyword)=> {
    const { inWarehouseAdd: { applyDataList }, dispatch } = this.props

    dispatch({
      type: 'inWarehouseAdd/getApplyList',
      payload: {
        values: {
          keyword
        },
        applyDataList
      }
    })
  }
  
  handleReload = () => {
    const { inWarehouseAdd: {applyDataList}, dispatch } = this.props
    dispatch({
      type: 'inWarehouseAdd/@change',
      payload: {
        applyParameters: {},
      }
    })
    dispatch({
      type: 'inWarehouseAdd/getApplyList',
      payload: {
        applyDataList
      }
    })
  }
  render (){
    let { inWarehouseAdd: { applyDataList, applyRow, applyRowKeys, applyParameters }, loading, visible, dispatch, changeVisible} = this.props
    let columns = createColumnsApply(this)
    let modalNormalProps = {
      title: '选择采购申请单',
      visible,
      modalOpts: {
        width: 740
      },
      footer: [],
      onSubmitTitle: '确定',
      onCancel: ()=> {
        this.handleSearch('')
        changeVisible(false)
      },
      onSubmit: ()=> {
        dispatch({
          type: 'inWarehouseAdd/@change',
          payload: {
            applyRow: this.state.applyrow.length ? this.state.applyrow : [{}],
          }
        })
        dispatch({
          type: 'inWarehouseAdd/@change',
          payload: {
            applyRowKeys: this.state.applyrowkeys,
          }
        })
        dispatch({
          type: 'inWarehouseAdd/basicInfosChange',
          payload: {
            val: this.state.applyrowkeys[0],
            key:'relateId'
          }
        })
        changeVisible(false)
      }
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns,
      dataItems: applyDataList,
      rowKey: 'id',
      pagination: true,
      selectType: 'radio',
      onSelect: (keys, rows)=> {
        this.state.applyrow = rows
        this.state.applyrowkeys = keys
      },
      selectedRowKeys: applyRowKeys,
      onChange: ({ pageNum, pageSize })=> {
        // 分页
        dispatch({
          type: 'inWarehouseAdd/getApplyList',
          payload: {
            applyDataList: applyDataList.jumpPage(pageNum, pageSize)
          }
        })
      }
    }
    
    return (
    <ModalNormal {...modalNormalProps}>
      <div className="module-function-wrap">
        <Toolbar>
          <Search
            placeholder="申请单号"
            // value={applyParameters.keyword}
            onChange={(e) => {
              dispatch({
                type: 'inWarehouseAdd/@change',
                payload: {
                  applyParameters: {
                    keyword: e.target.value
                  },
                }
              })
            }}
            onSearch={this.handleSearch}
          />
          <Button
            onClick={()=> {
              this.handleReload()
            }}
            type="primary2"
            className="toolbar-item"
            icon="reload"
          >
            刷新
          </Button>
          
        </Toolbar>
        <DataTable {...dataTableSelectProps} />
      </div>
    </ModalNormal>)
  }
}
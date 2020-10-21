/*
 * @Descripttion : 关联单号
 * @Author       : caojiarong
 * @Date         : 2020-05-12 10:57:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-09 11:18:14
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import  { createColumnsApplyConserve, createColumnsApplyService } from './columns'

@connect(({ pickingApplyAdd, loading }) => ({
  pickingApplyAdd,
  loading: loading.models.pickingApplyAdd
}))

export default class extends Component {
  
  state = {
    applyrow: [],
    applyrowkeys: [],
    keyword:'',
    operateTimeStart: '',
    operateTimeEnd: '',
    
  }

  handleSearch = (keyword, type)=> {
    const { pickingApplyAdd: { applyDataList }, dispatch } = this.props

    dispatch({
      type: 'pickingApplyAdd/getRelateList',
      payload: {
        values: {
          keyword,
          entity:{
            status: 0
          }
        },
        applyDataList
      }
    })
  }
  
  handleReload = () => {
    const { pickingApplyAdd: {applyDataList}, dispatch } = this.props
    dispatch({
      type: 'pickingApplyAdd/@change',
      payload: {
        applyParameters: {},
      }
    })
    dispatch({
      type: 'pickingApplyAdd/getApplyList',
      payload: {
        applyDataList
      }
    })
  }
  
  render (){
    let { pickingApplyAdd: { applyDataList, applyRowKeys, applyParams, applyTypeList  }, loading, visible, dispatch, changeVisible, pickType} = this.props
    let columns = pickType === 'conserve' ? createColumnsApplyConserve(this) : createColumnsApplyService(this)
    
    let modalNormalProps = {
      title: '选择领料申请单',
      visible,
      modalOpts: {
        width: 980
      },
      footer: [],
      onSubmitTitle: '确定',
      onCancel: ()=> {
        this.handleSearch('')
        changeVisible(false)
      },
      onSubmit: ()=> {
        dispatch({
          type: 'pickingApplyAdd/@change',
          payload: {
            applyRow: this.state.applyrow.length ? this.state.applyrow : [{}],
          }
        })
        dispatch({
          type: 'pickingApplyAdd/@change',
          payload: {
            applyRowKeys: this.state.applyrowkeys,
          }
        })
        dispatch({
          type: 'pickingApplyAdd/basicInfosChange',
          payload: {
            val: this.state.applyrowkeys[0],
            key:'applyCode'
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
          type: 'pickingApplyAdd/getApplyList',
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
            width={200}
            className='margin-right'
            onSearch={this.handleSearch}
          />
          {/* <Select
            width={180}
            placeholder="申请类型"
            className='margin-right'
            options={pickingType}
            onChange={
              (val,key) => {
                this.handleSearch(keyword, val, operateTimeStart, operateTimeEnd)
                  this.setState({
                    type: val
                  })
              } }
          />
          <div className='date-select'>
            <span>出库日期</span>
            <DatePicker
              width={210}
              placeholder='出库日期'
              type='range'
              onChange={(val,key) => {
                  this.handleSearch(keyword, type, val[0], val[1])
                  this.setState({
                    operateTimeStart: val[0],
                    operateTimeEnd: val[1]
                  })
                }
              }
            />
          </div> */}
          
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
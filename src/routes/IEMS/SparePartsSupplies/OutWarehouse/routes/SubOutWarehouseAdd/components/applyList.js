/*
 * @Descripttion : 出库新增领料申请模块
 * @Author       : caojiarong
 * @Date         : 2020-05-21 10:57:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 16:03:39
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import DatePicker from 'components/DatePicker'
import  { createColumnsApply } from './columns'
import Select from 'components/Select'

@connect(({ outWarehouseAdd, loading }) => ({
  outWarehouseAdd,
  loading: loading.models.outWarehouseAdd
}))

export default class extends Component {
  componentDidMount() {
    const { dispatch, outWarehouseAdd: {applyDataList, applyTypeList } } = this.props

    dispatch({
      type: 'outWarehouseAdd/getApplyList',
      payload: {
        applyDataList
      }
    })

    dispatch({
      type:'outWarehouseAdd/getPickingType',
      payload:{}
    })
  }
  state = {
    applyrow: [],
    applyrowkeys: [],
    keyword:undefined,
    StkStartTime: undefined,
    stkEndTime: undefined,
    type: undefined,
    dateTime:undefined,
    keyword:''
  }

  handleSearch = (keyword, type, StkStartTime,StkEndTime)=> {
    const { outWarehouseAdd: { applyDataList }, dispatch } = this.props

    dispatch({
      type: 'outWarehouseAdd/getApplyList',
      payload: {
        values: {
          keyword,
          entity:{
            type:parseInt(type),
            StkEndTime,
            StkStartTime
          }
        },
        applyDataList
      }
    })
  }
  
  handleReload = () => {
    const { outWarehouseAdd: {applyDataList}, dispatch } = this.props
    // dispatch({
    //   type: 'outWarehouseAdd/@change',
    //   payload: {
    //     applyParameters: {},
    //   }
    // })
    this.setState({
      keyword:undefined,
      StkStartTime: undefined,
      stkEndTime: undefined,
      type: undefined,
      dateTime:undefined,
      keyword:''
    })
    dispatch({
      type: 'outWarehouseAdd/getApplyList',
      payload: {
        applyDataList
      }
    })
  }
  
  render (){
    let { outWarehouseAdd: { pickingType, applyDataList, applyRow, applyRowKeys, applyParams, applyTypeList  }, loading, visible, dispatch, changeVisible} = this.props
    let columns = createColumnsApply(this)
    let {keyword, type, StkStartTime, StkEndTime,dateTime} = this.state
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
          type: 'outWarehouseAdd/@change',
          payload: {
            applyRow: this.state.applyrow.length ? this.state.applyrow : [{}],
          }
        })
        dispatch({
          type: 'outWarehouseAdd/@change',
          payload: {
            applyRowKeys: this.state.applyrowkeys,
          }
        })
        dispatch({
          type: 'outWarehouseAdd/basicInfosChange',
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
          type: 'outWarehouseAdd/getApplyList',
          payload: {
            values:{
              keyword
            },
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
            value={keyword}
            className='margin-right'
            onChange={(e)=>{
              this.setState({
                keyword:e.target.value
              })
            }}
            onSearch={this.handleSearch}
          />
          <Select
            width={180}
            placeholder="申请类型"
            className='margin-right'
            allowClear={true}
            value={type}
            options={pickingType}
            onChange={
              (val,key) => {
                this.handleSearch(keyword, val, StkStartTime, StkEndTime)
                  this.setState({
                    type: val
                  })
              } }
          />
          <div className='date-select'>
            <p>申请时间</p>
            <DatePicker
              width={210}
              placeholder='申请时间'
              type='range'
              value={dateTime}
              alloweClear={true}
              onChange={(val,key) => {
                  this.handleSearch(keyword, type, val[0], val[1])
                  this.setState({
                    StkStartTime: val[0],
                    StkEndTime: val[1],
                    dateTime: val
                  })
                }
              }
            />
          </div>
          
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
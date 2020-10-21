/*
 * @Descripttion : 关联设备
 * @Author       : caojiarong
 * @Date         : 2020-05-12 10:57:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-28 17:33:44
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import DatePicker from 'components/DatePicker'
import { createColumnsProduct } from './columns'
import Select from 'components/Select'

@connect(({ repairOrderAdd, loading }) => ({
  repairOrderAdd,
  loading: loading.models.repairOrderAdd
}))

export default class extends Component {
  componentDidMount() {
    const { dispatch, repairOrderAdd: {deviceDataList, applyTypeList } } = this.props

    dispatch({
      type: 'repairOrderAdd/getPageInfo',
      payload: {
        values: {},
        deviceDataList: deviceDataList.startPage()
      }
    })
  }
  state = {
    applyrow: [],
    applyrowkeys: [],
    keyword:'',
    operateTimeStart: '',
    operateTimeEnd: '',
    
  }

  handleSearch = (keyword, type)=> {
    const { repairOrderAdd: { deviceDataList }, dispatch } = this.props

    dispatch({
      type: 'repairOrderAdd/getPageInfo',
      payload: {
        values: {
          keyword
        },
        deviceDataList: deviceDataList.startPage()
      }
    })
  }
  
  handleReload = () => {
    const { repairOrderAdd: {deviceDataList}, dispatch } = this.props
    dispatch({
      type: 'repairOrderAdd/@change',
      payload: {
        applyParameters: {},
      }
    })
    dispatch({
      type: 'repairOrderAdd/getPageInfo',
      payload: {
        values: {},
        deviceDataList: deviceDataList.startPage()
      }
    })
  }

  render (){
    let { repairOrderAdd: { deviceDataList, applyRowKeys,applyRowLocal}, loading, visible, dispatch, changeVisible, pickType} = this.props
    let columns = createColumnsProduct(this)
    
    let modalNormalProps = {
      title: '选择设备',
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
          type: 'repairOrderAdd/@change',
          payload: {
            applyRowKeys: this.state.applyrowkeys,
            applyRow: this.state.applyrow.length ? this.state.applyrow : [{}],
          }
        })
        dispatch({
          type: 'repairOrderAdd/basicInfosChange',
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
      dataItems: deviceDataList,
      rowKey: 'id',
      pagination: true,
      selectType: 'radio',
      onSelect: (keys, rows)=> {
        this.setState({
          applyrow: rows,
          applyrowkeys: keys
        })
      },
      selectedRowKeys: applyRowKeys,
      onChange: ({ pageNum, pageSize })=> {
        // 分页
        dispatch({
          type: 'repairOrderAdd/getPageInfo',
          payload: {
            deviceDataList: deviceDataList.jumpPage(pageNum, pageSize)
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
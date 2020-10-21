/*
 * @Descripttion : 关联单号
 * @Author       : caojiarong
 * @Date         : 2020-05-12 10:57:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 10:00:09
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import DatePicker from 'components/DatePicker'
import  { createColumnsApplyConserve, createColumnsApplyService } from './columns'
import Select from 'components/Select'

@connect(({ pickingApplyAdd, loading }) => ({
  pickingApplyAdd,
  loading: loading.models.pickingApplyAdd
}))

export default class extends Component {
  componentDidMount() {}
  state = {
    applyrow: [],
    applyrowkeys: [],
    keyword:'',
    operateTimeStart: '',
    operateTimeEnd: '',
    
  }

  handleSearch = (keyword)=> {
    const { pickingApplyAdd: { applyDataList }, dispatch } = this.props
    // let {type}=this.state
    dispatch({
      type: 'pickingApplyAdd/getRelateList',
      payload: {
        keyword,
        applyDataList
      }
    })
    this.setState({keyword})
  }
  
  handleReload = () => {
    const { pickingApplyAdd: {applyDataList}, dispatch } = this.props
    this.setState({keyword:''})
    dispatch({
      type: 'pickingApplyAdd/@change',
      payload: {
        applyParameters: {},
      }
    })
    dispatch({
      type: 'pickingApplyAdd/getRelateList',
      payload: {
        applyDataList,
      }
    })
  } 
  
  render (){
    let { pickingApplyAdd: { basicInfos,applyDataList, applyRowKeys}, loading, visible, dispatch, changeVisible} = this.props
    let columns = basicInfos.type == 2 ? createColumnsApplyConserve(this) : createColumnsApplyService(this)
    let {keyword}=this.state
    let modalNormalProps = {
      title: basicInfos.type == 2 ? '选择养护工单' : '选择维修工单',
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
            applyRowKeys: this.state.applyrowkeys,
            applyRow: this.state.applyrow.length ? this.state.applyrow : [{}],
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
        this.setState({
          applyrow: rows,
          applyrowkeys: keys
        })
      },
      selectedRowKeys: applyRowKeys,
      onChange: ({ pageNum, pageSize })=> {
        // 分页
        dispatch({
          type: 'pickingApplyAdd/getRelateList',
          payload: {
            keyword,
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
            onSearch={this.handleSearch}
            onChange={(e)=>this.setState({keyword:e.target.value})}
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
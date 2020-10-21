/*
 * @Descripttion : 报修工单分派
 * @Author       : caojiarong
 * @Date         : 2020-06-17 10:57:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-29 16:44:24
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal, Modal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import  { assignColumns } from './columns'

@connect(({ repairOrder, loading }) => ({
  repairOrder,
  loading: loading.models.repairOrder
}))

export default class extends Component {
  
  state = {
    applyrow: [],
    applyrowkeys: [],
    keyword:'',
    operateTimeStart: '',
    operateTimeEnd: '',
    keyword:''
  }

  handleSearch = (keyword, type)=> {
    const { repairOrder: { assignDataList }, dispatch } = this.props

    dispatch({
      type: 'repairOrder/getAssignDataList',
      payload: {
        keyword,
        enterpriseId:JSON.parse(window.localStorage.getItem('user')).enterpriseId,
        assignDataList
      }
    })
  }
  
  handleReload = () => {
    const { repairOrder: {assignDataList}, dispatch } = this.props
    dispatch({
      type: 'repairOrder/@change',
      payload: {
        applyParameters: {},
      }
    })
    dispatch({
      type: 'repairOrder/getAssignDataList',
      payload: {
        assignDataList
      }
    })
    this.setState({keyword:''})
  }
  
  handleDispatch = () =>{
    const {dispatch} = this.props
    dispatch({
      type: 'repairOrder/submitAssign',
      payload: {
        val: this.state.applyrowkeys[0],
        key:'applyCode'
      }
    })
    changeVisible(false)
  }

  render (){
    let { repairOrder: { assignDataList, applyRowKeys,applyParams, applyTypeList  }, loading, visible, dispatch, changeVisible, title} = this.props
    let columns = assignColumns(this)
    let {keyword}=this.state
    let modalNormalProps = {
      title: title || '分派维修任务',
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
        Modal.confirm({
          title: '注意',
          content: `确定${title}给该维修人员？`,
          onOk: () => {
            this.handleDispatch()
          },
          onCancel() {},
        })
      }
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns,
      dataItems: assignDataList,
      rowKey: 'id',
      pagination: true,
      selectType: 'radio',
      onSelect: (keys, rows)=> {
        // this.state.applyrow = rows
        this.state.applyrowkeys = keys
      },
      selectedRowKeys: applyRowKeys,
      onChange: ({ pageNum, pageSize })=> {
        // 分页
        dispatch({
          type: 'repairOrder/getAllPeople',
          payload: {
            assignDataList: assignDataList.jumpPage(pageNum, pageSize)
          }
        })
      }
    }
    return (
    <ModalNormal {...modalNormalProps}>
      <div className="module-function-wrap">
        <Toolbar>
          <Search
            placeholder="维修员姓名"
            width={200}
            className='margin-right'
            onSearch={this.handleSearch}
            value={keyword}
            onChange={e=>this.setState({keyword:e.target.value})}
          />
          {/* <Select
            width={180}
            placeholder="资质证书"
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
           */}
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
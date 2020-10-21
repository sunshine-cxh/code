/*
 * @Descripttion : 重点用户申报
 * @Author       : caojiarong
 * @Date         : 2020-08-27 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-04 17:46:35
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import {ModalForm} from 'components/Modal'
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import DatePicker from 'components/DatePicker'
import { Link } from 'dva/router'
import { routePrefix } from '../../../../config'
import  {historyDataColumns} from './columns'

import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ keyUserApproval, loading }) => ({
  keyUserApproval,
  loading: loading.models.keyUserApproval
}))
export default class HistoryData extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    keyword:'',
    visible:false,
    record:{},
    newPointRecord:{}
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'keyUserApproval/init'
    })



  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword)=> {
    const { keyUserApproval: { pageData }, dispatch } = this.props

    dispatch({
      type: 'keyUserApproval/getPageData',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }

  // 详情
  handleDetails = (record)=> {
    console.log(record)
    const { dispatch } = this.props
    dispatch({
      type: 'keyUserApproval/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch(routerRedux.push({
            pathname: `${routePrefix}/modelWarehouse/subModelDetail`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }

  // 修改
  handleEdit = (record)=> {
    const { dispatch } = this.props
    dispatch({
      type: 'keyUserApproval/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch(routerRedux.push({
            pathname: `${routePrefix}/modelWarehouse/subModelAdd`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }


  // 删除路线
  handleDelete = (id)=>{
    this.props.dispatch({
      type:'keyUserApproval/deleteLine',
      payload:{
        id,
        success:()=>{
          this.props.dispatch({
            type:'keyUserApproval/init'
          })
        }
      }
    })
  }

  // 刷新
  handleReload = () => {
    const { keyUserApproval: {pageData}, dispatch } = this.props
    dispatch({
      type: 'keyUserApproval/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'keyUserApproval/getPageData',
      payload: {
        pageData: pageData.startPage()
      }
    })
    this.setState({keyword:''})
  }

  // 生成巡检点
  handleNewPoint=(newPointRecord)=>{
    this.setState({newPointRecord,visible:true})
  }


  render() {
    let {dispatch}=this.props
    let columns = historyDataColumns(this)
    let {historyPageData, historyData }=this.props.keyUserApproval
    historyPageData.list = historyData.declareHistory
    let dataTableProps = {
      // loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: historyPageData,
      pagination:false,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'keyUserApproval/getPageData',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }) //表格有复选框选项
    }
    

    
    return (
      <div>
        <h3 style={{fontWeight:'bold'}}>历史申报</h3>
        <DataTable {...dataTableProps} />
        <div className='data-situation'>
          <span>合计：</span>
          <span>采购合同指定量：{historyData.contractSpecifiedAmount}</span>
          <span>累计使用量：{historyData.cumulativeUsage}</span>
          <span>偏差比：{historyData.deviationRate}</span>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import {Modal} from 'components/Modal'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { routesPrefix } from '../../../../config'
import  {createColumns, createFormColumns} from './columns'

import '../../style/queryMain.less'
import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ outWarehouse, loading }) => ({
  outWarehouse,
  loading: loading.models.outWarehouse
}))
export default class outWarehouse extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
    visible: false,
    keyword:''
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'outWarehouse/init'
    })

    this.props.dispatch({
      type: 'outWarehouse/getWarehouse'
    })
    
    this.props.dispatch({
      type: 'outWarehouse/@change',
      payload: {
        popoverVisible: false
      }
    })
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword)=> {
    const { outWarehouse: { pageData }, dispatch } = this.props

    dispatch({
      type: 'outWarehouse/getPageInfo',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }

  // 出库详情
  handleDetails = (record)=> {
    const { dispatch } = this.props
    dispatch({
      type: 'outWarehouse/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          // $$.setStore('equipment-outWarehouse-id', record.id)
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/outWarehouse/subOutWarehouseDetail`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }

    // 删除确认提示
  handleDelete = (record) =>{
    Modal.confirm({
      title: '注意',
      content: '是否要撤销该条记录？',
      onOk: () => {
        this.deleteFn(record)
      },
      onCancel() {},
    })
  }

  deleteFn = (record) =>{
    const { dispatch, outWarehouse } = this.props
    let { pageData } = outWarehouse
    let { total} = pageData
    let pageNum = pageData.pageNum
    let leaveNum = (parseInt(total) -1) % 10
    if(leaveNum === 0 && pageNum != 1){
      pageNum --
    }
    dispatch({
      type: 'outWarehouse/revoke',
      payload: {
        id: record.id,
        success:()=>{
          dispatch({
            type: 'outWarehouse/getPageInfo',
            payload: {
              pageData: pageData.jumpPage(pageNum, 10)
            }
          })
        }
      }
    })
  }

  handleCheck = (record)=> {
    this.onVisible(true)
  }

  onVisible = (visible)=> {
    this.setState({
      visible
    })
  }
  // 新增出库管理
  handleAdd = ()=> {
    this.props.dispatch(routerRedux.push({
      pathname: `${routesPrefix}/outWarehouse/subOutWarehouseAdd`
    }))
  }

  // 刷新
  handleReload = () => {
    const { outWarehouse: {pageData}, dispatch } = this.props
    dispatch({
      type: 'outWarehouse/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'outWarehouse/getPageInfo',
      payload: {
        pageData: pageData.startPage()
      }
    })
    this.setState({keyword:''})
  }
  render() {
    const { keyword } = this.state
    let { dispatch, outWarehouse, loading} = this.props
    let { pageData, popoverVisible, warehouseList, parameters, } = outWarehouse
    let columns = createColumns(this, this.state.record)
    let formColumns = createFormColumns(this, warehouseList)
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'outWarehouse/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }) //表格有复选框选项
    }
    let filterLayoutProps = {
      columns: formColumns,
      searchevent: (form)=> { 
        let forms = {
          code: form.code,
          warehouseId: form.warehouseId,
          operateTimeStart : form.operateTime && form.operateTime[0] && form.operateTime[0].format('YYYY-MM-DD'),
          operateTimeEnd : form.operateTime && form.operateTime[1] && form.operateTime[1].format('YYYY-MM-DD')
        }
        const { outWarehouse: {pageData}, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'outWarehouse/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'outWarehouse/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: pageData.startPage()
          }
        })
      },
      popoverVisible,
      popoverChange: ()=> {
        dispatch({
          type: 'outWarehouse/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }
    return (
      <div className="procurement-plan__query" onClick={()=>{
        dispatch({
          type: 'outWarehouse/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
          <section className="search-area">
            <Toolbar>
              <Search
                placeholder="出库单号 / 出库仓库"
                onSearch={this.searchHandler}
                value={keyword}
                onChange={e=>this.setState({keyword:e.target.value})}
                />
              <Button
                type="primary2" className="toolbar-item"
                onClick={this.handleReload}
                icon="reload">
                  刷新
              </Button>
              <Link to={`${routesPrefix}/outWarehouse/subOutWarehouseAdd`}>
                <Button
                  type="primary2" className="toolbar-item"
                  icon="plus">
                    新增
                </Button>
              </Link>
              <SearchLayout {...filterLayoutProps}></SearchLayout>
            </Toolbar>
          </section>
          <DataTable {...dataTableProps} />
        </div>
      
    )
  }
}

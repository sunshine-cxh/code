/*
 * @Descripttion : 仓库盘点页面
 * @Author       : caojiarong
 * @Date         : 2020-05-25 11:15:10
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:52:22
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { routesPrefix } from '../../../../config'
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { Modal } from 'components/Modal'
import  {createColumns, createFormColumns} from './columns'

import '../../style/queryMain.less'
import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ warehouseInventory, loading }) => ({
  warehouseInventory,
  loading: loading.models.warehouseInventory
}))
export default class Main extends Component {
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
      type: 'warehouseInventory/init'
    })

    this.props.dispatch({
      type: 'warehouseInventory/getWarehouse'
    })

    this.props.dispatch({
      type: 'warehouseInventory/@change',
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
    const { warehouseInventory: { pageData }, dispatch } = this.props

    dispatch({
      type: 'warehouseInventory/getPageInfo',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }

  // 仓库盘点详情
  handleDetails = (record)=> {
    const { dispatch } = this.props
    dispatch({
      type: 'warehouseInventory/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/warehouseInventory/subWarehouseInventoryDetail`,
            search: `id=${record.id}`
          }))
        }
      }
    })
  }

  // 出 / 入库单详情   todo:修改id取值参数
  handleToPage = (type,record) =>{
    const { dispatch } = this.props
    if(type === 'in'){
      dispatch({
        type: 'warehouseInventory/toInWarehouse',
        payload: {
          id: record.inWarehouseId,
          success: ()=> {
            dispatch(routerRedux.push({
              pathname: `${routesPrefix}/inWarehouse/subWarehouseDetail`,
              search: `id=${record.inWarehouseId}`
            }))
          }
        }
      })
    }else if(type === 'out'){
      dispatch({
        type: 'warehouseInventory/toOutWarehouse',
        payload: {
          id: record.outWarehouseId,
          success: ()=> {
            dispatch(routerRedux.push({
              pathname: `${routesPrefix}/outWarehouse/subOutWarehouseDetail`,
              search: `id=${record.inWarehouseId}`
            }))
          }
        }
      })
    }
  }

  deleteFn = (id)=> {
    const { dispatch, warehouseInventory } = this.props
    let { pageData } = warehouseInventory
    let { total} = pageData
    let pageNum = pageData.pageNum
    let leaveNum = (parseInt(total) -1) % 10
    if(leaveNum === 0 && pageNum != 1){
      pageNum --
    }
    dispatch({
      type: 'warehouseInventory/revoke',
      payload: {
        id: id,
        success:()=>{
          dispatch({
            type: 'warehouseInventory/getPageInfo',
            payload: {
              pageData: pageData.jumpPage(pageNum, 10)
            }
          })
        }
      }
    })
  }

  // 删除确认提示
  handleDelete = (id) =>{
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
       this.deleteFn(id)
      },
      onCancel() {},
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
  // 新增入库管理
  handleAdd = ()=> {
    this.props.dispatch(routerRedux.push({
      pathname: `${routesPrefix}/warehouseInventory/subWarehouseAdd`
    }))
  }
  // 刷新
  handleReload = () => {
    const { warehouseInventory: {pageData}, dispatch } = this.props
    dispatch({
      type: 'warehouseInventory/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'warehouseInventory/getPageInfo',
      payload: {
        pageData: pageData.startPage()
      }
    })
    this.setState({keyword:''})
  }
  render() {
    const { keyword } = this.state
    let { dispatch, warehouseInventory, loading} = this.props
    let { pageData, popoverVisible, parameters, warehouseList} = warehouseInventory
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
          type: 'warehouseInventory/getPageInfo',
          payload: {
            values:{
              keyword
            },
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
        const { warehouseInventory: {pageData}, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'warehouseInventory/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'warehouseInventory/getPageInfo',
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
          type: 'warehouseInventory/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }
    return (
      <div className="procurement-plan__query" onClick={()=>{
        dispatch({
          type: 'warehouseInventory/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
        <section className="search-area">
          <Toolbar>
            <Search
              placeholder="盘点单号 / 盘点仓库"
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
            <Link to={`${routesPrefix}/warehouseInventory/subWarehouseInventoryAdd`}>
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

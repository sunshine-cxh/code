/*
 * @Descripttion : 重点用户申报
 * @Author       : caojiarong
 * @Date         : 2020-08-27 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-04 15:47:57
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import {ModalForm} from 'components/Modal'
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { routePrefix } from '../../../../config'
import  {columnsData, filterColumns} from './columns'

import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ keyUserApproval, loading }) => ({
  keyUserApproval,
  loading: loading.models.keyUserApproval
}))
export default class keyUserApproval extends Component {
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
    const { dispatch } = this.props
    dispatch({
      type: 'keyUserApproval/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch(routerRedux.push({
            pathname: `${routePrefix}/keyUserApproval/subApprovalDetail`,
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
    let columns = columnsData(this)
    let formColumns = filterColumns(this)
    let {keyword}=this.state
    let {pageData, popoverVisible, }=this.props.keyUserApproval
    let dataTableProps = {
      // loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
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
    let filterLayoutProps = {
      columns: formColumns,
      searchevent: (form)=> { 
        // TODO  修改参数名-----------------------------
        let forms = {
          departmentId: form.departmentId,
          declareType: form.declareType,
          startTime: form.time && form.time[0],
          endTime: form.time && form.time[1]
        }
        const { keyUserApproval: {pageData}, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'keyUserApproval/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'keyUserApproval/getPageData',
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
          type: 'keyUserApproval/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }

    
    return (
      <div className="keyUserApproval__query">
          <section className="search-area">
            <Toolbar>
              <Search
                placeholder="公司名称"
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
              <SearchLayout {...filterLayoutProps} />
              {/* <Link to={`${routePrefix}/keyUserApproval/subCaculate`}>
                <Button
                  type="primary2" className="toolbar-item"
                  >
                    计算参考批复量
                </Button>
              </Link> */}
              
            </Toolbar>
          </section>
          <DataTable {...dataTableProps} />
          {/* <ModalForm {...modalFormProps} /> */}
        </div>
      
    )
  }
}

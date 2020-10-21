import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { routesPrefix } from '../../../../config'
import  {createColumns, createFormColumns} from './columns'

import '../../style/queryMain.less'
import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'
import CheckFlow from './CheckFlow'

let loaded = false
@connect(({ pickingApply, loading }) => ({
  pickingApply,
  loading: loading.models.pickingApply
}))
export default class pickingApply extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
    visible: false,
    flowVisible:false,
    keyword:''
  }
  componentDidMount() {
    $$.setStore('pre-route-path','')
    this.props.dispatch({
      type: 'pickingApply/init'
    })

    this.props.dispatch({
      type: 'pickingApply/getUnit'
    })

    this.props.dispatch({
      type: 'pickingApply/@change',
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
    const { pickingApply: { pageData }, dispatch } = this.props

    dispatch({
      type: 'pickingApply/getPageInfo',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }

  // 领料详情
  handleDetails = (record)=> {
    const { dispatch } = this.props
    dispatch({
      type: 'pickingApply/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          // $$.setStore('equipment-pickingApply-id', record.id)
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/pickingApply/subPickingApplyDetail`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }

  // 领料详情
  handleEdit = (record)=> {
    const { dispatch } = this.props
    dispatch({
      type: 'pickingApply/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          // $$.setStore('equipment-pickingApply-id', record.id)
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/pickingApply/subPickingApplyAdd`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }

  handleCheck = (record)=> {
    const { dispatch } = this.props
    
    dispatch({
      type: 'pickingApply/getauditflowchart',
      payload: {
        id: record.id,
        success: ()=> {
          this.onVisible(true)
        }
      }
    })
  }

  onVisible = (flowVisible)=> {
    this.setState({
      flowVisible
    })
  }

  onFlowVisible=(flowVisible)=>{
    this.setState({
      flowVisible
    })
  }
  // 新增领料申请管理
  handleAdd = ()=> {
    this.props.dispatch(routerRedux.push({
      pathname: `${routesPrefix}/pickingApply/subPickingApplyAdd`
    }))
  }

  // 刷新
  handleReload = () => {
    const { pickingApply: {pageData}, dispatch } = this.props
    dispatch({
      type: 'pickingApply/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'pickingApply/getPageInfo',
      payload: {
        pageData: pageData.startPage()
      }
    })
    this.setState({keyword:''})
  }
  render() {
    const { keyword } = this.state
    let { dispatch, pickingApply, loading} = this.props
    let { pageData, popoverVisible, approveStatusList, pickingTypeList,parameters, } = pickingApply
    let columns = createColumns(this, this.state.record)
    let formColumns = createFormColumns(this, approveStatusList, pickingTypeList)
    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'pickingApply/getPageInfo',
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
          sn: form.code,
          type: parseInt(form.type),
          auditStatus: parseInt(form.auditStatus),
          stkStartTime : form.operateTime && form.operateTime[0] && form.operateTime[0].format('YYYY-MM-DD'),
          stkEndTime : form.operateTime && form.operateTime[1] && form.operateTime[1].format('YYYY-MM-DD')
        }
        const { pickingApply: {pageData}, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'pickingApply/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'pickingApply/getPageInfo',
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
        this.props.dispatch({
          type: 'pickingApply/getPickingTypeList',
          payload:{
             pickingTypeList
          }
        })
    
        this.props.dispatch({
          type: 'pickingApply/getApproveStatus',
          payload: {
            approveStatusList
          }
        })
        dispatch({
          type: 'pickingApply/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }
    return (
      <div className="procurement-plan__query" onClick={()=>{
        dispatch({
          type: 'pickingApply/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
          <section className="search-area">
            <Toolbar>
              <Search
                placeholder="申请单号 / 申请人"
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
              <Link to={`${routesPrefix}/pickingApply/subPickingApplyAdd`}>
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
          <CheckFlow visible={this.state.flowVisible} onVisible={this.onFlowVisible}/>
        </div>
      
    )
  }
}

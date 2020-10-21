import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import {ModalForm} from 'components/Modal'
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { routePrefix } from '../../../config'
import  {columnsData, filterColumns} from './columns'

import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ modelHouse, loading }) => ({
  modelHouse,
  loading: loading.models.modelHouse
}))
export default class modelHouse extends Component {
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
      type: 'modelHouse/init'
    })



  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword)=> {
    const { modelHouse: { pageData }, dispatch } = this.props

    dispatch({
      type: 'modelHouse/getPageData',
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
      type: 'modelHouse/getDetails',
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
      type: 'modelHouse/getDetails',
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

  // 新增路线管理
  // handleAdd = ()=> {
  //   this.props.dispatch(routerRedux.push({
  //     pathname: `${routePrefix}/modelHouse/subPickingApplyAdd`
  //   }))
  // } 

  // 删除路线
  handleDelete = (id)=>{
    this.props.dispatch({
      type:'modelHouse/deleteLine',
      payload:{
        id,
        success:()=>{
          this.props.dispatch({
            type:'modelHouse/init'
          })
        }
      }
    })
  }

  // 刷新
  handleReload = () => {
    const { modelHouse: {pageData}, dispatch } = this.props
    dispatch({
      type: 'modelHouse/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'modelHouse/getPageData',
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
    let {keyword, record, visible,newPointRecord}=this.state
    let {pageData, popoverVisible, }=this.props.modelHouse
    let dataTableProps = {
      // loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'modelHouse/getPageData',
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
        // todo  修改参数名
        let forms = {
          code: form.code,
          name: form.name,
          module: form.module,
          createdName:form.createdName,
          createdOn:form.createdOn
        }
        const { modelHouse: {pageData}, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'modelHouse/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'modelHouse/getPageData',
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
          type: 'modelHouse/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }

    
    return (
      <div className="modelHouse__query">
          <section className="search-area">
            <Toolbar>
              <Search
                placeholder="编号 / 名称"
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
              <Link to={`${routePrefix}/modelWarehouse/subModelAdd`}>
                <Button
                  type="primary2" className="toolbar-item"
                  icon="plus" >
                    新增
                </Button>
              </Link>
              <SearchLayout {...filterLayoutProps} />
            </Toolbar>
          </section>
          <DataTable {...dataTableProps} />
          {/* <ModalForm {...modalFormProps} /> */}
        </div>
      
    )
  }
}

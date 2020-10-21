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
import  {columnsData, filterColumns, modalFormColumns} from './columns'

import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ pipLineManage, loading }) => ({
  pipLineManage,
  loading: loading.models.pipLineManage
}))
export default class pipLineManage extends Component {
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
      type: 'pipLineManage/init'
    })

  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword)=> {
    const { pipLineManage: { pageData }, dispatch } = this.props

    dispatch({
      type: 'pipLineManage/getPageData',
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
      type: 'pipLineManage/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch(routerRedux.push({
            pathname: `${routePrefix}/pipLineManage/subPipLineDetail`,
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
      type: 'pipLineManage/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch(routerRedux.push({
            pathname: `${routePrefix}/pipLineManage/subPipLineAdd`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }

  // 新增路线管理
  handleAdd = ()=> {
    this.props.dispatch(routerRedux.push({
      pathname: `${routePrefix}/pipLineManage/subPickingApplyAdd`
    }))
  } 

  // 删除路线
  handleDelete = (id)=>{
    this.props.dispatch({
      type:'pipLineManage/deleteLine',
      payload:{
        id,
        success:()=>{
          console.log('deleteWork')
          this.props.dispatch({
            type:'pipLineManage/init'
          })
        }
      }
    })
  }

  // 刷新
  handleReload = () => {
    const { pipLineManage: {pageData}, dispatch } = this.props
    dispatch({
      type: 'pipLineManage/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'pipLineManage/getPageData',
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
    let modalColumns = modalFormColumns(this)
    let {keyword, record, visible,newPointRecord}=this.state
    let {pageData, popoverVisible, }=this.props.pipLineManage
    let dataTableProps = {
      // loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'pipLineManage/getPageData',
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
          area: form.area
        }
        const { pipLineManage: {pageData}, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'pipLineManage/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'pipLineManage/getPageData',
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
          type: 'pipLineManage/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }

    let modalFormProps = {
      record:newPointRecord,
      visible,
      title:'生成巡检点',
      columns: modalColumns,
      modalOpts: {
        width: 740,
        height: 640
      },
      onCancel: () => {
        this.setState({
          record: {},
          visible: false,
        })
      },
      // 新增、修改都会进到这个方法中，可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        values.inspectionPointNum = parseInt(values.inspectionPointNum)
        values.range = parseInt(values.range)
        dispatch({
          type: 'pipLineManage/generatepoint',
          payload: {
            pointData:values,
            success: () => {
              this.setState({
                record: {},
                visible: false,
              })
              dispatch({
                type: 'pipLineManage/getPageData',
                payload:{
                  pageData
                }
              })
            },
          },
        })
      },
    }
    console.log(newPointRecord)
    return (
      <div className="PipLineManage__query">
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
              <Link to={`${routePrefix}/pipLineManage/subPipLineAdd`}>
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
          <ModalForm {...modalFormProps} />
        </div>
      
    )
  }
}

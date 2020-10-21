import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import BaseComponent from 'components/BaseComponent'
import {Modal, ModalForm} from 'components/Modal'
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
@connect(({ pointManage, loading }) => ({
  pointManage,
  loading: loading.models.pointManage
}))
export default class pointManage extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    keyword:'',
    visible:false,
    record:{}
  }
  componentDidMount() {
    let {code}=this.props
    console.log(code)
    if(code){this.setState({keyword:code})}
    this.props.dispatch({
      type: 'pointManage/init',
      payload:{
        values:{
          keyword:code
        }
      }
    })
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword)=> {
    const { pointManage: { pageData }, dispatch } = this.props
    
    dispatch({
      type: 'pointManage/getPageData',
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
      type: 'pointManage/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch(routerRedux.push({
            pathname: `${routePrefix}/pointManage/pointManageDetail`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }

  // 修改
  handleEdit = (record)=> {
    record.method = record.method + ''
    console.log(record)
    this.setState({record,visible:true})
  }

  // 新增巡检点管理
  handleAdd = ()=> {
    this.props.dispatch(routerRedux.push({
      pathname: `${routePrefix}/pointManage/subPickingApplyAdd`
    }))
  }

  // 删除巡检点
  deleteFn = (id)=>{
    this.props.dispatch({
      type:'pointManage/deleteFn',
      payload:{
        id,
        success:()=>{
          console.log('deleteWork')
          this.props.dispatch({
            type:'pointManage/init'
          })
        }
      }
    })
  }

  // 删除确认提示
  handleDelete = (id) =>{
    Modal.confirm({
      title: '提示',
      content: '是否删除巡检点，请确认！',
      onOk: () => {
        this.deleteFn(id)
      },
      onCancel() {},
    })
  }

  // 刷新
  handleReload = () => {
    const { pointManage: {pageData}, dispatch } = this.props
    dispatch({
      type: 'pointManage/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'pointManage/getPageData',
      payload: {
        pageData: pageData.startPage(),
        values:{keyword:''}
      }
    })
    this.setState({keyword:''})
  }
  render() {
    let {dispatch}=this.props
    let columns = columnsData(this)
    let formColumns = filterColumns(this)
    let modalColumns = modalFormColumns(this)
    let {keyword, record, visible}=this.state
    let {pageData, popoverVisible, }=this.props.pointManage
    let dataTableProps = {
      // loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'pointManage/getPageData',
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
          pipelineId: form.pipelineId
        }
        const { pointManage: {pageData}, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'pointManage/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'pointManage/getPageData',
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
          type: 'pointManage/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }

    let modalFormProps = {
      record,
      visible,
      title: record.id ? '编辑' :'新增',
      columns: modalColumns,
      modalOpts: {
        width: 740,
        height: 740
      },
      onCancel: () => {
        this.setState({
          record: {},
          visible: false,
        })
      },
      // 新增、修改都会进到这个方法中，可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        // 若有id则为编辑，需要传id
        if(record.id){
          values.id=record.id
        }
        values.method = parseInt(values.method)
        values.range = parseInt(values.range)
        dispatch({
          type: 'pointManage/submit',
          payload: {
            values,
            success: () => {
              this.setState({
                record: {},
                visible: false,
              })
              dispatch({
                type: 'pointManage/getPageData',
                payload:{
                  pageData
                }
              })
            },
          },
        })
      },
    }
    return (
      <div className="pointManage__query">
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
            <Button
              type="primary2" className="toolbar-item"
              icon="plus" 
              onClick={()=>{this.setState({record:{},visible:true})}}
              >
              新增
            </Button>
            <SearchLayout {...filterLayoutProps} />
          </Toolbar>
        </section>
        <DataTable {...dataTableProps} />
        <ModalForm {...modalFormProps} />
      </div>
      
    )
  }
}

/*
 * @Descripttion : 合同信息
 * @Author       : caojiarong
 * @Date         : 2020-09-01 08:59:47
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 14:51:44
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import {ModalForm, Modal} from 'components/Modal'
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { routePrefix } from '../../../../config'
import  {columnsData, filterColumns} from './columns'
import ChildContractList from './ChildContractList'
import PageHelper from 'utils/pageHelper'
import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'

let loaded = false
@connect(({ contractInfo, loading }) => ({
  contractInfo,
  loading: loading.models.contractInfo
}))
export default class contractInfo extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    keyword:'',
    visible:false,
    record:{},
    newPointRecord:{},
    childVisible:false,
    // parentId:''
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'contractInfo/init'
    })



  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword)=> {
    const { contractInfo: { pageData }, dispatch } = this.props

    dispatch({
      type: 'contractInfo/getPageData',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }

  // 详情
  // handleDetails = (record)=> {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'contractInfo/getDetails',
  //     payload: {
  //       id: record.id,
  //       success: ()=> {
  //         dispatch(routerRedux.push({
  //           pathname: `${routePrefix}/modelWarehouse/subModelDetail`,
  //           search: `id=${record.id}`,
  //         }))
  //       }
  //     }
  //   })
  // }

  // 修改
  handleEdit = (record)=> {
    const { dispatch } = this.props
    dispatch({
      type: 'contractInfo/getDetails',
      payload: {
        id: record.id,
        success: ()=> {
          dispatch(routerRedux.push({
            pathname: `${routePrefix}/gasPurchasePlan/contractInfo/subContractAdd`,
            search: `id=${record.id}`,
          }))
        }
      }
    })
  }

  // 新增补充协议
  handleAdd=(record)=>{
    this.props.dispatch(routerRedux.push({
      pathname: `${routePrefix}/gasPurchasePlan/contractInfo/subContractAdd`,
      search: `fatherId=${record.id}`,
    }))
  }
  
  handleDelete = (record)=>{
    Modal.confirm({
      title:'注意',
      content:'是否删本条数据',
      onOk:()=>{
        this.deleteFn(record.id)
      }
    })
  }

  // 删除路线
  deleteFn = (id)=>{
    this.props.dispatch({
      type:'contractInfo/deleteFn',
      payload:{
        id,
        success:()=>{
          this.props.dispatch({
            type:'contractInfo/getPageData',
            payload:{
              values:{keyword:''},
              pageData:PageHelper.create()
            }
          })
        }
      }
    })
  }

  // 刷新
  handleReload = () => {
    const { contractInfo: {pageData}, dispatch } = this.props
    dispatch({
      type: 'contractInfo/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'contractInfo/getPageData',
      payload: {
        pageData: pageData.startPage()
      }
    })
    this.setState({keyword:''})
  }


  onChangeVisible = (childVisible,parentId)=> {
    const { dispatch } = this.props
    if(parentId){
      this.setState({
        childVisible,
        parentId
      })
      dispatch({
        type:'contractInfo/getChildList',
        payload:{
          id:parentId
        }
      })
    }else{
      this.setState({
        childVisible
      })
    }
  }


  render() {
    let {dispatch}=this.props
    let columns = columnsData(this)
    let formColumns = filterColumns(this)
    let {keyword, childVisible, visible,newPointRecord}=this.state
    let {pageData, popoverVisible, }=this.props.contractInfo
    let dataTableProps = {
      // loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'contractInfo/getPageData',
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
          seller: form.seller,
          buyer: form.buyer,
          contractType: form.contractType,
          isTemp: form.isTemp,
          status: form.status,
          deliveryAddrss: form.deliveryAddrss
        }
        const { contractInfo: {pageData}, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'contractInfo/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'contractInfo/getPageData',
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
          type: 'contractInfo/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }

    

    const contractListProps = {
      childVisible,
      onChangeVisible: this.onChangeVisible
    }

    
    return (
      <div className="contractInfo__query">
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
              <Link to={`${routePrefix}/gasPurchasePlan/contractInfo/subContractAdd`}>
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
          <ChildContractList {...contractListProps}  />
        </div>
    )
  }
}

/*
 * @Descripttion : 报修工单页面
 * @Author       : caojiarong
 * @Date         : 2020-06-17 11:15:10
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-07 16:48:02
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import { Modal, ModalForm } from 'components/Modal'
import { createColumns, createFormColumns, revokeColumns } from './columns'
import { routesPrefix } from '../../../../config'
import '../../style/queryMain.less'
import $$ from 'cmn-utils';
import SearchLayout from 'components/SearchLayout'
import AssignOrder from './assignOrder'
import { notice } from 'components/Notification'

let loaded = false
@connect(({ repairOrder, loading }) => ({
  repairOrder,
  loading: loading.models.repairOrder
}))
export default class repairOrder extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    data: {},
    record: null,
    visible: false,
    addInfoVisible:false,
    revokeRecord:{},
    assignRecord:{},
    dispatchTitle:'分派',
    keyword:''
    // flowVisible:false
  }
  
  componentDidMount() {
    const { dispatch } = this.props
    this.props.dispatch({
      type: 'repairOrder/init'
    })

    this.props.dispatch({
      type: 'repairOrder/@change',
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
  searchHandler = (keyword) => {
    const { repairOrder: { pageData }, dispatch } = this.props

    dispatch({
      type: 'repairOrder/getPageInfo',
      payload: {
        values: {
          keyword
        },
        pageData: pageData.startPage()
      }
    })
  }


  // 报修详情
  handleDetails = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'repairOrder/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/repairOrder/subRepairOrderDetail`,
            search: `id=${record.id}`
          }))
        }
      }
    })
  }

  // 新增
  handleAdd = () => {
    this.props.dispatch(routerRedux.push({
      pathname: `${routesPrefix}/repairOrder/subRepairOrderAdd`
    }))
  }

  // 删除
  deleteFn = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'repairOrder/deleteRecord',
      payload: {
        id: record.id
      }
    })
  }

  handleDelete = (record, type, msg = '请确认该操作') => {
    Modal.confirm({
      title: '注意',
      content: msg,
      onOk: () => {
        if(type == 'delete'){
          this.deleteFn(record)
        }else{
          this.handleSwitch(record)
        }
      },
      onCancel() { },
    })
  }

  toDeviceDetail = (id) =>{
    const { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/standingBook/substandingBookDetail`,
        search: `id=${id}`
      })
    )
  }

  // 刷新
  handleReload = () => {
    const { repairOrder: { pageData }, dispatch } = this.props
    dispatch({
      type: 'repairOrder/@change',
      payload: {
        parameters: {},
      }
    })
    dispatch({
      type: 'repairOrder/getPageInfo',
      payload: {
        pageData: pageData.startPage()
      }
    })
    this.setState({keyword:''})
  }
  clearEditId = () => {
    $$.setStore('equipment-repairOrder-id', '')
  }

  // 分派
  assign = (record, dispatchTitle)=>{
  // todo
    this.changeVisible(true)
    this.setState({assignRecord:record})
    this.setState({dispatchTitle})
  }

  // 撤销
  handleRevoke = (record) =>{
    // todo 编辑当前详情内容
    this.setState({
      addInfoVisible: true,
      revokeRecord:record
    })
  }

  changeVisible=(visible)=>{
    this.setState({
      visible
    })
  }
  onSubmitRevoke= (values)=> {
    let {revokeRecord} = this.state
    const {dispatch} = this.props
    Modal.confirm({
      title: '注意',
      content: `确定撤销该条记录？`,
      onOk: () => {
        dispatch({
          type: 'repairOrder/revocation',
          payload:{
            id:revokeRecord.id,
            result: values.result,
            success:()=>{
              this.setState({
                addInfoVisible:false
              })
              notice.success('撤销成功')
            }
          }
        })
      },
      onCancel() {},
    })
  }
  render() {
    const { addInfoVisible, assignRecord, revokeRecord, keyword } = this.state
    let { dispatch, repairOrder, loading } = this.props
    let { pageData, popoverVisible, warehouseList } = repairOrder
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
          type: 'repairOrder/getPageInfo',
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
      searchevent: (form) => {  //todo传值需要修改
        let forms = {
          code: form.code,
          ledgerName: form.ledgerName,
          ledgerCode: form.ledgerCode,
          processor: form.processor,
          reportUserId: form.reportUserId,
          state: parseInt(form.state),
          reportTime: form.reportTime
        }
        const { repairOrder: { pageData }, dispatch } = this.props

        // 隐藏 筛选框
        dispatch({
          type: 'repairOrder/@change',
          payload: {
            popoverVisible: false
          }
        })

        dispatch({
          type: 'repairOrder/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: pageData.startPage()
          }
        })
      },
      popoverVisible,
      popoverChange: () => {
        dispatch({
          type: 'repairOrder/@change',
          payload: {
            popoverVisible: true
          }
        })
      }
    }
    // 撤销配置
    let modalFormProps = {
      visible: addInfoVisible,
      columns: columns,
      record:revokeRecord,
      modalOpts: {
        width: 740
      },
      footer: [],
      title:'撤销',
      onSubmitTitle: '确定',
      onCancel: () => {
        this.setState({
          record: null,
          addInfoVisible: false
        })
      },
      // 提交撤销原因
      onSubmit: values => {
        this.onSubmitRevoke(values)
      }
    }
    // 分派工单
    let assignProps = {
      visible: this.state.visible,
      assignRecord,
      title:this.state.dispatchTitle,
      changeVisible: (visible) => {
        this.changeVisible(visible)
      }
    }
    return (
      <div className="repairOrder" onClick={() => {
        dispatch({
          type: 'repairOrder/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
        <section className="search-area">
          <Toolbar>
            <Search
              placeholder=" 设备仓库 / 所属公司 / 维修单号 / 设备编号 "
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
            <Link to={`${routesPrefix}/repairOrder/subRepairOrderAdd`}>
              <Button
                type="primary2" className="toolbar-item"
                icon="plus" onClick={() => this.clearEditId()} >
                报修
              </Button>
            </Link>
            <SearchLayout {...filterLayoutProps} />
          </Toolbar>
        </section>
        <DataTable {...dataTableProps} />
        {/* 撤销弹窗 */}
        <ModalForm {...modalFormProps}/> 
        {/* 维修分派 */}
        <AssignOrder {...assignProps} />
      </div>
    )
  }
}
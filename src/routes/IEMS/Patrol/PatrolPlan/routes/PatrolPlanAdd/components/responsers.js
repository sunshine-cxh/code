/*
 * @Descripttion : 巡检计划责任人清单
 * @Author       : caojiarong
 * @Date         : 2020-06-08 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 11:34:00
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Editable } from 'components/DataTable'
import {createColumnsApp} from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal,ModalForm } from 'components/Modal'
import ResponseList from "./responseList"
import PageHelper from 'utils/pageHelper'

@connect(({ patrolPlanAdd, loading }) => ({
  patrolPlanAdd,
  loading: loading.models.patrolPlanAdd
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: null,
    visible: false,
    addInfoVisible:false,
    fileLoading: false,
    status: 'add',
    index: 0,

    lowerLimitDisabled: true,
    upperLimitDisabled: true,
    referenceValueDisabled: true,
    correctOptionDisabled: true,
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type:'patrolPlanAdd/getItemTypeList'
    })
  }

  // 删除操作
  deleteFn = (record) => {
    let {
      patrolPlanAdd: { appPageData, selectedResponseRow, selectedResponseRowKeys },
      dispatch,
    } = this.props
    // 删除Keys 列表中的key
    let index = selectedResponseRowKeys.indexOf(record.id)
    if (index >= 0) {
      selectedResponseRowKeys.splice(index, 1)
    }
    // 删除row
    selectedResponseRow = selectedResponseRow.filter((item) => {
      return item.id !== record.id
    })
    dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        selectedResponseRowKeys,
        selectedResponseRow,
      },
    })
    // 删除列表
    appPageData.list.splice(record.index, 1)
    appPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        appPageData
      }
    })
  }
  
  // 删除确认提示
  handleDelete = (record,type) =>{
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        if (type == 'detail') {
          this.deleteFn(record)
        }else{
          this.handleFileDelete(record)
        }
      },
      onCancel() {},
    })
  }
  
  // 编辑详情明细
  handleEdit = (record) =>{
    // todo 编辑当前详情内容
    this.setState({
      addInfoVisible: true,
      record,
      status: 'edit',
      index: record.index
    })
  }
  
  componentWillUnmount () {
    let { patrolPlanAdd: { appPageData }, dispatch } = this.props
    appPageData.list = []
    dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        appPageData,
      }
    })
  }

  onChangeVisible = (visible)=> {
    this.setState({
      visible
    })
  }

  // 手动添加
  handleSelectBtn = (e) => {
    let { dispatch } = this.props
    dispatch({
      type: 'patrolPlanAdd/getResponseInfo',
      payload: {
        responserList: PageHelper.create(),
      },
    })
    this.onChangeVisible(true)
  }

  render() {
    let { dispatch, patrolPlanAdd, loading } = this.props
    let { visible } = this.state
    let { appPageData } = patrolPlanAdd
    let columnsApp = createColumnsApp(this)
    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'patrolPlanAdd/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      }
    }
   
    const selectListProps = {
      visible,
      onChangeVisible: this.onChangeVisible
    }

    return (
      <section className="block-wrap">
        {/* 责任人 */}
        <div className="header">
          <span className='title'>责任人</span>
          <span>
            <Tooltip title="新增">
              <Icon
                ilng
                type="select"
                onClick={this.handleSelectBtn}
                className="icon-item"
              />
            </Tooltip>
          </span>
        </div>
        <Editable {...applyDataTableProps} />
        <ResponseList {...selectListProps} />
      </section>
    )
  }
}

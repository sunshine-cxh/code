/*
 * @Descripttion : 新增出库管理数据出库清单
 * @Author       : caojiarong
 * @Date         : 2020-05-17 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 08:47:37
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Editable } from 'components/DataTable'
import {createColumnsApp} from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal,ModalForm } from 'components/Modal'
import SelectList from "./selectList";
import UploadFile from "./UploadFile"
@connect(({ pickingApplyAdd, loading }) => ({
  pickingApplyAdd,
  loading: loading.models.pickingApplyAdd
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
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'pickingApplyAdd/getBrand',
      payload: {
        success: ()=> {
        }
      }
    })
    dispatch({
      type: 'pickingApplyAdd/getUnit',
      payload: {
        success: ()=> {
        }
      }
    })

    dispatch({
      type: 'pickingApplyAdd/getTree',
      payload:{}
    })
  }

  // 删除操作
  deleteFn = (record) => {
    let {
      pickingApplyAdd: { appPageData, selectedRow, selectedRowKeys, addRow },
      dispatch,
    } = this.props
    if (!record.consume) {
      // 删除Keys 列表中的key
      let index = selectedRowKeys.indexOf(record.id)
      if (index >= 0) {
        selectedRowKeys.splice(index, 1)
      }
      dispatch({
        type: 'pickingApplyAdd/@change',
        payload: {
          selectedRowKeys,
        },
      })
      // 删除row
      selectedRow = selectedRow.filter((item) => {
        return item.id !== record.id
      })
      dispatch({
        type: 'pickingApplyAdd/@change',
        payload: {
          selectedRow,
        },
      })
    } else {
      // 删除自定义行
      let index
      for(let i = 0; i< addRow.length; i++) {
        if(addRow[i].id === record.id) {
          index = i
        }
      }
      if (index >= 0) {
        addRow.splice(index, 1)
      }
      dispatch({
        type: 'pickingApplyAdd/@change',
        payload: {
          addRow,
        },
      })
    }
    // 删除列表
    appPageData.list.splice(record.index, 1)
    appPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'pickingApplyAdd/@change',
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
    let { pickingApplyAdd: { appPageData }, dispatch } = this.props
    appPageData.list = []
    dispatch({
      type: 'pickingApplyAdd/@change',
      payload: {
        appPageData,
      }
    })
  }

  // 手动添加
  handleSelectBtn = (e) => {
    let { dispatch,pickingApplyAdd: { selectDataList } } = this.props
    dispatch({
      type: 'pickingApplyAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
      },
    })
    this.setState({
      visible: true,
    })
  }

  // 搜索产品关键字
  searchHandler = (keyword) =>{
    let {
      dispatch,
      pickingApplyAdd: { selectDataList },
    } = this.props
    dispatch({
      type: 'pickingApplyAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
        values: {
          keyword,
        },
      },
    })
  }

  onChangeVisible = (visible)=> {
    this.setState({
      visible
    })
  }

  render() {
    let { dispatch, pickingApplyAdd, loading } = this.props
    let { visible,addInfoVisible,record,index } = this.state
    let { appPageData } = pickingApplyAdd
    let columnsApp = createColumnsApp(this, this.state, this.props)

    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'pickingApplyAdd/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      }
    }
   
    // 单条详情配置
    let modalFormProps = {
      record,
      visible: addInfoVisible,
      columns: columnsApp,
      modalOpts: {
        width: 740
      },
      footer: [],
      onCancel: () => {
        this.setState({
          record: null,
          addInfoVisible: false
        })
      },

      onSubmit: values => {
        // if(values.totalAmount && values.price) {
        //   values.totalPrice = (item.totalAmount * item.price).toFixed(2)
        // }
        Object.assign(appPageData.list[index], {...values}) 
        appPageData.list
        dispatch({
          type: 'pickingApplyAdd/@change',
          payload: {
            appPageData,
          }
        })
        this.setState({
          ...this.state,
          addInfoVisible: false
        })
      }
    }

    const selectListProps = {
      visible,
      onChangeVisible: this.onChangeVisible
    }

    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">领料信息</span>
          <span>
            <Tooltip title="手动选择">
              <Icon
                ilng
                type="select"
                onClick={this.handleSelectBtn}
                className="icon-item"
              ></Icon>
            </Tooltip>
          </span>
        </div>
        <Editable {...applyDataTableProps}></Editable>
        <SelectList  {...selectListProps} />
        {/* 单条详情弹窗 */}
        <ModalForm {...modalFormProps}></ModalForm>
      </section>
    )
  }
}

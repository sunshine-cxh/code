/*
 * @Descripttion : 新增入库管理数据入库清单
 * @Author       : caojiarong
 * @Date         : 2020-05-08 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-06 15:14:53
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createColumnsApp } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal } from 'components/Modal'
import { ModalForm } from 'components/Modal'
import SelectList from "./selectList";

@connect(({ inWarehouseAdd, loading }) => ({
  inWarehouseAdd,
  loading: loading.models.inWarehouseAdd
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
    status:'add',
    index: 0,
    productVisible:false,
    keyword:''
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'inWarehouseAdd/getBrand',
      payload: {
        success: ()=> {
        }
      }
    })
    dispatch({
      type: 'inWarehouseAdd/getUnit',
      payload: {
        success: ()=> {
        }
      }
    })
  }
  
  // 删除详情明细
  deleteFn = (record) => {
    let {
      inWarehouseAdd: { appPageData, selectedRow, selectedRowKeys, addRow },
      dispatch,
    } = this.props
    if (!record.consume) {
      // 删除Keys 列表中的key
      let index = selectedRowKeys.indexOf(record.id)
      if (index >= 0) {
        selectedRowKeys.splice(index, 1)
      }
      dispatch({
        type: 'inWarehouseAdd/@change',
        payload: {
          selectedRowKeys,
        },
      })
      // 删除row
      selectedRow = selectedRow.filter((item) => {
        return item.id !== record.id
      })
      dispatch({
        type: 'inWarehouseAdd/@change',
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
        type: 'inWarehouseAdd/@change',
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
      type: 'inWarehouseAdd/@change',
      payload: {
        appPageData,
      },
    })
  }

  // 删除确认提示
  handleDelete = (record) =>{
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
       this.deleteFn(record)
      },
      onCancel() {},
    })
  }
  
  // 编辑详情明细
  handleEdit = (record) =>{
    // todo 编辑当前详情内容
    this.setState({
      // ...this.state,
      addInfoVisible: true,
      record,
      status: 'edit',
      index: record.index
    })
  }
  
  componentWillUnmount () {
    let { inWarehouseAdd: { appPageData }, dispatch } = this.props
    appPageData.list = []
    dispatch({
      type: 'inWarehouseAdd/@change',
      payload: {
        appPageData,
      }
    })
  }

  // 手动添加
  handleSelectBtn = (e) => {
    let {
      dispatch,
      inWarehouseAdd: { selectDataList},
    } = this.props
    dispatch({
      type: 'inWarehouseAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
      },
    })
    this.setState({
      productVisible: true,
    })

  }

  // 搜索产品关键字
  searchHandler = (keyword) =>{
    let {
      dispatch,
      inWarehouseAdd: { selectDataList },
    } = this.props
    dispatch({
      type: 'inWarehouseAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
        values: {
          keyword,
        },
      },
    })
  }

  onChangeVisible = (productVisible)=> {
    this.setState({
      productVisible
    })
  }
  
  render() {
    let { dispatch, inWarehouseAdd, loading } = this.props
    let { addInfoVisible, record,productVisible, index, keyword } = this.state
    let { appPageData} = inWarehouseAdd
    let columnsApp = createColumnsApp(this, this.state, this.props) 
    

    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'inWarehouseAdd/getPageInfo',
          payload: {
            keyword,
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      }
    }
  
    let modalFormProps = {
      record,
      visible:addInfoVisible,
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
        if(values.amount!='' && values.amount!=null && values.price!='' && values.price!=null){
          values.totalPrice =(values.amount * values.price).toFixed(2)
        }
        Object.assign(appPageData.list[index], {...values})
        
        dispatch({
          type: 'inWarehouseAdd/@change',
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
      productVisible,
      onChangeVisible: this.onChangeVisible
    }
    
    return (
      <section className="block-wrap">
        {/* 入库明细单 */}
        <div className="header">
          <span className='title'>入库明细单</span>
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
        <DataTable {...applyDataTableProps}></DataTable>
        <ModalForm {...modalFormProps}></ModalForm>    
        {/* 产品选择弹窗 */}
        <SelectList  {...selectListProps} />    
      </section>
    )
  }
}

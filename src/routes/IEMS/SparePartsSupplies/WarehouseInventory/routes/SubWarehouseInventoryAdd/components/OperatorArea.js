/*
 * @Descripttion : 新增仓库盘点数据盘点清单
 * @Author       : caojiarong
 * @Date         : 2020-05-26 09:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-24 16:15:02
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
import { notice } from 'components/Notification'
@connect(({ warehouseInventoryAdd, loading }) => ({
  warehouseInventoryAdd,
  loading: loading.models.warehouseInventoryAdd
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
    productVisible:false
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'warehouseInventoryAdd/getBrand',
      payload: {
        success: ()=> {
        }
      }
    })
    dispatch({
      type: 'warehouseInventoryAdd/getUnit',
      payload: {
        success: ()=> {
        }
      }
    })
  }
  
  // 删除详情明细
  deleteFn = (record) => {
    let {
      warehouseInventoryAdd: { appPageData, selectedRow, selectedRowKeys, addRow },
      dispatch,
    } = this.props
    if (!record.consume) {
      // 删除Keys 列表中的key
      let index = selectedRowKeys.indexOf(record.id)
      if (index >= 0) {
        selectedRowKeys.splice(index, 1)
      }
      dispatch({
        type: 'warehouseInventoryAdd/@change',
        payload: {
          selectedRowKeys,
        },
      })
      // 删除row
      selectedRow = selectedRow.filter((item) => {
        return item.id !== record.id
      })
      dispatch({
        type: 'warehouseInventoryAdd/@change',
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
        type: 'warehouseInventoryAdd/@change',
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
      type: 'warehouseInventoryAdd/@change',
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
    let { warehouseInventoryAdd: { appPageData }, dispatch } = this.props
    appPageData.list = []
    dispatch({
      type: 'warehouseInventoryAdd/@change',
      payload: {
        appPageData,
      }
    })
  }

  // 手动添加
  handleSelectBtn = (e) => {
    let {
      dispatch,
      warehouseInventoryAdd: { selectDataList, basicInfos},
    } = this.props
    if(basicInfos.warehouseId){
      dispatch({
        type: 'warehouseInventoryAdd/getPageInfo',
        payload: {
          selectDataList: selectDataList.startPage(),
        },
      })
      this.setState({
        productVisible: true,
      })
    }else{
      notice.error("请先选择盘点仓库！")
    }
  }

  // 搜索产品关键字
  searchHandler = (keyword) =>{
    let {
      dispatch,
      warehouseInventoryAdd: { selectDataList },
    } = this.props
    dispatch({
      type: 'warehouseInventoryAdd/getPageInfo',
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
    let { dispatch, warehouseInventoryAdd, loading } = this.props
    let { addInfoVisible, record,productVisible, index } = this.state
    let { appPageData} = warehouseInventoryAdd
    let columnsApp = createColumnsApp(this, this.state, this.props) 
    

    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'warehouseInventoryAdd/getPageInfo',
          payload: {
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
        if(values.inventoryAmount){
          values.inventoryDiff = Math.abs(values.totalAmount - values.inventoryAmount)
        }
        
        Object.assign(appPageData.list[index], {...values})
        
        dispatch({
          type: 'warehouseInventoryAdd/@change',
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
        <div className="header">
          <span className="title">盘点信息</span>
            <span>
              <Tooltip title="手动选择">
                <Icon
                  ilng
                  type="select"
                  onClick={this.handleSelectBtn}
                  className="icon-item"
                />
              </Tooltip>
            </span>
          </div>
        <DataTable {...applyDataTableProps}></DataTable>
        <ModalForm {...modalFormProps} ></ModalForm>    
        {/* 产品选择弹窗 */}
        <SelectList  {...selectListProps} />    
      </section>
    )
  }
}

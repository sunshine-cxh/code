/*
 * @Descripttion : 新增出库管理数据出库清单
 * @Author       : caojiarong
 * @Date         : 2020-05-17 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-06 15:13:21
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Editable } from 'components/DataTable'
import {createColumnsApp, createColumnsFile} from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal,ModalForm } from 'components/Modal'
import SelectList from "./selectList";
import { notice } from 'components/Notification'
@connect(({ outWarehouseAdd, loading }) => ({
  outWarehouseAdd,
  loading: loading.models.outWarehouseAdd
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
    productVisible:false,
    index:0,
    keyword:''
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'outWarehouseAdd/getBrand',
      payload: {
        success: ()=> {
        }
      }
    })
    dispatch({
      type: 'outWarehouseAdd/getUnit',
      payload: {
        success: ()=> {
        }
      }
    })
  }
  
  handleAdd = () => {
    this.setState({
      addInfoVisible: true,
      status: 'add'
    })

  };
  
  // 删除操作
  deleteFn = (record) => {
    let {
      outWarehouseAdd: { appPageData, selectedRow, selectedRowKeys, addRow },
      dispatch,
    } = this.props
    if (!record.consume) {
      // 删除Keys 列表中的key
      let index = selectedRowKeys.indexOf(record.id)
      if (index >= 0) {
        selectedRowKeys.splice(index, 1)
      }
      dispatch({
        type: 'outWarehouseAdd/@change',
        payload: {
          selectedRowKeys,
        },
      })
      // 删除row
      selectedRow = selectedRow.filter((item) => {
        return item.id !== record.id
      })
      dispatch({
        type: 'outWarehouseAdd/@change',
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
        type: 'outWarehouseAdd/@change',
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
      type: 'outWarehouseAdd/@change',
      payload: {
        appPageData,
      },
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

  onChangeVisible = (productVisible)=> {
    this.setState({
      productVisible
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
    let { outWarehouseAdd: { appPageData }, dispatch } = this.props
    appPageData.list = []
    dispatch({
      type: 'outWarehouseAdd/@change',
      payload: {
        appPageData,
      }
    })
  }

  // 手动添加
  handleSelectBtn = (e) => {
    let {
      dispatch,
      outWarehouseAdd: { selectDataList,basicInfos },
    } = this.props
    if(basicInfos.warehouseId){
      dispatch({
        type: 'outWarehouseAdd/getPageInfo',
        payload: {
          selectDataList: selectDataList.startPage(),
          values:{
            entity:{
              warehouseId:basicInfos.warehouseId
            }
          }
        },
      })
      this.setState({
        productVisible: true,
      })
    }else{
      notice.error("请先选择出库仓库")
    }
    

  }

  // 搜索产品关键字
  searchHandler = (keyword) =>{
    let {
      dispatch,
      outWarehouseAdd: { selectDataList, basicInfos },
    } = this.props
    dispatch({
      type: 'outWarehouseAdd/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
        values: {
          keyword,
          entity:{
            warehouseId:basicInfos.warehouseId
          }
        },
      },
    })
  }

  handleDownload=(record)=>{
    window.open(record.filePath)
  }

  render() {
    let { dispatch, outWarehouseAdd, loading } = this.props
    let { addInfoVisible,record, productVisible,index, keyword } = this.state
    let { appPageData, basicInfos } = outWarehouseAdd
    let columnsApp = createColumnsApp(this, this.state, this.props)

    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'outWarehouseAdd/getPageInfo',
          payload: {
            values:{
              keyword,
              entity:{
                warehouseId:basicInfos.warehouseId
              }
            },
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
        if(values.totalAmount < values.amount){
          notice.error('出库数量不得大于库存数量')
          return
        }else if(values.amount<=0){
          notice.error('出库数量填写错误')
          return
        }
        if(values.amount && values.price) {
          values.totalPrice = (values.amount * values.price).toFixed(2)
        }
        Object.assign(appPageData.list[index], {...values})
        dispatch({
          type: 'outWarehouseAdd/@change',
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
          <span className='title'>出库明细单</span>
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
        {/* 单条详情弹窗 */}
        <ModalForm {...modalFormProps}></ModalForm> 
        {/* 产品选择弹窗 */}
        <SelectList  {...selectListProps} />
      </section>
    )
  }
}

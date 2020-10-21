/*
 * @Author       : xuqiufeng
 * @Date         : 2020-05-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:57:39
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import Upload from 'components/Upload'
import moment from 'utils/moment'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import fileHandler, { getFileType } from 'utils/fileHandler'
// import { filetypes } from '../../../../../config'
import { notice } from 'components/Notification'

import { ModalForm } from 'components/Modal'


@connect(({ MessageEdit, loading }) => ({
  MessageEdit,
  loading: loading.models.MessageEdit
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: {},
    visible: true,
    fileLoading: false,
    status: 'add',
    index: 0
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'MessageEdit/getBrand',
      payload: {
        success: ()=> {
        }
      }
    })
    dispatch({
      type: 'MessageEdit/getUnit',
      payload: {
        success: ()=> {
        }
      }
    })
    dispatch({
      type: 'MessageEdit/getSupply',
      payload: {
        success: ()=> {
        }
      }
    })
  }
  handleAdd = () => {
    let { MessageEdit: { appPageData }, dispatch } = this.props
    this.setState({
      ...this.state,
      visible: true,
      status: 'add'
    })
    // let addItem = {
    //   id: Math.random(),
    //   index: appPageData.list.length,
    //   remark: '',
    //   sortId: 0
    // }
    // appPageData.list.push(addItem)
    // dispatch({
    //   type: 'ContentEdit/@change',
    //   payload: {
    //     appPageData,
    //   }
    // })
  };
  handleEdit = (record)=> {
    let { MessageEdit: { appPageData }, dispatch } = this.props
    this.setState({
      ...this.state,
      visible: true,
      record,
      status: 'edit',
      index: record.index
    })
  }
  handleDownload = (record)=> {
    fileHandler(record)
  }
  handleDelete = (record) => {
    let { MessageEdit: { appPageData }, dispatch } = this.props
    appPageData.list.splice(record.index, 1)
    appPageData.list.map((item, index)=> {
      item.index = index
    })
    dispatch({
      type: 'MessageEdit/@change',
      payload: {
        appPageData,
      }
    })
  }
  handleUpload = (e) => {
    // if(!filetypes.includes(getFileType(e.file.name))){
    //   notice.error('文件格式不支持上传')
    //   return
    // }
    this.setState({
      ...this.state,
      fileLoading: true
    })
    if(e.event && e.event.percent==100) {
      this.setState({
        ...this.state,
        fileLoading: false
      })
    }
    if(e.file.response) {
      let { MessageEdit: { filePageData }, dispatch } = this.props
      filePageData.list = []
      for(let index in e.fileList) {
        let item = e.fileList[index]
        filePageData.list.push({
          fileId: e.file.response.data[0].id,
          id: Math.random(),
          index: index,
          size: item.size,
          type: item.type,
          name: item.name,
          uploadTime: moment().format('MM/DD/YYYY')
        })
      }
      dispatch({
        type: 'MessageEdit/@change',
        payload: {
          filePageData,
        }
      })
      this.setState({
        ...this.state,
        fileLoading: false
      })
    }
    
  }
  createUploadParams = () => {
    return {
      objectId: '',
      type: ''
    }
  }
  handleFileDelete = (record)=> {
    let { MessageEdit: { filePageData }, dispatch } = this.props
    filePageData.list.splice(record.index, 1)
    filePageData.list.map((item, index)=> {
      item.index = index
    })
    dispatch({
      type: 'MessageEdit/@change',
      payload: {
        filePageData,
      }
    })
    dispatch({
      type: 'MessageEdit/deleteFile',
      payload: {
        record
      }
    })
  }
  componentWillUnmount () {
    let { MessageEdit: { appPageData }, dispatch } = this.props
    appPageData.list = []
    dispatch({
      type: 'MessageEdit/@change',
      payload: {
        appPageData,
      }
    })
  }
  render() {
    let { dispatch, MessageEdit, loading } = this.props
    let { fileLoading, visible, record, status, index } = this.state
    let { appPageData, filePageData } = MessageEdit
    let columnsApp = createColumnsApp(this, this.state, this.props) 
    let columnsFile = createColumnsFile(this, this.state)
    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id', 
      dataItems: appPageData,
      onChange(pageNum, pageSize) {
        dispatch({
          type: 'MessageEdit/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        })
      }
    }
    const fileDataTableProps = {
      loading: fileLoading,
      showNum: true,
      columns: columnsFile,
      rowKey: 'id',
      dataItems: filePageData,
      showNum: false
    }
    let modalFormProps = {
      record,
      visible,
      columns: columnsApp,
      modalOpts: {
        width: 740
      },
      footer: [],
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        })
      },

      onSubmit: values => {
        let addItem
        if(status === 'add') {
          addItem = {
            id: Math.random(),
            index: appPageData.list.length,
            ...values
          }
          appPageData.list.push(addItem)
          
        } else {
          addItem = {
            id: Math.random(),
            index,
            ...values
          }
          appPageData.list.splice(index, 1, addItem)
        }
        
        dispatch({
          type: 'MessageEdit/@change',
          payload: {
            appPageData,
          }
        })
        this.setState({
          ...this.state,
          visible: true
        })
        // dispatch({
        //   type: 'apiResource/submit',
        //   payload: {
        //     values,
        //     success: () => {
        //       this.setState({
        //         record: null,
        //         visible: false
        //       })
        //     }
        //   }
        // })
      },
      onContinue: status === 'add' ? (values)=> {
        let addItem = {
          id: Math.random(),
          index: appPageData.list.length,
          ...values
        }
        appPageData.list.push(addItem)
        dispatch({
          type: 'MessageEdit/@change',
          payload: {
            appPageData,
          }
        })
      } : null
    }
    return (
      <section className="operation-area__wrapper">
        {/* 详细内容 */}
        <div className="apply-info">
          <div className="title">
            <span>详细内容：</span>
            <span>
              <Tooltip title="新增">
                <Icon 
                ilng
                type="plus" 
                onClick={this.handleAdd} 
                className="icon-item"></Icon>
              </Tooltip>
              
            </span>
          </div>
          <DataTable {...applyDataTableProps}></DataTable>
        </div>
        <div className="link-file">
          <div className="title">
            <span>相关附件</span>
            <Upload 
            con="plus" 
            showUploadList={false} 
            onChange={(e)=> {this.handleUpload(e)}} 
            action="/ifss/file/upload">
              <Tooltip title="新增">
                <Icon 
                ilng
                type="plus" 
                className="icon-item"></Icon>
              </Tooltip>
            </Upload>
          </div>
          <DataTable {...fileDataTableProps}></DataTable>
        </div>
        <ModalForm {...modalFormProps}></ModalForm>
      </section>
    )
  }
}

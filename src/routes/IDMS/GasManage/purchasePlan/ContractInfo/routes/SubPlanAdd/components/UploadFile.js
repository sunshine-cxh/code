/*
 * @Descripttion : 文件上传模块
 * @Author       : caojiarong
 * @Date         : 2020-09-07 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 19:28:46
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {fileInfoColumns} from './columns'
import fileHandler, { getFileType } from 'utils/fileHandler'
import { filetypes2 } from '../../../../../../config'
import $$ from 'cmn-utils'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal } from 'components/Modal'
import Upload from 'components/Upload'
import {notice} from 'components/Notification'
import { apiPrefix } from '../../../../../../config'
import {configApiPrefix} from '../../../../../../../../config'

@connect(({ subPlanAdd, loading }) => ({
  subPlanAdd,
  loading: loading.models.subPlanAdd
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    fileLoading: false
  }

  handleDownload = (record)=> {
    fileHandler(record)
  }
  

  handleChildDelete=(record)=>{
    Modal.confirm({
      title:'注意',
      content:'是否要删除该附件',
      onOk:()=>{
        this.deleteFn(record)
      }
    })
  }

  deleteFn = (record)=> {
    let { subPlanAdd: { filePageData }, dispatch } = this.props
    filePageData.list.splice(record.index, 1)
    filePageData.list.map((item, index)=> {
      item.index = index
    })
    dispatch({
      type: 'subPlanAdd/@change',
      payload: {
        filePageData,
      }
    })
    dispatch({
      type: 'subPlanAdd/deleteFile',
      payload: {
        record
      }
    })
  }
  //上传操作 
  handleBefore=(e)=>{
    if(!filetypes2.includes(getFileType(e.name))){
      notice.error('文件格式不支持上传')
      return
    }
    this.sliceUpload(e)
  }

  // 上传文件 
  handleChange = (e) => {
    if(!filetypes2.includes(getFileType(e.file.name))){
      notice.error('文件格式不支持上传')
      return
    }
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
    console.log(e.file)
    if(e.file.response) {
      let { subPlanAdd: { filePageData }, dispatch } = this.props
      let item = e.file
      filePageData.list.push({
        objectId: item.response.data[0].id,
        id: item.response.data[0].id,
        index: filePageData.list.lenght,
        fileSize: item.size,
        fileName: item.response.data[0].fileName,
        createdOn: item.response.data[0].createdOn,
        filePath: item.response.data[0].filePath
      })
      dispatch({
        type: 'subPlanAdd/@change',
        payload: {
          filePageData,
        }
      })
      this.setState({
        fileLoading: false
      })
    }
    
  }
  
  handleFileDelete = (record)=> {
    let { subPlanAdd: { filePageData }, dispatch } = this.props
    filePageData.list.splice(record.index, 1)
    filePageData.list.map((item, index)=> {
      item.index = index
    })
    dispatch({
      type: 'subPlanAdd/@change',
      payload: {
        filePageData,
      }
    })
    dispatch({
      type: 'subPlanAdd/deleteFile',
      payload: {
        record
      }
    })
  }

  

  render() {
    let { subPlanAdd } = this.props
    let { fileLoading } = this.state
    let { filePageData } = subPlanAdd
    let columnsFile = fileInfoColumns(this, this.state)

    const fileDataTableProps = {
      loading: fileLoading,
      showNum: true,
      columns: columnsFile,
      rowKey: 'id',
      dataItems: filePageData,
      showNum: false
    }

    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">相关附件</span>
          {
            filePageData.list.length == 0 &&
            <span>
              <Upload
              con="plus"
              showUploadList={false}
              onChange={(e)=> {this.handleChange(e)}}
              action={`/ifss/file/upload?type=140&objectId=${this.props.id}`}
              >
                <Tooltip title="新增">
                  <Icon
                  ilng
                  type="plus" 
                  className="icon-item"></Icon>
                </Tooltip>
              </Upload>
            </span>
          }
        </div>
        <DataTable {...fileDataTableProps}></DataTable>
      </section>
    )
  }
}

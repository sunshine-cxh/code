/*
 * @Descripttion : 文件上传模块
 * @Author       : caojiarong
 * @Date         : 2020-08-25 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-04 09:39:56
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import {fileInfoColumns} from './columns'
import fileHandler, { getFileType } from 'utils/fileHandler'
import { filetypes } from '../../../../../config'
import $$ from 'cmn-utils'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal } from 'components/Modal'
import Upload from 'components/Upload'
import {notice} from 'components/Notification'
import { apiPrefix } from '../../../../../config'
import {configApiPrefix} from '../../../../../../../../src/config'

@connect(({ subModelAdd, loading }) => ({
  subModelAdd,
  loading: loading.models.subModelAdd
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    fileLoading: false,
    uploadShow: true
  }

  // 分片上传test
  sliceUpload=(fileObj)=>{
    let upload = (file, skip)=>{
      let formData = new FormData() 
      let blockSize = 1024*1024*2  //每一份的大小
      let shardCount = Math.ceil(file.size / blockSize) //总片数
      let nextSize = Math.min((skip+1 ) * blockSize, file.size) //读取到结束为止
      let fileData = file.slice(skip * blockSize, nextSize) //截取 部分文件快
      formData.append('data', fileData)  //将部分文件 放进formData对象
      formData.append('fileName', file.name) //保存文件名称
      formData.append('index', skip+1) //保存文件名称
      formData.append('total', shardCount) //保存文件名称
      formData.append('type', 10) //保存文件名称
      // 传输文件
      $$.post( configApiPrefix() +'/ifss/file/bigupload',formData,{
        processData: false,
        headers:{'content-type':'multipart/form-data'}
      })
      .then(res=>{
        console.log(res)
          console.log("已经上传了" + (skip) + "块文件")
          if(file.size <= nextSize){
            alert('上传完成')
            this.handleUploadChange(res)
            return 
          }
          upload(file, ++skip)
        
      })
    }

    upload(fileObj, 0)
  }

  handleDownload = (record)=> {
    fileHandler(record)
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


  //上传操作 
  handleBefore=(e)=>{
    if(!filetypes.includes(getFileType(e.name))){
      notice.error('文件格式不支持上传')
      return
    }
    this.sliceUpload(e)
  }

  // 上传文件   
  handleUploadChange = (e) => {
    if(!filetypes.includes(getFileType(e.fileName))){
      notice.error('文件格式不支持上传')
      return
    }
    this.setState({
      fileLoading: true
    })
    // if(e.event && e.event.percent==100) {
    //   this.setState({
    //     fileLoading: false
    //   })
    // }
    if(e) {
      let { subModelAdd: { filePageData }, dispatch } = this.props
      let item = e.file
      filePageData.list.push({
        objectId: e.id,
        id: e.id,
        // index: e.lenght,
        fileSize: e.fileSize,
        fileName: e.fileName,
        createdOn: e.createdOn,
        filePath: e.filePath
      })
      dispatch({
        type: 'subModelAdd/@change',
        payload: {
          filePageData,
        }
      })
      this.setState({
        fileLoading: false,
        uploadShow:false
      })
    }
    
  }
  
  handleFileDelete = (record)=> {
    let { subModelAdd: { filePageData }, dispatch } = this.props
    filePageData.list.splice(record.index, 1)
    filePageData.list.map((item, index)=> {
      item.index = index
    })
    dispatch({
      type: 'subModelAdd/@change',
      payload: {
        filePageData,
      }
    })
    dispatch({
      type: 'subModelAdd/deleteFile',
      payload: {
        record
      }
    })
  }

  

  render() {
    let { subModelAdd } = this.props
    let { fileLoading } = this.state
    let { filePageData,details } = subModelAdd
    if(filePageData.list.length==0 && details.attachment){
      filePageData.list.push(details.attachment)
    }
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
            (filePageData.list.length == 0 || details.attachment == null) &&
            <span>
              <Upload
              con="plus"
              showUploadList={false}
              // onChange={(e)=> {this.handleChange(e)}}
              beforeUpload={(file,fileList)=>{this.handleBefore(file)}}
              action=""
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
          {/* <input type="file" id="file6" multiple></input>
          <button className="btnFile6" onClick={()=>this.sliceUpload()}>分片上传6</button> */}
        </div>
        <DataTable {...fileDataTableProps}></DataTable>
      </section>
    )
  }
}

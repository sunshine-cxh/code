/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-14 14:24:23
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:56:34
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import Upload from 'components/Upload'
import Icon from 'components/Icon'
import { downloadImage, getFileType } from 'utils/fileHandler'
import { Modal } from 'components/Modal'
import isEqual from 'react-fast-compare'
import { notice } from 'components/Notification'

let getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
@connect(({ basicDataAdd, loading, basicData }) => ({
  basicDataAdd,
  loading: loading.models.basicDataAdd,
  basicData,
}))
export default class extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  }
  componentDidMount() {
    let {
      basicDataAdd: { details },
      dispatch
    } = this.props
    let fileList = details.imageList ? details.imageList : []

    let list = []
    for (let i = 0; i < fileList.length; i++) {
      list.push({
        url: fileList[i].filePath,
        uid: Math.random(),
        name: fileList[i].fileName,

        id: fileList[i].id,
      })
    }
    dispatch({
      type: 'basicDataAdd/@change',
      payload: {
        imageList: details.imageList ? details.imageList : [],
      },
    })
    this.setState({
      ...this.state,
      fileList: list,
    })
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.basicDataAdd.details, prevProps.basicDataAdd.details)) {
      let {
        basicDataAdd: { details },
        dispatch
      } = this.props
      let fileList = details.imageList ? details.imageList : []

      let list = []
      for (let i = 0; i < fileList.length; i++) {
        list.push({
          url: fileList[i].filePath,
          uid: Math.random(),
          name: fileList[i].fileName,

          id: fileList[i].id,
        })
      }
      dispatch({
        type: 'basicDataAdd/@change',
        payload: {
          imageList: details.imageList ? details.imageList : [],
        },
      })
      this.setState({
        ...this.state,
        fileList: list,
      })
    }
  }
  handleUpload = (e) => {
    const imagetypes = ['.png', '.jpg', '.jpeg', '.bmp', '.gif', '.ico']
    if (!imagetypes.includes(getFileType(e.file.name))) {
      notice.error('文件格式不支持上传')
      return
    }
    let {
      dispatch,
      basicDataAdd: { imageList },
    } = this.props

    let fileList = e.fileList
    if (e.file.response) {
      let { code, message } = e.file.response
      if (code === 0) {
        imageList.push(e.file.response.data[0])
      }
    }
    dispatch({
      type: 'basicDataAdd/@change',
      payload: {
        imageList,
      },
    })
    this.setState({
      ...this.state,
      fileList,
    })
  }
  handleRemove = (file) => {
    let { dispatch, basicDataAdd: { imageList } } = this.props
    let arr = imageList.filter(item => {
      return item.id !== file.id
    })
    dispatch({
      type: 'basicDataAdd/deleteImage',
      payload: {
        id: file.id || file.response.data[0].id,
        success: ()=> {
          dispatch({
            type: 'basicDataAdd/@change',
            payload: {
              imageList: arr,
            },
          })
        }
      },
    })
  }
  handleDownload = (e) => {
    downloadImage({ fileId: e.response.data[0].id })
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }
  render() {
    const { previewVisible, previewImage, previewTitle, fileList } = this.state

    const {
      basicDataAdd: { imageList },
    } = this.props
    const uploadButton = (
      <div>
        <Icon ilng type="plus" onClick={this.handleAdd} className="icon-item"></Icon>
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">耗材图片</span>
        </div>
        <Upload
          action="/ifss/image/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleUpload}
          onRemove={this.handleRemove}
          onDownload={this.handleDownload}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </section>
    )
  }
}

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-14 14:24:23
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:55:28
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
@connect(({ standingBookDetail, loading }) => ({
  standingBookDetail,
  loading: loading.models.standingBookDetail,
}))
export default class extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  }
  componentDidMount() {
    this.setImageList()
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.standingBookDetail.details.photoList, prevProps.standingBookDetail.details.photoList)) {
      this.setImageList()
    }
  }
  setImageList = () => {
    let {
      standingBookDetail: { details },
      dispatch
    } = this.props
    let fileList = details.photoList ? details.photoList : []

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
      type: 'standingBookDetail/@change',
      payload: {
        imageList: details.photoList,
      },
    })
    this.setState({
      ...this.state,
      fileList: list,
    })
  }
  handleUpload = (e) => {
    const imagetypes = ['.png', '.jpg', '.jpeg', '.bmp', '.gif', '.ico']
    if (!imagetypes.includes(getFileType(e.file.name))) {
      notice.error('文件格式不支持上传')
      return
    }
    let {
      dispatch,
      standingBookDetail: { imageList },
    } = this.props

    if (e.file.response) {
      imageList.push(e.file.response.data[0])
    }
    dispatch({
      type: 'standingBookDetail/@change',
      payload: {
        imageList,
      },
    })
    this.setState({
      ...this.state,
      fileList: e.fileList,
    })
  }
  handleRemove = (file) => {
    let { dispatch, standingBookDetail: { imageList } } = this.props
    let arr = imageList.filter(item => {
      return item.id !== file.id
    })
    dispatch({
      type: 'standingBookDetail/deleteImage',
      payload: {
        id: file.id || file.response.data[0].id,
        success: ()=> {
          dispatch({
            type: 'standingBookDetail/@change',
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
      standingBookDetail: { imageList },
    } = this.props
    return (
      <section className="block-wrap">
        <Upload
          showUploadList={{showRemoveIcon:false}}
          action="/ifss/image/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleUpload}
          onRemove={this.handleRemove}
          onDownload={this.handleDownload}
        >
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        
      </section>
    )
  }
}

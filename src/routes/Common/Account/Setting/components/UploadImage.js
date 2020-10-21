/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-14 14:24:23
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-24 11:51:44
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import Upload from 'components/Upload'
import Icon from 'components/Icon'
import { downloadImage, getFileType } from 'utils/fileHandler'
import { notice } from 'components/Notification'
import { Modal } from 'components/Modal'
import isEqual from 'react-fast-compare'

let getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
let objectId = ''
@connect(({ global, Account, loading }) => ({
  global,
  Account,
  loading: loading.models.Account,
}))
export default class extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  }
  componentDidMount(prevProps) {
    let {
      global: { user },
      Account: { imageList },
    } = this.props
    if (user.profilePhoto) {
        imageList[0].filePath = user.profilePhoto
      let img = [
        {
          uid: 1,
          name: '广告图.png',
          status: 'done',
          url: user.profilePhoto,
        },
      ]
      this.setState({
        fileList: img,
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
      Account: { imageList },
    } = this.props

    if (e.file.response) {
      imageList.length = 0
      imageList.push(e.file.response.data[0])
    }
    dispatch({
      type: 'Account/@change',
      payload: {
        imageList,
      },
    })
    this.setState({
      ...this.state,
      fileList: e.fileList,
    })
  }
  handleRemove = (e) => {
    let {
      dispatch,
      Account: { imageList },
    } = this.props
    dispatch({
      type: 'Account/deleteImage',
      payload: {
        id: imageList[0].fileId,
        success: () => {
          this.setState({
            ...this.state,
            fileList: [],
          })
          imageList.length = 0

          notice.success('删除成功')
        },
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
    const { previewVisible, previewImage, previewTitle, fileList, objectId } = this.state

    const uploadButton = (
      <div>
        <Icon ilng type="plus" onClick={this.handleAdd} className="icon-item"></Icon>
        <div className="ant-upload-text">上传图片</div>
      </div>
    )
    return (
      <section className="operation-area__wrapper">
        <div className="">
          <Upload
            action="/ifss/image/upload"
            data={{ objectId: objectId, type: '50' }}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleUpload}
            onRemove={this.handleRemove}
            onDownload={this.handleDownload}
          >
            {fileList.length < 1 ? uploadButton : null}
          </Upload>
          <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </section>
    )
  }
}

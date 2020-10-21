/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-14 14:24:23
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-23 14:47:51
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import Upload from 'components/Upload'
import Icon from 'components/Icon'
import { downloadImage, getFileType } from 'utils/fileHandler'
import { notice } from 'components/Notification'
import { Modal } from 'components/Modal'
import isEqual from 'react-fast-compare'
import { getUrlParameters } from 'utils/urlHandler'

let getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
let objectId = ''
@connect(({ ContentEdit, loading }) => ({
  ContentEdit,
  loading: loading.models.ContentEdit,
}))
export default class extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
    remove: false,
  }
  componentDidUpdate(prevProps) {
    let {
      ContentEdit: { imageList, basicInfos },
    } = this.props
    let urlParameters = getUrlParameters()
    objectId = urlParameters.id
    if (basicInfos.imageId) {
      if (!isEqual(this.props.ContentEdit.basicInfos, prevProps.ContentEdit.basicInfos)) {
        let img = [
          {
            uid: this.props.ContentEdit.basicInfos.imageId,
            name: '广告图.png',
            status: 'done',
            url: this.props.ContentEdit.basicInfos.imageUrl,
          },
        ]
        if (!this.state.remove) {
          imageList[0].id = this.props.ContentEdit.basicInfos.imageId
          imageList[0].filePath = this.props.ContentEdit.basicInfos.imageUrl
          imageList[0].thumbnailPath = this.props.ContentEdit.basicInfos.imageThumbnailUrl
        }

        console.log('extends -> componentDidUpdate -> imageList', imageList)

        this.setState({
          fileList: img,
        })
      }
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
      ContentEdit: { imageList },
    } = this.props

    if (e.file.response) {
      imageList.length = 0
      imageList.push(e.file.response.data[0])
    }
    dispatch({
      type: 'ContentEdit/@change',
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
      ContentEdit: { imageList },
    } = this.props
    dispatch({
      type: 'ContentEdit/deleteImage',
      payload: {
        id: imageList[0].fileId,
        success: () => {
          notice.success('删除成功')
          this.setState({
            ...this.state,
            fileList: [],
            remove: true,
          })
          imageList.length = 0
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
    const { previewVisible, previewImage, previewTitle, fileList } = this.state

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

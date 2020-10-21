/*
 * @Descripttion : 领料申请页文件上传模块
 * @Author       : caojiarong
 * @Date         : 2020-05-17 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 14:18:49
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import { createColumnsFile } from './columns'
import fileHandler, { getFileType } from 'utils/fileHandler'
import { filetypes } from '../../../../../config'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal } from 'components/Modal'
import Upload from 'components/Upload'
import { notice } from 'components/Notification'
@connect(({ pickingApplyAdd, loading }) => ({
  pickingApplyAdd,
  loading: loading.models.pickingApplyAdd,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    fileLoading: false,
  }

  handleDownload = (record) => {
    fileHandler(record)
  }

  // 删除确认提示
  handleDelete = (record, type) => {
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        if (type == 'detail') {
          this.deleteFn(record)
        } else {
          this.handleFileDelete(record)
        }
      },
      onCancel() {},
    })
  }

  // 上传文件
  handleUpload = (e) => {
    if (!filetypes.includes(getFileType(e.file.name))) {
      notice.error('文件格式不支持上传')
      return
    }
    this.setState({
      ...this.state,
      fileLoading: true,
    })
    if (e.event && e.event.percent == 100) {
      this.setState({
        ...this.state,
        fileLoading: false,
      })
    }
    if (e.file.response) {
      let {
        pickingApplyAdd: { filePageData },
        dispatch,
      } = this.props
      let fileObj = e.file.response.data[0]
      filePageData.list.push({
        objectId: fileObj.id,
        id: fileObj.id,
        attachmentType: fileObj.attachmentType,
        fileName: fileObj.fileName,
        filePath: fileObj.filePath,
        fileSize: fileObj.fileSize,
        ThumbnailPath: fileObj.ThumbnailPath,
        content: fileObj.content,
        createdOn: fileObj.createdOn,
        index: filePageData.list.length,
      })
      dispatch({
        type: 'pickingApplyAdd/@change',
        payload: {
          filePageData,
        },
      })
      this.setState({
        fileLoading: false,
      })
    }
  }

  handleFileDelete = (record) => {
    let {
      pickingApplyAdd: { filePageData },
      dispatch,
    } = this.props
    filePageData.list.splice(record.index, 1)
    filePageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'pickingApplyAdd/@change',
      payload: {
        filePageData,
      },
    })
    dispatch({
      type: 'pickingApplyAdd/deleteFile',
      payload: {
        record,
      },
    })
  }

  render() {
    let { pickingApplyAdd } = this.props
    let { fileLoading } = this.state
    let { filePageData } = pickingApplyAdd
    let columnsFile = createColumnsFile(this, this.state)

    const fileDataTableProps = {
      loading: fileLoading,
      showNum: true,
      columns: columnsFile,
      rowKey: 'id',
      dataItems: filePageData,
      showNum: false,
    }

    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">相关附件</span>
          <span>
            <Upload
              con="plus"
              showUploadList={false}
              onChange={(e) => {
                this.handleUpload(e)
              }}
              action="/ifss/file/upload?type=100"
            >
              <Tooltip title="新增">
                <Icon ilng type="plus" className="icon-item"></Icon>
              </Tooltip>
            </Upload>
          </span>
        </div>
        <DataTable {...fileDataTableProps}></DataTable>
      </section>
    )
  }
}

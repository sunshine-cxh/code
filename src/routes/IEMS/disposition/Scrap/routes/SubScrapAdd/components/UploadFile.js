/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-14 14:06:43
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 14:22:37
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable, { Editable } from 'components/DataTable'
import { createColumnsFile } from './columns'
import Upload from 'components/Upload'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import downloadFile, { getFileType, getAction } from 'utils/fileHandler'
import { Modal } from 'components/Modal'
import { notice } from 'components/Notification'

@connect(({ scrapAdd, loading, standingBook }) => ({
  scrapAdd,
  loading: loading.models.scrapAdd,
  standingBook,
}))
export default class extends Component {
  state = {
    fileLoading: false,
  }
  handleUpload = (e) => {
    this.setState({
      ...this.state,
      fileLoading: true,
    })
    if (e.file.response) {
      let { code, message } = e.file.response
      if (code === 0) {
        let {
          scrapAdd: { filePageData },
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
          type: 'scrapAdd/@change',
          payload: {
            filePageData,
          },
        })
      } else {
        notice.error(message)
      }

      this.setState({
        ...this.state,
        fileLoading: false,
      })
    }
  }
  handleDownload = (record) => {
    downloadFile(record)
  }
  deleteFn = (record) => {
    let {
      scrapAdd: { filePageData },
      dispatch,
    } = this.props
    filePageData.list.splice(record.index, 1)
    filePageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'scrapAdd/@change',
      payload: {
        filePageData,
      },
    })
    dispatch({
      type: 'scrapAdd/deleteFile',
      payload: {
        record,
      },
    })
  }
  handleFileDelete = (record) => {
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        this.deleteFn(record)
      },
      onCancel() {},
    })
  }
  render() {
    let { scrapAdd } = this.props
    let { filePageData } = scrapAdd
    let { fileLoading } = this.state
    let columnsFile = createColumnsFile(this)
    let action = getAction(50)
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
          <Upload
            con="plus"
            showUploadList={false}
            onChange={(e) => {
              this.handleUpload(e)
            }}
            action={action}
          >
            <Tooltip title="新增">
              <Icon ilng type="plus" className="icon-item"></Icon>
            </Tooltip>
          </Upload>
        </div>
        <DataTable {...fileDataTableProps}></DataTable>
      </section>
    )
  }
}

/*
 * @Descripttion : 新增出库管理文件上传模块
 * @Author       : caojiarong
 * @Date         : 2020-05-19 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-12 17:39:27
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import { createColumnsFile } from './columns'
import downloadFile, { getFileType } from 'utils/fileHandler'
import { filetypes } from '../../../../../config'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal } from 'components/Modal'
import Upload from 'components/Upload'
import moment from 'utils/moment'

@connect(({ outWarehouseAdd, loading }) => ({
  outWarehouseAdd,
  loading: loading.models.outWarehouseAdd,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    fileLoading: false,
  }

  handleDownload = (record) => {
    downloadFile(record)
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
      fileLoading: true,
    })
    if (e.event && e.event.percent == 100) {
      this.setState({
        fileLoading: false,
      })
    }
    if (e.file.response) {
      let {
        outWarehouseAdd: { filePageData },
        dispatch,
      } = this.props
      let item = e.file
      filePageData.list.push({
        objectId: item.response.data[0].id,
        id: item.response.data[0].id,
        index: filePageData.list.lenght,
        fileSize: item.size,
        fileName: item.response.data[0].fileName,
        createdOn: item.response.data[0].createdOn,
        filePath: item.response.data[0].filePath,
        type: 20,
      })
      dispatch({
        type: 'outWarehouseAdd/@change',
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
      outWarehouseAdd: { filePageData },
      dispatch,
    } = this.props
    filePageData.list.splice(record.index, 1)
    filePageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'outWarehouseAdd/@change',
      payload: {
        filePageData,
      },
    })
    dispatch({
      type: 'outWarehouseAdd/deleteFile',
      payload: {
        record,
      },
    })
  }

  render() {
    let { outWarehouseAdd } = this.props
    let { fileLoading } = this.state
    let { filePageData } = outWarehouseAdd
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
              action={`/ifss/file/upload?type=120`}
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

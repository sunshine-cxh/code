/*
 * @Descripttion : 表格modal
 * @Author       : wuhaidong
 * @Date         : 2020-01-08 12:07:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-28 11:08:41
 */
import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import cx from 'classnames'
import DataTable from '../DataTable'
import isEqual from 'react-fast-compare'
import SearchBar from '../SearchBar'
import './style/index.less'

class ModalTable extends Component {
  constructor(props) {
    super(props)
    const { value, dataItems, visible, loading } = props
    this.state = {
      value,
      dataItems,
      visible,
      loading,
      selectedRows: [],
    }
  }

  componentWillMount() {
    const { dataItems, visible } = this.props

    if (visible) {
      this.onChange({
        pageNum: 1,
        pageSize: dataItems.pageSize,
        filters: dataItems.filters,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataItems, value, visible, loading } = nextProps
    if (
      !isEqual(this.props.dataItems, dataItems) ||
      !isEqual(this.props.value, value) ||
      !isEqual(this.props.loading, loading)
    ) {
      this.setState({
        dataItems,
        value,
        loading,
      })
    }
    if ('visible' in nextProps) {
      this.setState({
        visible: visible,
      })

      if (visible) {
        this.onChange({
          pageNum: 1,
          pageSize: dataItems.pageSize,
          filters: dataItems.filters,
        })
      }
    }
  }

  onSelect = (keys, rows) => {
    this.setState({ value: keys, selectedRows: rows })
  }

  onSearch = (values, isReset) => {
    const { dataItems } = this.state
    this.onChange({
      pageNum: 1,
      pageSize: dataItems.pageSize,
      filters: values,
    })
  }

  async onChange({ pageNum, pageSize, filters }) {
    const loadData = this.props.loadData

    if (loadData) {
      this.setState({
        loading: true,
      })

      const dataItems = await loadData({ pageNum, pageSize, filters })

      this.setState({
        loading: false,
        dataItems: dataItems || this.props.dataItems,
      })
    }
  }

  closeModal = () => {
    if (this.props.onCancel) {
      this.props.onCancel()
      return
    }
    this.setState({
      visible: false,
    })
  }

  onOk = () => {
    const { value, selectedRows } = this.state
    const onSubmit = this.props.onSubmit
    if (onSubmit) {
      onSubmit(value, selectedRows)
    }
  }

  render() {
    const {
      title,
      className,
      columns,
      modalOpts,
      rowKey,
      noFull,
      width,
      selectType,
      onCancel,
      onSubmit,
      pagination,
    } = this.props

    const { dataItems, value, loading, visible } = this.state

    const classname = cx(className, 'antui-table-modal', 'antui-modalform', {
      'full-modal': !noFull,
    })
    // ant-modal-footer
    const dataTableProps = {
      loading,
      columns,
      rowKey,
      dataItems,
      selectedRowKeys: value,
      selectType: selectType,
      showNum: true,
      isScroll: true,
      pagination,
      onChange: ({ pageNum, pageSize }) => this.onChange({ pageNum, pageSize }),
      onSelect: (keys, rows) => this.onSelect(keys, rows),
    }

    const searchBarProps = {
      columns,
      onSearch: this.onSearch,
    }
    const comp = <DataTable {...dataTableProps} />
    const titleComp = (
      <div className="with-search-title">
        <div className="left-title">{title}</div>
        <SearchBar {...searchBarProps} />
      </div>
    )
    const modalProps = {
      className: classname,
      confirmLoading: loading,
      visible,
      width: width || 600,
      title: titleComp,
      destroyOnClose: true,
      onCancel: this.closeModal,
      onOk: this.onOk,
      footer: [
        onCancel && (
          <Button
            key="back"
            type="primary3"
            className="footer-left"
            onClick={this.closeModal}
          >
            取消
          </Button>
        ),
        onSubmit && (
          <Button key="submit" type="primary3" onClick={this.onOk}>
            确定
          </Button>
        ),
      ],
      ...modalOpts,
    }

    return <Modal {...modalProps}>{comp}</Modal>
  }
}

export default ModalTable

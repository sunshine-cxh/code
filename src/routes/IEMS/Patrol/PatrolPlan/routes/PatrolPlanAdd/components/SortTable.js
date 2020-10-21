import React, { Component } from 'react'
import { connect } from 'dva'
import DataTable from 'components/DataTable'
import Table from 'components/Table'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
// import { MenuOutlined } from '@ant-design/icons';
import Icon from 'components/Icon'
import arrayMove from 'array-move'
import SortTableSelect from './sortTableSelect'
import StandardSelect from './standardSelect'
import Tooltip from 'components/Tooltip'
import { createColumns } from './columns'
import { Modal } from 'components/Modal'
import PageHelper from 'utils/pageHelper'

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)
@connect(({ patrolPlanAdd, loading }) => ({
  patrolPlanAdd,
  loading: loading.models.patrolPlanAdd,
}))
class SortTable extends React.Component {
  state = {
    record: null,
    visible: false,
    addInfoVisible: false,
    fileLoading: false,
    index: 0,
    standardVisible: false,
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    let {
      patrolPlanAdd: { selectDataList },
      dispatch,
    } = this.props
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(selectDataList.list), oldIndex, newIndex).filter(
        (el) => !!el
      )
      selectDataList.list = newData
      dispatch({
        type: 'patrolPlanAdd/@change',
        payload: {
          selectDataList,
        },
      })
    }
  }

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    let {
      patrolPlanAdd: { selectDataList },
    } = this.props
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = selectDataList.list.findIndex((x) => x.id === restProps['data-row-key'])
    return <SortableItem index={index} {...restProps} />
  }
  onChangeVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  onChangeStandardVisible = (standardVisible) => {
    this.setState({
      standardVisible,
    })
  }
  handleStandardSelect = (standardVisible, record) => {
    this.setState({
      standardVisible,
      record,
    })
    let { dispatch } = this.props
    dispatch({
      type: 'patrolPlanAdd/getStandardInfo',
      payload: {
        values: {
          entity: {
            name: '',
            equipmentLedgerId: record.id,
          },
        },
        pageData: PageHelper.create(),
      },
    })
  }
  // 手动添加
  handleSelectBtn = (e) => {
    let {
      dispatch,
      patrolPlanAdd: { deviceDataList },
    } = this.props
    dispatch({
      type: 'patrolPlanAdd/getDeviceList',
      payload: {
        deviceDataList: deviceDataList.startPage(),
      },
    })
    this.onChangeVisible(true)
  }
  // 删除操作
  deleteFn = (record) => {
    let {
      patrolPlanAdd: { selectDataList, selectedDeviceRow, selectedDeviceRowKeys },
      dispatch,
    } = this.props
    // 删除Keys 列表中的key
    let index = selectedDeviceRowKeys.indexOf(record.id)
    if (index >= 0) {
      selectedDeviceRowKeys.splice(index, 1)
    }
    selectedDeviceRow = selectedDeviceRow.filter((item) => {
      return item.id !== record.id
    })
    selectDataList.list = selectedDeviceRow
    dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        selectedDeviceRow,
        selectedDeviceRowKeys,
        selectDataList,
      },
    })
  }

  // 删除确认提示
  handleDelete = (record, type) => {
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        if (type == 'detail') {
          this.deleteFn(record)
        }
      },
    })
  }
  render() {
    const { visible, standardVisible, record } = this.state
    let {
      patrolPlanAdd: { selectDataList },
    } = this.props
    let columns = createColumns(this)
    const DraggableContainer = (props) => (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={this.onSortEnd}
        {...props}
      />
    )
    const standardSelectProps = {
      standardVisible,
      record,
      onChangeVisible: this.onChangeStandardVisible,
    }
    const selectListProps = {
      visible,
      onChangeVisible: this.onChangeVisible,
    }
    return (
      <section className="block-wrap">
        <div className="header">
          <span className="title">巡检路线</span>
          <span>
            <Tooltip title="选择">
              <Icon ilng type="select" onClick={this.handleSelectBtn} className="icon-item" />
            </Tooltip>
          </span>
        </div>
        <Table
          pagination={false}
          dataSource={selectDataList.list}
          columns={columns}
          rowKey="id"
          components={{
            body: {
              wrapper: DraggableContainer,
              row: this.DraggableBodyRow,
            },
          }}
        />
        <StandardSelect {...standardSelectProps}></StandardSelect>
        <SortTableSelect {...selectListProps} />
      </section>
    )
  }
}

export default SortTable

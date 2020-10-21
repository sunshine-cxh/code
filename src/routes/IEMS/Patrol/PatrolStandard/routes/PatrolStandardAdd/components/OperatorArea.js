/*
 * @Descripttion : 巡检标准清单
 * @Author       : caojiarong
 * @Date         : 2020-06-02 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-02 15:08:29
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Editable } from 'components/DataTable'
import { createColumnsApp } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal, ModalForm } from 'components/Modal'
import SelectList from "./selectList"
import { guid } from 'utils/common'

@connect(({ patrolStandardAdd, loading }) => ({
  patrolStandardAdd,
  loading: loading.models.patrolStandardAdd
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    record: null,
    visible: false,
    addInfoVisible: false,
    fileLoading: false,
    status: 'add',
    index: 0,
    ...this.initShowState
  }
  initShowState = {
    lowerLimitDisabled: true,
    upperLimitDisabled: true,
    referenceValueDisabled: true,
    correctOptionDisabled: true,
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'patrolStandardAdd/getItemTypeList'
    })
  }

  // 删除操作
  deleteFn = (record) => {
    let {
      patrolStandardAdd: { itemPageData },
      dispatch,
    } = this.props
    // 删除列表
    itemPageData.list.splice(record.index, 1)
    itemPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'patrolStandardAdd/@change',
      payload: {
        itemPageData
      }
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
        } else {
          this.handleFileDelete(record)
        }
      },
      onCancel() { },
    })
  }

  // 编辑详情明细
  handleEdit = (record) => {
    // todo 编辑当前详情内容
    this.setState({
      addInfoVisible: true,
      record,
      status: 'edit',
      index: record.index
    },()=> {
      this.changeType(record.type)
    })
  }

  componentWillUnmount() {
    let { patrolStandardAdd: { itemPageData }, dispatch } = this.props
    itemPageData.list = []
    dispatch({
      type: 'patrolStandardAdd/@change',
      payload: {
        itemPageData,
      }
    })
  }

  onChangeVisible = (visible) => {
    this.setState({
      visible
    })
  }

  handleAdd = () => {
    this.setState({
      // ...this.state,
      record: null,
      addInfoVisible: true,
      status: 'add',
      ...this.initShowState
    })
  };

  changeType = (type) => {
    if (type == 1) {
      this.setState({
        lowerLimitDisabled: false,
        upperLimitDisabled: false,
        referenceValueDisabled: true,
        correctOptionDisabled: true
      })
    } else if (type == 2) {
      this.setState({
        lowerLimitDisabled: true,
        upperLimitDisabled: true,
        referenceValueDisabled: false,
        correctOptionDisabled: false
      })
    } else if (type == 3) {
      this.setState({
        ...this.initShowState
      })
    }
  }

  render() {
    let { dispatch, patrolStandardAdd, loading, } = this.props
    let { visible, addInfoVisible, record, index, status } = this.state
    let { itemPageData, standardItemTypeList } = patrolStandardAdd
    let columnsApp = createColumnsApp(this, standardItemTypeList, this.props)

    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: itemPageData
    }

    // 单条详情配置
    let modalFormProps = {
      title: '巡查项新增',
      record,
      visible: addInfoVisible,
      columns: columnsApp,
      modalOpts: {
        width: 740,
        height: 310
      },
      footer: [],
      onCancel: () => {
        this.setState({
          record: null,
          addInfoVisible: false
        })
      },

      onSubmit: values => {    //todo 添加的逻辑要修改
        values.type = parseInt(values.type)
        if (status === 'edit') {
          Object.assign(itemPageData.list[index], { ...values })
        } else {
          let addItem = {
            id: guid(),
            index: itemPageData.list.length,
            ...values
          }
          itemPageData.list.push(addItem)
        }
        dispatch({
          type: 'patrolStandardAdd/@change',
          payload: {
            itemPageData,
          }
        })
        this.setState({
          addInfoVisible: false
        })
      },
      onContinue: status === 'add' ? (values) => {
        let addItem = {
          id: guid(),
          index: itemPageData.list.length,
          ...values
        }
        itemPageData.list.push(addItem)
        dispatch({
          type: 'patrolStandardAdd/@change',
          payload: {
            itemPageData,
          }
        })
      } : null
    }

    return (
      <section className="block-wrap">
        {/* 点检项目 */}
        <div className="header">
          <span className='title'>巡查项</span>
          <span>
            <Tooltip title="新增">
              <Icon
                ilng
                type="plus"
                onClick={this.handleAdd}
                className="icon-item"
              ></Icon>
            </Tooltip>
          </span>
        </div>
        <Editable {...applyDataTableProps}></Editable>
        {/* 单条详情弹窗 */}
        <ModalForm {...modalFormProps}></ModalForm>
      </section>
    )
  }
}

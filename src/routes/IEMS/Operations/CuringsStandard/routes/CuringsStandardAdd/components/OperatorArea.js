/*
 * @Descripttion : 养护标准清单
 * @Author       : hezihua
 * @Date         : 2020-06-02 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 11:08:22
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Editable } from 'components/DataTable'
import { createColumnsApp } from './columns'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import { Modal, ModalForm } from 'components/Modal'
import SelectList from './selectList'
import { guid } from 'utils/common'

@connect(({ curingsStandardAdd, loading }) => ({
  curingsStandardAdd,
  loading: loading.models.curingsStandardAdd,
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
    ...this.initShowState,
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
      type: 'curingsStandardAdd/getItemTypeList',
    })
  }

  // 删除操作
  deleteFn = (record) => {
    let {
      curingsStandardAdd: { curingItemPageData },
      dispatch,
    } = this.props
    // 删除列表
    curingItemPageData.list.splice(record.index, 1)
    curingItemPageData.list.map((item, index) => {
      item.index = index
    })
    dispatch({
      type: 'curingsStandardAdd/@change',
      payload: {
        curingItemPageData,
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
        } else {
          this.handleFileDelete(record)
        }
      },
      onCancel() {},
    })
  }

  // 编辑详情明细
  handleEdit = (record) => {
    // todo 编辑当前详情内容
    this.setState(
      {
        addInfoVisible: true,
        record,
        status: 'edit',
        index: record.index,
      },
      () => {
        this.changeType(record.type)
      }
    )
  }

  componentWillUnmount() {
    let {
      curingsStandardAdd: { curingItemPageData },
      dispatch,
    } = this.props
    curingItemPageData.list = []
    dispatch({
      type: 'curingsStandardAdd/@change',
      payload: {
        curingItemPageData,
      },
    })
  }

  onChangeVisible = (visible) => {
    this.setState({
      visible,
    })
  }

  handleAdd = () => {
    this.setState({
      // ...this.state,
      record: null,
      addInfoVisible: true,
      status: 'add',
      ...this.initShowState,
    })
  }

  changeType = (type) => {
    if (type == 1) {
      this.setState({
        lowerLimitDisabled: false,
        upperLimitDisabled: false,
        referenceValueDisabled: true,
        correctOptionDisabled: true,
      })
    } else if (type == 2) {
      this.setState({
        lowerLimitDisabled: true,
        upperLimitDisabled: true,
        referenceValueDisabled: false,
        correctOptionDisabled: false,
      })
    } else if (type == 3) {
      this.setState({
        ...this.initShowState,
      })
    }
  }

  render() {
    let { dispatch, curingsStandardAdd, loading } = this.props
    let { visible, addInfoVisible, record, index, status } = this.state
    let { curingItemPageData, standardItemTypeList } = curingsStandardAdd
    let columnsApp = createColumnsApp(this, standardItemTypeList, this.props)

    const applyDataTableProps = {
      loading,
      showNum: true,
      columns: columnsApp,
      rowKey: 'id',
      dataItems: curingItemPageData,
    }

    // 单条详情配置
    let modalFormProps = {
      title: '养护项新增',
      record,
      visible: addInfoVisible,
      columns: columnsApp,
      modalOpts: {
        width: 740,
        height: 310,
      },
      footer: [],
      onCancel: () => {
        this.setState({
          record: null,
          addInfoVisible: false,
        })
      },

      onSubmit: (values) => {
        //todo 添加的逻辑要修改
        values.type = parseInt(values.type)
        if (status === 'edit') {
          Object.assign(curingItemPageData.list[index], { ...values })
        } else {
          let addItem = {
            id: guid(),
            index: curingItemPageData.list.length,
            ...values,
          }
          curingItemPageData.list.push(addItem)
        }
        dispatch({
          type: 'curingsStandardAdd/@change',
          payload: {
            curingItemPageData,
          },
        })
        this.setState({
          addInfoVisible: false,
        })
      },
      onContinue:
        status === 'add'
          ? (values) => {
              let addItem = {
                id: guid(),
                index: curingItemPageData.list.length,
                ...values,
              }
              curingItemPageData.list.push(addItem)
              dispatch({
                type: 'curingsStandardAdd/@change',
                payload: {
                  curingItemPageData,
                },
              })
            }
          : null,
    }

    return (
      <section className="block-wrap">
        {/* 点检项目 */}
        <div className="header">
          <span className="title">养护项</span>
          <span>
            <Tooltip title="新增">
              <Icon ilng type="plus" onClick={this.handleAdd} className="icon-item"></Icon>
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

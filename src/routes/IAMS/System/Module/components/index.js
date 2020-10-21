/*
 * @Descripttion : 系统模块
 * @Author       : wuhaidong
 * @Date         : 2020-01-04 08:06:34
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-04 15:25:34
 */

import React from 'react'
import { connect } from 'dva'
import BaseComponent from 'components/BaseComponent'
import Layout from 'components/Layout'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import { ModalForm, ModalNormal, Modal } from 'components/Modal'
import DataTable, { Editable } from 'components/DataTable'
import Select from 'components/Select'
import { createColumns, createFunctionColumns } from './columns'
import lodash from 'utils/lodash'

import './index.less'
let currentFunctionPageDataList = [] //当前功能模块等于10时用于保存功能模块新增前的数据
let loaded = false
@connect(({ module, loading, global }) => ({
  module,
  loading: loading.models.module,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    functionVisible: false,
    editingKey: 'null',
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'module/init',
      })
    }
  }

  // 模块删除
  handleDelete = (records) => {
    this.props.dispatch({
      type: 'module/delete',
      payload: {
        id: records[0].id,
      },
    })
  }

  // 模块修改
  handleUpdate = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'module/getModuleTypeTree',
      payload: {
        clientId: record.clientId,
        success: () => {
          this.setState({
            record,
            visible: true,
          })
        },
      },
    })
  }

  // 功能管理
  handleFunctionVisible = (record) => {
    let {
      dispatch,
      module: { functionPageData },
    } = this.props
    dispatch({
      type: 'module/getFunctionPageInfo',
      payload: {
        functionPageData: functionPageData.startPage(),
        values: {
          id: record.id,
        },
        success: () => {
          this.setState({
            record,
            functionVisible: true,
          })
        },
      },
    })
  }

  // 功能管理新增
  handleFunctionAdd = async () => {
    let { record, editingKey } = this.state
    let {
      module: { functionPageData },
      dispatch,
    } = this.props

    if (editingKey === 'null') {
      let addItem = {
        clientId: record.clientId,
        moduleId: record.id,
        functionName: '',
        functionId: '',
        id: null,
        remark: '',
        sortId: 0,
      }

      if (functionPageData.list.length === 10) {
        currentFunctionPageDataList = lodash.cloneDeep(functionPageData.list)
        functionPageData.list.pop()
      }
      // functionPageData.list.push(addItem)
      functionPageData.list.unshift(addItem)

      dispatch({
        type: 'module/@change',
        payload: {
          functionPageData,
        },
      })

      this.setState({ editingKey: null })
    }
  }

  // 功能管理编辑
  handleFunctionEdit = (record) => {
    this.handleSetDitingKey(record.id)
  }

  // 功能管理编辑取消
  handleCancelEdit = () => {
    this.handleSetDitingKey('null')
  }

  //set editngKey
  handleSetDitingKey = (value) => {
    let { editingKey } = this.state
    let {
      module: { functionPageData },
    } = this.props
    if (editingKey === null) {
      if (functionPageData.list.length === 9) {
        functionPageData.list = currentFunctionPageDataList
      } else {
        functionPageData.list.shift()
      }
    }
    this.setState({ editingKey: value })
  }

  // 功能管理编辑保存
  handleFunctionSave = (record, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        values = {
          ...record,
          ...values,
        }
        this.props.dispatch({
          type: 'module/functionSubmit',
          payload: {
            values,
            success: () => {
              this.setState({ editingKey: 'null' })
            },
          },
        })
      }
    })
  }

  // 功能管理删除
  handleFunctionDelete = (records) => {
    Modal.confirm({
      title: '注意',
      content: '是否要删除这1项？',
      onOk: () => {
        this.props.dispatch({
          type: 'module/functionDelete',
          payload: {
            id: records.id,
          },
        })
      },
      onCancel() {},
    })
  }

  render() {
    let { record, visible, functionVisible, editingKey } = this.state
    let {
      dispatch,
      module: {
        parameters,
        listData,
        clientList,
        moduleTypeTree,
        expandedRowKeys,
        toolbarSelectorValue,
        functionPageData,
      },
      loading,
      global: { functionAuthority },
    } = this.props
    let expand = {
      clientList,
      record,
      moduleTypeTree,
      functionAuthority,
      toolbarSelectorValue,
    }
    let columns = createColumns(this, expand)
    let functionExpand = { editingKey }
    let functionColumns = createFunctionColumns(this, functionExpand)
    let tableData = {
      list: listData,
    }

    let selectProps = {
      options: clientList,
      value: toolbarSelectorValue,
      onChange: (value, option) => {
        dispatch({
          type: 'module/getPageInfo',
          payload: {
            values: {
              clientId: value,
            },
          },
        })
        dispatch({
          type: 'module/@change',
          payload: {
            toolbarSelectorValue: value,
          },
        })
        dispatch({
          type: 'module/getModuleTypeTree',
          payload: {
            clientId: value,
          },
        })
      },
    }

    let dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: tableData,
      expandable: true,
      expandedRowKeys,
      onExpand: (expanded, record) => {
        if (expanded) {
          expandedRowKeys.push(record.id)
        } else {
          let i = expandedRowKeys.indexOf(record.id)
          expandedRowKeys.splice(i, 1)
        }
        dispatch({
          type: 'module/@change',
          expandedRowKeys,
        })
      },
    }

    let modalFormProps = {
      record,
      visible,
      columns,
      onCancel: () => {
        this.setState({
          record: null,
          visible: false,
        })
      },
      onSubmit: (values) => {
        dispatch({
          type: 'module/submit',
          payload: {
            values,
            success: () => {
              this.setState({
                record: null,
                visible: false,
              })
            },
          },
        })
      },
    }

    //功能管理modal
    let modalNormalProps = {
      title: `功能管理 - ${record && record.moduleName}`,
      loading,
      record,
      visible: functionVisible,
      onCancel: () => {
        this.setState({
          functionVisible: false,
          editingKey: 'null',
        })
      },
    }

    let functionTableProps = {
      showNum: true,
      loading,
      columns: functionColumns,
      rowKey: 'id',
      dataItems: functionPageData,
      pagination: true,
      isScroll: { x: 500 },
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'module/getFunctionPageInfo',
          payload: {
            functionPageData: functionPageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }

    return (
      <Layout className="full-layout page module-page">
        <Layout.Content>
          <Panel header={null}>
            <Toolbar>
              <Select {...selectProps} />
              <Search
                placeholder="模块名称"
                className="toolbar-item"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'module/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value,
                      },
                    },
                  })
                }}
                onSearch={(value) =>
                  dispatch({
                    type: 'module/getPageInfo',
                    payload: {
                      values: {
                        keyword: value,
                      },
                    },
                  })
                }
              />
              <Button
                type="primary2"
                className="toolbar-item"
                icon="reload"
                onClick={() => {
                  dispatch({
                    type: 'module/@change',
                    payload: {
                      parameters: {},
                    },
                  })
                  dispatch({
                    type: 'module/init',
                    payload: {},
                  })
                }}
              >
                刷新
              </Button>
              <Button
                display={functionAuthority.indexOf('btnAdd') > -1}
                type="primary2"
                className="toolbar-item"
                icon="plus"
                onClick={this.onAdd}
              >
                新增
              </Button>
            </Toolbar>
            <DataTable {...dataTableProps} />
            <ModalForm {...modalFormProps} />
            {/* 功能管理 */}
            <ModalNormal {...modalNormalProps}>
              <div className="module-function-wrap">
                <Toolbar>
                  <Search
                    placeholder="功能名称 / 按钮ID"
                    onSearch={(value) =>
                      dispatch({
                        type: 'module/getFunctionPageInfo',
                        payload: {
                          values: {
                            keyword: value,
                          },
                          functionPageData: functionPageData.startPage(),
                        },
                      })
                    }
                  />
                  <Button
                    type="primary2"
                    className="toolbar-item"
                    icon="plus"
                    onClick={this.handleFunctionAdd}
                  >
                    新增
                  </Button>
                </Toolbar>
                <Editable {...functionTableProps} />
              </div>
            </ModalNormal>
          </Panel>
        </Layout.Content>
      </Layout>
    )
  }
}

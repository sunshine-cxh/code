/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-27 18:52:18
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 09:26:39
 */ 
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import { ModalForm, Modal } from 'components/Modal'
import DataTable from 'components/DataTable'
import { createColumns, createFormColumns } from './columns'
import SearchLayout from 'components/SearchLayout'
import { routerRedux } from 'dva/router'
import { routesPrefix } from '../../../config'
import { Switch } from 'dva/router'

import './index.less'

let loaded = false
@connect(({ gasstation, loading, global }) => ({
  gasstation,
  loading: loading.models.gasstation,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
  }

  componentDidMount() {
    if (!loaded) {
      let { dispatch } = this.props
      loaded = true
      dispatch({
        type: 'gasstation/init',
      })
      dispatch({
        type: 'equipmentGlobal/getAddress',
        payload: {
          namespace: 'gasstation',
          valueField: 'addressList',
          success: () => {},
        },
      })
    }
  }
  handleAdd = ()=> {
    let { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/gasstation/subGasstationAdd`,
      })
    )
  }
  handleUpdate = (record)=> {
    let { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/gasstation/subGasstationAdd`,
        search: `id=${record.id}`
      })
    )
  }
  deleteFn = (record) => {
    let {
      gasstation: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: `gasstation/delete`,
      payload: {
        id: record.id,
        success: () => {
          dispatch({
            type: 'gasstation/getPageInfo',
            payload: {
              pageData: pageData.startPage(),
            },
          })
        },
      },
    })
  }
  handleDelete = (record) => {
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
    let { record, visible } = this.state
    let {
      dispatch,
      gasstation,
      loading,
      routerData: { childRoutes },
      global: { functionAuthority },
    } = this.props
    let { parameters, pageData, popoverVisible, isCurrentRoute } = gasstation
    let columns = createColumns(this)
    let formColumns = createFormColumns(this)
    let dataTableProps = {
      loading,
      showNum: true,
      columns: columns,
      rowKey: 'id',
      dataItems: pageData,
      pagination: true,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'gasstation/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }

    let modalFormProps = {
      record,
      visible,
      columns: columns,
      modalOpts: {
        width: 740,
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false,
        })
      },
      // 新增、修改都会进到这个方法中，可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        dispatch({
          type: 'gasstation/submit',
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
    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          code: form.code,
          name: form.name,
          gasModel: form.gasModel,
          districtId: (form.districtId && form.districtId.length) ? form.districtId[form.districtId.length-1] : undefined,
          type: form.districtId && form.districtId.length
        }
        const {
          gasstation: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'gasstation/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'gasstation/getPageInfo',
          payload: {
            values: {
              entity: forms,
            },
            pageData: pageData.startPage(),
          },
        })
      },
      popoverVisible,
      popoverChange: () => {
        dispatch({
          type: 'gasstation/@change',
          payload: {
            popoverVisible: true,
          },
        })
      },
    }
    return (
      <Layout
      onClick={() => {
        dispatch({
          type: 'gasstation/@change',
          payload: {
            popoverVisible: false,
          },
        })
      }}>
        { isCurrentRoute ? <Panel header={null}>
          <Toolbar>
            <Search
              placeholder="气化站编号 / 气化站名称"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'gasstation/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'gasstation/getPageInfo',
                  payload: {
                    values: {
                      keyword: value,
                    },
                    pageData: pageData.startPage(1, 10, 'SortId', 'asc'),
                  },
                })
              }}
            />
            <Button
              type="primary2"
              className="toolbar-item"
              icon="reload"
              onClick={() => {
                dispatch({
                  type: 'gasstation/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'gasstation/init',
                  payload: {
                    pageData: pageData.startPage(1, 10, 'SortId', 'asc'),
                  },
                })
              }}
            >
              刷新
            </Button>
            <Button type="primary2" className="toolbar-item" icon="plus" onClick={this.handleAdd}>
              新增
            </Button>
            <SearchLayout {...searchLayoutProps}></SearchLayout>
          </Toolbar>
          <DataTable {...dataTableProps} />
          <ModalForm {...modalFormProps} />
        </Panel> : null
        }
        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}

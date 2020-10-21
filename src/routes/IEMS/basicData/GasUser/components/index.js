/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-27 18:52:18
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 09:33:31
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
@connect(({ gasuser, loading, global }) => ({
  gasuser,
  loading: loading.models.gasuser,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
  }

  componentDidMount() {
    if (!loaded) {
      let {dispatch} = this.props
      loaded = true
      dispatch({
        type: 'gasuser/init',
      })
      dispatch({
        type: 'gasuser/getGasStationList',
        payload: {
          success: ()=> {}
        }
      })
      dispatch({
        type: 'gasuser/getGasUserType',
      })
      dispatch({
        type: 'equipmentGlobal/getAddress',
        payload: {
          namespace: 'gasuser',
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
        pathname: `${routesPrefix}/gasuser/subGasUserAdd`,
      })
    )
  }
  handleUpdate = (record)=> {
    let { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/gasuser/subGasUserAdd`,
        search: `id=${record.id}`
      })
    )
  }
  deleteFn = (record) => {
    let {
      gasuser: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: `gasuser/delete`,
      payload: {
        id: record.id,
        success: () => {
          dispatch({
            type: 'gasuser/getPageInfo',
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
      gasuser,
      loading,
      routerData: { childRoutes },
      global: { functionAuthority },
    } = this.props
    let { parameters, pageData, popoverVisible, isCurrentRoute } = gasuser
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
          type: 'gasuser/getPageInfo',
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
          type: 'gasuser/submit',
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
          type: form.type && Number(form.type),
          districtId: (form.districtId && form.districtId.length) ? form.districtId[form.districtId.length-1] : undefined,
          gasStationId: form.gasStationId
        }
        const {
          gasuser: { pageData },
          dispatch,
        } = this.props

        // 隐藏 popover
        dispatch({
          type: 'gasuser/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'gasuser/getPageInfo',
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
          type: 'gasuser/@change',
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
          type: 'gasuser/@change',
          payload: {
            popoverVisible: false,
          },
        })
      }}>
        { isCurrentRoute ? <Panel header={null}>
          <Toolbar>
            <Search
              placeholder="用气用户编号 / 用气用户名称"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'gasuser/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'gasuser/getPageInfo',
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
                  type: 'gasuser/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'gasuser/init',
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

/*
 * @Descripttion : 数据字典类别
 * @Author       : wuhaidong
 * @Date         : 2020-01-04 17:48:17
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-24 11:52:02
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import { ModalForm } from 'components/Modal'
import DataTable from 'components/DataTable'
import createColumns from './columns'

import './index.less'

let loaded = false
@connect(({ equipmentcategory, loading, global }) => ({
  equipmentcategory,
  loading: loading.models.equipmentcategory,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'equipmentcategory/init',
      })
    }
  }

  handleDelete = (records) => {
    let { dispatch } = this.props
    let id = records[0].id
    dispatch({
      type: 'equipmentcategory/delete',
      payload: {
        id,
        success: () => {},
      },
    })
  }

  render() {
    let { record, visible } = this.state
    let {
      dispatch,
      equipmentcategory,
      loading,
      global: { functionAuthority },
    } = this.props
    let { parameters, listData, equipmentcategoryType, expandedRowKeys } = equipmentcategory
    let expand = { equipmentcategoryType, record, functionAuthority }
    let columns = createColumns(this, expand)
    let tableData = {
      list: listData,
    }

    let dataTableProps = {
      loading,
      columns: columns,
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
          type: 'equipmentcategory/@change',
          expandedRowKeys,
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
      onSubmit: (values) => {
        dispatch({
          type: 'equipmentcategory/submit',
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

    return (
      <Layout>
        <Panel header={null}>
          <Toolbar>
            <Search
              placeholder="类别名称 / 类别编号"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'equipmentcategory/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'equipmentcategory/getPageInfo',
                  payload: {
                    values: {
                      keyword: value,
                    },
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
                  type: 'equipmentcategory/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'equipmentcategory/init',
                  payload: {},
                })
              }}
            >
              刷新
            </Button>
            <Button display={functionAuthority.indexOf('btnAdd') > -1} type="primary2" className="toolbar-item" icon="plus" onClick={this.onAdd}>
              新增
            </Button>
          </Toolbar>
          <DataTable {...dataTableProps} />
          <ModalForm {...modalFormProps} />
        </Panel>
      </Layout>
    )
  }
}

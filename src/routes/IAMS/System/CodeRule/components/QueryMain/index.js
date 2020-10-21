/*
 * @Descripttion : 编码规则管理 - 主页
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 15:35:15
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-07 16:03:19
 */

import React from 'react'
import BaseComponent from 'components/BaseComponent'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Search from 'components/Search'
import Select from 'components/Select'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { routePrefix } from '../../../../config'

import { createColumns } from './columns'

import '../../style/queryMain.less'

let loaded = false
@connect(({ codeRule, loading, global }) => ({
  codeRule,
  loading: loading.models.codeRule,
  global,
}))
export default class Main extends BaseComponent {
  constructor(props) {
    super(props)
  }

  state = {
    data: {},
    record: null,
    visible: false,
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'codeRule/init',
      })
    }
  }

  // 搜索
  handleSearch = (keyword) => {
    const {
      codeRule: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'codeRule/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(),
      },
    })
  }

  // 刷新
  handleReload = () => {
    const {
      codeRule: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'codeRule/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'codeRule/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }

  // 新增
  handleAdd = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: `${routePrefix}/codeRule/subAdd`,
      })
    )
  }

  //编辑
  handleEdit = (record) => {
    const { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routePrefix}/codeRule/subAdd`,
        search: `id=${record.id}`,
      })
    )
  }

  // 复制
  handleCopy = (record) => {
    let {
      codeRule: { pageData },
    } = this.props
    this.props.dispatch({
      type: 'codeRule/copyItem',
      payload: {
        id: record.id,
        success: () => {
          setTimeout(() => {
            this.props.dispatch({
              type: 'codeRule/getPageInfo',
              payload: {
                pageData,
              },
            })
          }, 50)
        },
      },
    })
  }

  //删除
  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'codeRule/delete',
      payload: { id },
    })
  }

  render() {
    const {} = this.state
    let {
      dispatch,
      codeRule: { pageData, parameters, enterprises, toolbarSelectorValue, codeRuleEntity },
      loading,
      global: { functionAuthority },
    } = this.props
    let columns = createColumns(this, { codeRuleEntity, functionAuthority })

    // selector props
    let selectProps = {
      options: enterprises,
      value: toolbarSelectorValue,
      onChange: (value, option) => {
        dispatch({
          type: 'codeRule/@change',
          payload: {
            toolbarSelectorValue: value,
          },
        })

        dispatch({
          type: 'codeRule/getPageInfo',
          payload: {
            pageData,
            values: {
              enterpriseId: value,
            },
          },
        })
      },
    }

    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      pagination: true,
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'codeRule/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }

    return (
      <>
        <Toolbar>
          <Select {...selectProps} />
          <Search
            placeholder="规则名称"
            className="toolbar-item"
            value={parameters.keyword}
            onChange={(e) => {
              dispatch({
                type: 'codeRule/@change',
                payload: {
                  parameters: {
                    keyword: e.target.value,
                  },
                },
              })
            }}
            onSearch={this.handleSearch}
          />

          <Button type="primary2" className="toolbar-item" icon="reload" onClick={this.handleReload}>
            刷新
          </Button>

          <Button type="primary2" className="toolbar-item" icon="plus" onClick={this.handleAdd} display={functionAuthority.indexOf('btnAdd') > -1}>
            新增
          </Button>
        </Toolbar>
        <DataTable {...dataTableProps} />
      </>
    )
  }
}

/*
 * @Descripttion : 采购计划页面
 * @Author       : luo jun
 * @Date         : 2020-03-20 08:35:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-08 16:32:15
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'
import { Switch } from 'dva/router'
const { Content } = Layout
import Search from 'components/Search'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import DataTable from 'components/DataTable'
import { Link } from 'dva/router'
import SearchLayout from 'components/SearchLayout'
import { createFormColumns, createColumns } from './columns'
import Tree from 'components/Tree'
const TreeNode = Tree.TreeNode
import SideLayout from 'components/SideLayout'
import '../style/index.less'
import { routerRedux } from 'dva/router'
import { Modal } from 'components/Modal'
import { changeStorage } from 'utils/storage'
import $$ from 'cmn-utils'
import { routesPrefix } from '../../../config'
let loaded = false
@connect(({ basicData, loading, basicDataAdd }) => ({
  basicData,
  loading: loading.models.basicData,
  basicDataAdd,
}))
export default class extends BaseComponent {
  componentDidMount() {
    const { dispatch } = this.props
    if (!loaded) {
      loaded = true

      dispatch({
        type: 'basicData/init',
      })
    }
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'basicData',
        valueField: 'typeList',
        type: 2,
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'basicData',
        valueField: 'brandList',
        success: () => {},
      },
    })
  }
  deleteFn = (record) => {
    let {
      basicData: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: `basicData/delete`,
      payload: {
        id: record.id,
        success: () => {
          dispatch({
            type: 'basicData/getPageInfo',
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

  handleEdit = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'basicDataAdd/getDetails',
      payload: {
        id: record.id,
        success: () => {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/Comsumables/subBasicDataAdd`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }
  // 刷新
  handleReload = () => {
    const {
      basicData: { pageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'basicData/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'basicData/getPageInfo',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }
  /**
   * @description: 输入框搜索
   * @param {type} void
   * @return: void
   */
  searchHandler = (keyword) => {
    const {
      basicData: { pageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'basicData/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        pageData: pageData.startPage(),
      },
    })
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.title} key={item.id} {...item} />
    })
  }
  handleCheck = (keys) => {
    const {
      basicData: { pageData },
      dispatch,
    } = this.props
    this.props.dispatch({
      type: 'basicData/@change',
      payload: {
        checkedKeys: keys,
      },
    })
    dispatch({
      type: 'basicData/getPageInfo',
      payload: {
        values: {
          entity: {
            categoryId: keys,
          },
        },
        pageData: pageData.startPage(),
      },
    })
  }
  handleAdd = () => {
    const { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: `${routesPrefix}/Comsumables/subBasicDataAdd`,
      })
    )
  }
  render() {
    let {
      routerData: { childRoutes },
      basicData: { isCurrentRoute, parameters, pageData, popoverVisible, typeList, checkedKeys },
      dispatch,
      loading,
    } = this.props
    let columns = createColumns(this)
    let formColumns = createFormColumns(this)
    let searchLayoutProps = {
      columns: formColumns,
      searchevent: (form) => {
        let forms = {
          code: form.code,
          name: form.name,
          brandId: form.brandId,
          standard: form.standard,
        }

        // 隐藏 popover
        dispatch({
          type: 'basicData/@change',
          payload: {
            popoverVisible: false,
          },
        })

        dispatch({
          type: 'basicData/getPageInfo',
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
          type: 'basicData/@change',
          payload: {
            popoverVisible: true,
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
          type: 'basicData/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => this.setState({ rows }), //表格有复选框选项
    }
    return (
      // <div>hezihua</div>
      <Layout
        className="page"
        onClick={() => {
          dispatch({
            type: 'basicData/@change',
            payload: {
              popoverVisible: false,
            },
          })
        }}
      >
        {/* <Layout.Content> */}
        {isCurrentRoute ? (
          <SideLayout
            sideContent={
              typeList.length > 0 && (
                <Tree onCheck={this.handleCheck} checkedKeys={checkedKeys} checkable>
                  {this.renderTreeNodes(typeList)}
                </Tree>
              )
            }
          >
            <Panel header={null}>
              <Toolbar>
                <Search
                  placeholder="部件编号 / 部件名称"
                  value={parameters.keyword}
                  onChange={(e) => {
                    dispatch({
                      type: 'basicData/@change',
                      payload: {
                        parameters: {
                          keyword: e.target.value,
                        },
                      },
                    })
                  }}
                  onSearch={this.searchHandler}
                />

                <Button
                  type="primary2"
                  className="toolbar-item"
                  onClick={this.handleReload}
                  icon="reload"
                >
                  刷新
                </Button>
                <Button
                  onClick={this.handleAdd}
                  type="primary2"
                  className="toolbar-item"
                  icon="plus"
                >
                  新增
                </Button>
                <SearchLayout {...searchLayoutProps}></SearchLayout>
                {/* <Button
                    type="primary2" className="toolbar-item"
                    onClick={this.handleReload}
                    icon="reload">
                      导入
                  </Button>
                  <Button
                    type="primary2" className="toolbar-item"
                    onClick={this.handleReload}
                    icon="reload">
                      导出
                  </Button> */}
              </Toolbar>
              <DataTable {...dataTableProps} />
            </Panel>
          </SideLayout>
        ) : null}

        <Switch>{childRoutes}</Switch>
        {/* </Layout.Content> */}
      </Layout>
    )
  }
}

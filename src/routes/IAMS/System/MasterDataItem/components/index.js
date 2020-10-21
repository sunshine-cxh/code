/*
 * @Descripttion : 数据字典
 * @Author       : wuhaidong
 * @Date         : 2020-01-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-01 17:08:50
 */
import React from 'react'
import { connect } from 'dva'
import BaseComponent from 'components/BaseComponent'
import Layout from 'components/Layout'
import Tree from 'components/Tree'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import { ModalForm } from 'components/Modal'
import DataTable from 'components/DataTable'
import SideLayout from 'components/SideLayout'
const TreeNode = Tree.TreeNode
import createColumns from './columns'

import './index.less'

let loaded = false
@connect(({ masterDataItem, loading, global }) => ({
  masterDataItem,
  loading: loading.models.masterDataItem,
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
        type: 'masterDataItem/init',
      })
    }
  }

  //删除
  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'masterDataItem/delete',
      payload: { id },
    })
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }

  //点击树
  onSelectTreeNode = (selectedKeys, info) => {
    let { dispatch, masterDataItem } = this.props
    let { pageData } = masterDataItem
    dispatch({
      type: 'masterDataItem/getMasterDataType',
      payload: {
        category: selectedKeys[0],
        success: () => {
          dispatch({
            type: 'masterDataItem/getPageInfo',
            payload: {
              pageData: pageData.startPage(),
              values: {
                category: selectedKeys[0],
              },
            },
          })

          dispatch({
            type: 'masterDataItem/@change',
            payload: {
              masterDataTreeActiveValue: selectedKeys[0],
            },
          })
        },
      },
    })
  }

  render() {
    let { record, visible } = this.state
    let {
      masterDataItem,
      loading,
      dispatch,
      global: { functionAuthority },
    } = this.props
    let {
      parameters,
      pageData,
      masterDataTree,
      masterDataType,
      masterDataTreeActiveValue,
    } = masterDataItem
    let expand = {
      masterDataTree,
      masterDataType,
      record,
      masterDataTreeActiveValue,
      functionAuthority,
    }
    let columns = createColumns(this, expand)

    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      pagination: true,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'masterDataItem/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }

    let modalFormProps = {
      record,
      visible,
      columns,
      dataItems: pageData,
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
          type: 'masterDataItem/submit',
          payload: {
            values,
            url: '/masterdataitem/submit',
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
      <Layout className="full-layout page admin-masterdataitem-page">
        <Layout.Content>
          <SideLayout
            sideContent={
              //没有则不渲染，不然不能默认打开
              masterDataTree.length > 0 && (
                <Tree
                  defaultExpandAll
                  defaultSelectedKeys={[`${masterDataTree[0].key}`]}
                  onSelect={this.onSelectTreeNode}
                >
                  {this.renderTreeNodes(masterDataTree)}
                </Tree>
              )
            }
          >
            <Panel header={null} className="panel-wrap">
              <Toolbar>
                <Search
                  placeholder="数据名称 / 数据代码"
                  value={parameters.keyword}
                  onChange={(e) => {
                    dispatch({
                      type: 'masterDataItem/@change',
                      payload: {
                        parameters: {
                          keyword: e.target.value,
                        },
                      },
                    })
                  }}
                  onSearch={(value) => {
                    dispatch({
                      type: 'masterDataItem/getPageInfo',
                      payload: {
                        values: {
                          keyword: value,
                        },
                        pageData: pageData.startPage(),
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
                      type: 'masterDataItem/@change',
                      payload: {
                        parameters: {},
                      },
                    })
                    dispatch({
                      type: 'masterDataItem/init',
                      payload: {
                        pageData: pageData.startPage(),
                      },
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
            </Panel>
          </SideLayout>
          <ModalForm {...modalFormProps} />
        </Layout.Content>
      </Layout>
    )
  }
}

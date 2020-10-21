/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-19 14:34:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 16:55:44
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import { createConnectAddColumns } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import Tree from 'components/Tree'
const TreeNode = Tree.TreeNode
import SideLayout from 'components/SideLayout'
import { Layout } from 'antd'
import Panel from 'components/Panel'
const { Content } = Layout

@connect(({ standingBookAdd, loading }) => ({
  standingBookAdd,
  loading: loading.models.standingBookAdd,
}))
export default class extends Component {
  searchHandler = (keyword) => {
    const {
      standingBookAdd: { connectAddPageData },
      dispatch,
    } = this.props

    dispatch({
      type: 'standingBookAdd/getConnectPageInfo',
      payload: {
        values: {
          keyword,
        },
        connectAddPageData: connectAddPageData.startPage(),
      },
    })
  }

  handleReload = () => {
    const {
      standingBookAdd: { connectAddPageData },
      dispatch,
    } = this.props
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        connectParameter: {},
      },
    })
    this.props.dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        checkedKeys: [],
      },
    })
    dispatch({
      type: 'standingBookAdd/getConnectPageInfo',
      payload: {
        connectAddPageData: connectAddPageData.startPage(),
      },
    })
  }
  handleCheck = (keys, e) => {
    const {
      standingBookAdd: { connectAddPageData },
      dispatch,
    } = this.props
    this.props.dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        checkedKeys: keys,
      },
    })
    dispatch({
      type: 'standingBookAdd/getConnectPageInfo',
      payload: {
        values: {
          entity: {
            categoryId: keys,
          },
        },
        connectAddPageData: connectAddPageData.startPage(),
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
  render() {
    let { dispatch, standingBookAdd, loading, visible, onChangeVisible } = this.props
    let { connectPageData, connectAddPageData, connectRow, connectRowKeys, connectParameter, checkedKeys, typeList } = standingBookAdd
    let columnsProduct = createConnectAddColumns(this)
    let modalNormalProps = {
      title: '备件选择',
      visible,
      modalOpts: {
        width: 1198,
      },
      onSubmitTitle: '确定',
      footer: [],
      onCancel: () => {
        onChangeVisible(false)
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        connectPageData.list = connectRow
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            connectPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: connectAddPageData,
      rowKey: 'id',
      pagination: true,
      selectType: 'checkbox',
      onSelect(keys, rows) {
        // 更新row
        for (let item of rows) {
          let flag = true
          for (let item1 of connectRow) {
            if (item1.id === item.id) {
              flag = false
            }
          }
          if (flag) {
            connectRow.push(item)
          }
        }
        connectRow = connectRow.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            connectRow,
          },
        })

        // 更新keys
        dispatch({
          type: 'standingBookAdd/@change',
          payload: {
            connectRowKeys: keys,
          },
        })
      },
      selectedRowKeys: connectRowKeys,
      onChange({ pageNum, pageSize }) {
        dispatch({
          type: 'standingBookAdd/getConnectPageInfo',
          payload: {
            connectAddPageData: connectAddPageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps}  className="modal-treedata-table">
        <Layout>
          {/* <Content> */}
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
                    placeholder="设备编号/ 设备名称"
                    value={connectParameter.keyword}
                    onChange={(e) => {
                      dispatch({
                        type: 'standingBookAdd/@change',
                        payload: {
                          connectParameter: {
                            keyword: e.target.value,
                          },
                        },
                      })
                    }}
                    onSearch={(keyword) => {
                      this.searchHandler(keyword)
                    }}
                  />
                  <Button type="primary2" className="toolbar-item" icon="reload" onClick={this.handleReload}>
                    刷新
                  </Button>
                </Toolbar>
                <DataTable {...dataTableSelectProps} />
              </Panel>
              
            </SideLayout>
          {/* </Content> */}
        </Layout>
      </ModalNormal>
    )
  }
}

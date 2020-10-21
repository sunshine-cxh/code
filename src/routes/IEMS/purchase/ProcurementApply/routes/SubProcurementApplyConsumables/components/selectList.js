/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-15 10:28:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 16:16:14
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import DataTable from 'components/DataTable'
import { createColumnsProduct } from './columns'
import { ModalNormal } from 'components/Modal'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import Button from 'components/Button'
import Tree from 'components/Tree'
const TreeNode = Tree.TreeNode
import SideLayout from 'components/SideLayout'
import { Layout } from 'antd'
import Panel from 'components/Panel'
import Format from 'utils/format'
const { Content } = Layout

@connect(({ procurementApplyConsumables, loading }) => ({
  procurementApplyConsumables,
  loading: loading.models.procurementApplyConsumables,
}))
export default class extends Component {
  searchHandler = (keyword) => {
    const {
      procurementApplyConsumables: { selectDataList },
      dispatch,
    } = this.props

    dispatch({
      type: 'procurementApplyConsumables/getPageInfo',
      payload: {
        values: {
          keyword,
        },
        selectDataList: selectDataList.startPage(),
      },
    })
  }

  handleReload = () => {
    const {
      procurementApplyConsumables: { selectDataList },
      dispatch,
    } = this.props
    dispatch({
      type: 'procurementApplyConsumables/@change',
      payload: {
        parameters: {},
      },
    })
    this.props.dispatch({
      type: 'procurementApplyConsumables/@change',
      payload: {
        checkedKeys: [],
      },
    })
    dispatch({
      type: 'procurementApplyConsumables/getPageInfo',
      payload: {
        selectDataList: selectDataList.startPage(),
      },
    })
  }
  handleCheck = (keys, e) => {
    const {
      procurementApplyConsumables: { selectDataList },
      dispatch,
    } = this.props
    this.props.dispatch({
      type: 'procurementApplyConsumables/@change',
      payload: {
        checkedKeys: keys,
      },
    })
    dispatch({
      type: 'procurementApplyConsumables/getPageInfo',
      payload: {
        values: {
          entity: {
            categoryId: keys,
          },
        },
        selectDataList: selectDataList.startPage(),
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
    let { dispatch, procurementApplyConsumables, loading, visible, onChangeVisible } = this.props
    let {
      appPageData,
      selectDataList,
      selectedRow,
      selectedRowKeys,
      addRow,
      parameters,
      checkedKeys,
      typeList,
    } = procurementApplyConsumables
    let columnsProduct = createColumnsProduct(this)
    let modalNormalProps = {
      title: '添加产品',
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
        let items = []
        // selectedList = Object.values(selectedRow).flat()
        selectedRow.forEach((item, index) => {
          items.push({
            ...item,
            index: addRow.length + index,
          })
        })
        let list = [...addRow, ...items]
        appPageData.list = Format.newTableArr(appPageData.list, list, 'id')
        dispatch({
          type: 'procurementApplyConsumables/@change',
          payload: {
            appPageData,
          },
        })
        onChangeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns: columnsProduct,
      dataItems: selectDataList,
      rowKey: 'id',
      pagination: true,
      selectType: 'checkbox',
      onSelect(keys, rows) {
        // 更新row  以及keys
        for (let item of rows) {
          let flag = true
          for (let item1 of selectedRow) {
            if (item1.id === item.id) {
              flag = false
            }
          }
          if (flag) {
            selectedRow.push(item)
          }
        }
        selectedRow = selectedRow.filter((item) => {
          return keys.includes(item.id)
        })
        dispatch({
          type: 'procurementApplyConsumables/@change',
          payload: {
            selectedRow,
            selectedRowKeys: keys,
          },
        })
      },
      selectedRowKeys,
      onChange({ pageNum, pageSize }) {
        dispatch({
          type: 'procurementApplyConsumables/getPageInfo',
          payload: {
            selectDataList: selectDataList.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    return (
      <ModalNormal {...modalNormalProps} className="modal-treedata-table">
        <Layout>
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
                  placeholder="产品编号 / 产品名称"
                  value={parameters.keyword}
                  onChange={(e) => {
                    dispatch({
                      type: 'procurementApplyConsumables/@change',
                      payload: {
                        parameters: {
                          keyword: e.target.value,
                        },
                      },
                    })
                  }}
                  onSearch={(keyword) => {
                    this.searchHandler(keyword)
                  }}
                />
                <Button
                  type="primary2"
                  className="toolbar-item"
                  icon="reload"
                  onClick={this.handleReload}
                >
                  刷新
                </Button>
              </Toolbar>
              <DataTable {...dataTableSelectProps} />
            </Panel>
            
          </SideLayout>
        </Layout>
      </ModalNormal>
    )
  }
}

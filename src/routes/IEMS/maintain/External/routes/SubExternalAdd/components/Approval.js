/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-28 15:27:06
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 14:56:58
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import Button from 'components/Button'
import DataTable from 'components/DataTable'
import Toolbar from 'components/Toolbar'
import Search from 'components/Search'
import { createColumnsApproval } from './columns'
import Tree from 'components/Tree'
const TreeNode = Tree.TreeNode
import SideLayout from 'components/SideLayout'
import { Layout } from 'antd'
import Panel from 'components/Panel'
import Format from 'utils/format'
import Timeline from 'components/Timeline'
import $$ from 'cmn-utils'
const { Content } = Layout

@connect(({ externalAdd, loading }) => ({
  externalAdd,
  loading: loading.models.externalAdd,
}))
export default class extends Component {
  componentDidMount() {
    const {
      dispatch,
      externalAdd: { approvalDataList },
    } = this.props

    dispatch({
      type: 'externalAdd/getUserInfos',
      payload: {
        approvalDataList,
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'externalAdd',
        valueField: 'organizationTree',
      },
    })
  }
  state = {
    approvalRow: [],
    approvalRowKeys: [],
  }
  handleCheck = (keys) => {
    const {
      externalAdd: { approvalDataList },
      dispatch,
    } = this.props
    this.props.dispatch({
      type: 'externalAdd/@change',
      payload: {
        approvalCheckedKeys: keys,
      },
    })
    dispatch({
      type: 'externalAdd/getUserInfos',
      payload: {
        values: {
          entity: {
            orgIdList: keys,
          },
        },
        approvalDataList: approvalDataList.startPage(),
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
    let { externalAdd, loading, visible, dispatch, changeVisible } = this.props
    let {
      approvalCheckedKeys,
      approvalRowKeys,
      approvalRow,
      approvalRowLocal,
      approvalRowKeysLocal,
      flowchartList,
      approvalDataList,
      organizationTree,
    } = externalAdd
    let columns = createColumnsApproval(this)
    let modalNormalProps = {
      title: '选择审批人',
      visible,
      modalOpts: {
        width: 1198,
      },
      footer: [],
      onSubmitTitle: '确定',
      onCancel: () => {
        dispatch({
          type: 'externalAdd/@change',
          payload: {
            flowchartList: approvalRow.length ? approvalRow : [],
            approvalRowLocal: approvalRow,
            approvalRowKeysLocal: approvalRowKeys,
          },
        })
        changeVisible(false)
      },
      onSubmit: () => {
        dispatch({
          type: 'externalAdd/@change',
          payload: {
            approvalRow: approvalRowLocal.length ? approvalRowLocal : [],
            approvalRowKeys: approvalRowKeysLocal,
            flowchartList: approvalRowLocal.length ? approvalRowLocal : [],
          },
        })
        changeVisible(false)
      },
    }
    let dataTableSelectProps = {
      loading,
      showNum: true,
      columns,
      dataItems: approvalDataList,
      rowKey: 'id',
      pagination: true,
      selectType: 'checkbox',
      className: 'approval-table',
      rowSelection: {
        hideDefaultSelections: true,
        selections: false
      },
      onSelect: (keys, rows) => {
        dispatch({
          type: 'externalAdd/@change',
          payload: {
            approvalRowKeysLocal: keys,
          },
        })
      },
      onSelectRow: (record, selected, selectedRows, event) => {
        let arr = []
        if (selected) {
          arr = [...approvalRowLocal, record]
        } else {
          arr = approvalRowLocal.filter((item) => {
            return item.id !== record.id
          })
        }
        // this.state.approvalRow = approvalRowLocal
        dispatch({
          type: 'externalAdd/@change',
          payload: {
            flowchartList: arr,
            approvalRowLocal: arr,
          },
        })
      },
      selectedRowKeys: approvalRowKeys,
      onChange: ({ pageNum, pageSize }) => {
        // 分页
        dispatch({
          type: 'externalAdd/getUserInfos',
          payload: {
            approvalDataList: approvalDataList.jumpPage(pageNum, pageSize),
          },
        })
      },
    }
    let timelineProps = {
      columns: flowchartList,
      type: 2,
    }
    return (
      <ModalNormal {...modalNormalProps} className="modal-treedata-table">
        <Layout>
          <Content>
            <SideLayout
              sideContent={
                organizationTree.length > 0 && (
                  <Tree onCheck={this.handleCheck} checkedKeys={approvalCheckedKeys} checkable>
                    {this.renderTreeNodes(organizationTree)}
                  </Tree>
                )
              }
            >
              <div className="approval-container">
                <DataTable {...dataTableSelectProps} />
                <div className="flow-chart">
                  <Timeline {...timelineProps}></Timeline>
                </div>
              </div>
            </SideLayout>
          </Content>
        </Layout>
      </ModalNormal>
    )
  }
}

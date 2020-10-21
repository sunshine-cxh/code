/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-28 15:27:06
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-11 17:53:01
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

@connect(({ moveAdd, loading }) => ({
  moveAdd,
  loading: loading.models.moveAdd,
}))
export default class extends Component {
  componentDidMount() {
    const {
      dispatch,
      moveAdd: { approvalDataList },
    } = this.props
    dispatch({
      type: 'moveAdd/getUserInfos',
      payload: {
        approvalDataList,
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'moveAdd',
        valueField: 'organizationTree'
      },
    })
  }
  state = {
    approvalRow: [],
    approvalRowKeys: [],
  }
  handleCheck = (keys) => {
    const {
      moveAdd: { approvalDataList },
      dispatch,
    } = this.props
    this.props.dispatch({
      type: 'moveAdd/@change',
      payload: {
        approvalCheckedKeys: keys,
      },
    })
    dispatch({
      type: 'moveAdd/getUserInfos',
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
    let {
      moveAdd,
      loading,
      visible,
      dispatch,
      changeVisible,
    } = this.props
    let {
      approvalCheckedKeys,
      approvalRowKeys,
      approvalRow,
      approvalRowLocal,
      approvalRowKeysLocal,
      flowchartList,
      approvalDataList,
    } = moveAdd
    let { organizationTree } = moveAdd
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
          type: 'moveAdd/@change',
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
          type: 'moveAdd/@change',
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
      onSelect: (keys, rows) => {

        dispatch({
          type: 'moveAdd/@change',
          payload: {
            approvalRowKeysLocal: keys,
          },
        })
      },
      onSelectRow: (record, selected, selectedRows, event) => {
        let arr = []
        let obj = {...record, ...{ approverName: record.realName}}
        if (selected) {
          arr = [...approvalRowLocal, obj]
        } else {
          arr = approvalRowLocal.filter((item) => {
            return item.id !== obj.id
          })
        }
        dispatch({
          type: 'moveAdd/@change',
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
          type: 'moveAdd/getUserInfos',
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
                  <Tree
                    onCheck={this.handleCheck}
                    checkedKeys={approvalCheckedKeys}
                    checkable
                  >
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

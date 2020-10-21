/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-28 15:27:06
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-19 17:45:24
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

@connect(({ procurementPlanAdd, loading }) => ({
  procurementPlanAdd,
  loading: loading.models.procurementPlanAdd,
}))
export default class extends Component {
  componentDidMount() {
    const {
      dispatch,
      procurementPlanAdd: { approvalDataList },
    } = this.props

    dispatch({
      type: 'procurementPlanAdd/getUserInfos',
      payload: {
        approvalDataList,
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'procurementPlanAdd',
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
      procurementPlanAdd: { approvalDataList },
      dispatch,
    } = this.props
    this.props.dispatch({
      type: 'procurementPlanAdd/@change',
      payload: {
        approvalCheckedKeys: keys,
      },
    })
    dispatch({
      type: 'procurementPlanAdd/getUserInfos',
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
    let { procurementPlanAdd, loading, visible, dispatch, changeVisible } = this.props
    let {
      approvalCheckedKeys,
      approvalRowKeys,
      approvalRow,
      approvalRowLocal,
      approvalRowKeysLocal,
      flowchartList,
      approvalDataList,
      organizationTree,
    } = procurementPlanAdd
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
          type: 'procurementPlanAdd/@change',
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
          type: 'procurementPlanAdd/@change',
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
          type: 'procurementPlanAdd/@change',
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
          type: 'procurementPlanAdd/@change',
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
          type: 'procurementPlanAdd/getUserInfos',
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

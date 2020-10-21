/*
 * @Descripttion : 角色管理-page
 * @Author       : wuhaidong
 * @Date         : 2020-01-03 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-01 17:48:52
 */

import React from 'react'
import { connect } from 'dva'
import BaseComponent from 'components/BaseComponent'
import Layout from 'components/Layout'
import SideLayout from 'components/SideLayout'
import Tree from 'components/Tree'
import Button from 'components/Button'
import Panel from 'components/Panel'
import Search from 'components/Search'
import Toolbar from 'components/Toolbar'
import { ModalForm, ModalNormal } from 'components/Modal'
import DataTable from 'components/DataTable'
import Tabs from 'components/Tabs'
import Select from 'components/Select'
const { TreeNode } = Tree
import { createColumns, createColumnsClient } from './columns'

import './index.less'

let loaded = false
@connect(({ role, loading, global }) => ({
  role,
  loading: loading.models.role,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    handlePermissionVisible: false,
    tabsActiveKeyKey: 'client', // client、module、organization
  }

  componentDidMount() {
    let { dispatch } = this.props
    if (!loaded) {
      loaded = true
      dispatch({
        type: 'role/init',
      })
    }
  }

  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'role/delete',
      payload: {
        id,
      },
    })
  }

  //权限管理
  handlePermissionVisible = (record) => {
    let { dispatch } = this.props
    dispatch({
      type: 'role/getClientPermission',
      payload: {
        roleId: record.id,
        success: () => {
          this.setState({
            record,
            handlePermissionVisible: true,
          })
        },
      },
    })
  }

  //选择功能权限
  handleFunctionCheck = (checkedKeys, info) => {
    let { record } = this.state
    let {
      dispatch,
      role: { clientListSelectorDefaultValue },
    } = this.props
    let submitCheckedKeys = checkedKeys.concat(info.halfCheckedKeys)
    dispatch({
      type: 'role/submitFunctionPermission',
      payload: {
        clientId: clientListSelectorDefaultValue,
        roleId: record.id,
        submitFunctionCheckedKeys: submitCheckedKeys,
      },
    })
  }

  //tree nodes
  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} {...item} />
    })

  //点击组织机构树
  onSelectModuleTreeNode = (selectedKeys, info) => {
    let { record } = this.state
    let {
      dispatch,
      role: { toolbarSelectorValue, clientListSelectorDefaultValue },
    } = this.props

    dispatch({
      type: 'role/getOrganizationPermission',
      payload: {
        enterpriseId: toolbarSelectorValue,
        roleId: record.id,
        clientId: clientListSelectorDefaultValue,
        moduleId: selectedKeys[0],
      },
    })

    dispatch({
      type: 'role/@change',
      payload: {
        moduleTreeSelectedKey: selectedKeys,
      },
    })
  }

  //选择组织权限
  handleOrganizationCheck = (checkedKeys, info) => {
    let { record } = this.state
    let {
      dispatch,
      role: { clientListSelectorDefaultValue, moduleTreeSelectedKey },
    } = this.props
    let submitCheckedKeys = checkedKeys.concat(info.halfCheckedKeys)

    dispatch({
      type: 'role/submitOrganizationPermission',
      payload: {
        roleId: record.id,
        clientId: clientListSelectorDefaultValue,
        moduleId: moduleTreeSelectedKey,
        organizationCheckedKeys: submitCheckedKeys,
      },
    })
  }

  render() {
    let { record, visible, handlePermissionVisible, tabsActiveKeyKey } = this.state
    let {
      role: {
        parameters,
        pageData,
        roleType,
        clientPageInfo,
        clientListSelector,
        clientListSelectedKeys,
        clientListSelected,
        clientListSelectorDefaultValue,
        functionTreeData,
        functionCheckedKeys,
        functionExpandedKeys,
        enterpriseList,
        toolbarSelectorValue,
        moduleTree,
        moduleTreeSelectedKey,
        organizationPermissionTree,
        organizationCheckedKeys,
      },
      loading,
      dispatch,
      global: { functionAuthority },
    } = this.props

    let expand = {
      roleType,
      record,
      functionAuthority,
      enterpriseList,
      toolbarSelectorValue,
    }
    let columns = createColumns(this, expand)
    let columnsCilent = createColumnsClient(this)
    let clientListSelectorAvailable = clientListSelector.filter((item) => {
      for (let i = 0; i < clientListSelected.length; i++) {
        if (clientListSelected[i] === item.code) {
          return item
        }
      }
    })

    //选择列表
    // let selectProps = {
    //   options: enterpriseList,
    //   value: toolbarSelectorValue,
    //   onChange: (value, option) => {
    //     dispatch({
    //       type: 'role/getPageInfo',
    //       payload: {
    //         pageData,
    //         values: {
    //           enterpriseId: value,
    //         },
    //       },
    //     })
    //     dispatch({
    //       type: 'role/@change',
    //       payload: {
    //         toolbarSelectorValue: value,
    //       },
    //     })
    //   },
    // }

    let dataTableProps = {
      loading,
      showNum: true,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      pagination: true,
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'role/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
    }

    //修改modal
    let modalFormProps = {
      record,
      visible,
      columns,
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
          type: 'role/submit',
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

    //权限管理modal
    let modalHandlePermissionProps = {
      title: `权限管理 - ${record && record.roleName}`,
      record,
      visible: handlePermissionVisible,
      footer: false,
      hiddenYScrollbar: true,
      onCancel: () => {
        this.setState({
          record: null,
          handlePermissionVisible: false,
          tabsActiveKeyKey: 'client',
        })
      },
      // onSubmit: (values) => {
      //   if (tabsActiveKeyKey === 'client') {
      //     dispatch({
      //       type: 'role/submitClientPermission',
      //       payload: {
      //         roleId: values.id,
      //       },
      //     })
      //   } else {
      //     dispatch({
      //       type: 'role/submitFunctionPermission',
      //       payload: {
      //         roleId: values.id,
      //         clientId: clientListSelectorDefaultValue,
      //       },
      //     })
      //   }
      // },
    }

    //权限管理客户端列表
    let dataTableClientpermissionProps = {
      loading,
      showNum: true,
      columns: columnsCilent,
      rowKey: 'id',
      dataItems: clientPageInfo,
      pagination: false,
      selectType: 'checkbox',
      selectedRowKeys: clientListSelectedKeys,
      isScroll: { x: 500 },
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'role/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => {
        dispatch({
          type: 'role/submitClientPermission',
          payload: {
            clientListSelectedKeys: keys,
            roleId: record.id,
          },
        })
      },
    }

    //权限管理-客户端选择
    let clientListSelectorProps = {
      options: clientListSelectorAvailable,
      value: clientListSelectorDefaultValue,
      onChange: (value, option) => {
        let { tabsActiveKeyKey } = this.state
        if (tabsActiveKeyKey === 'module') {
          dispatch({
            type: 'role/getFunctionPermission',
            payload: {
              clientId: value,
              roleId: record.id,
            },
          })
        } else if (tabsActiveKeyKey === 'organization') {
          dispatch({
            type: 'role/getModuleTree',
            payload: {
              init: true,
              clientId: value,
              roleId: record.id,
            },
          })
        }

        dispatch({
          type: 'role/@change',
          payload: {
            clientListSelectorDefaultValue: value,
          },
        })
      },
    }

    return (
      <Layout className="role-page">
        <Panel header={null}>
          <Toolbar>
            {/* <Select {...selectProps} /> */}
            <Search
              placeholder="角色名称"
              // className="toolbar-item"
              value={parameters.keyword}
              onChange={(e) => {
                dispatch({
                  type: 'role/@change',
                  payload: {
                    parameters: {
                      keyword: e.target.value,
                    },
                  },
                })
              }}
              onSearch={(value) => {
                dispatch({
                  type: 'role/getPageInfo',
                  payload: {
                    values: {
                      keyword: value,
                    },
                    pageData: pageData.jumpPage(),
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
                  type: 'role/@change',
                  payload: {
                    parameters: {},
                  },
                })
                dispatch({
                  type: 'role/init',
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
        <ModalForm {...modalFormProps} />
        <ModalNormal {...modalHandlePermissionProps} className="modal-permission">
          <div className="role-permission-wrap">
            <Tabs
              activeKey={tabsActiveKeyKey}
              onChange={(value) => {
                if (value === 'module' || value === 'organization') {
                  if (clientListSelectorAvailable.length > 0) {
                    if (value === 'module') {
                      dispatch({
                        type: 'role/getFunctionPermission',
                        payload: {
                          clientId: clientListSelectorAvailable[0].code,
                          roleId: record.id,
                          success: () => {
                            this.setState({
                              tabsActiveKeyKey: value,
                            })
                          },
                        },
                      })
                    } else if (value === 'organization') {
                      dispatch({
                        type: 'role/getModuleTree',
                        payload: {
                          init: true,
                          clientId: clientListSelectorAvailable[0].code,
                          roleId: record.id,
                          success: () => {
                            this.setState({
                              tabsActiveKeyKey: value,
                            })
                          },
                        },
                      })
                    }

                    dispatch({
                      type: 'role/@change',
                      payload: {
                        clientListSelectorDefaultValue: clientListSelectorAvailable[0].code,
                      },
                    })
                  }
                } else {
                  this.setState({
                    tabsActiveKeyKey: value,
                  })
                }
              }}
            >
              <div tab="应用权限" key="client">
                <DataTable {...dataTableClientpermissionProps} />
              </div>
              <div tab="模块权限" key="module">
                <Select {...clientListSelectorProps} />
                {functionTreeData.length > 0 && clientListSelectorAvailable.length > 0 && (
                  <Tree
                    className="module-tree"
                    checkable
                    defaultExpandAll={true}
                    // expandedKeys={functionExpandedKeys}
                    autoExpandParent={true}
                    checkedKeys={functionCheckedKeys}
                    onCheck={this.handleFunctionCheck}
                  >
                    {this.renderTreeNodes(functionTreeData)}
                  </Tree>
                )}
              </div>

              <div tab="组织机构权限" key="organization">
                <div className="flexbox organizationPermissionTree-wrap">
                  <div className="left flex-1">
                    <Select {...clientListSelectorProps} />
                    {moduleTree.length > 0 && (
                      <Tree
                        className="module-tree"
                        defaultExpandAll
                        selectedKeys={moduleTreeSelectedKey}
                        onSelect={this.onSelectModuleTreeNode}
                      >
                        {this.renderTreeNodes(moduleTree)}
                      </Tree>
                    )}
                  </div>

                  <div className="right flex-1">
                    <Tree
                      // className="module-tree"
                      checkable
                      defaultExpandAll={true}
                      // expandedKeys={functionExpandedKeys}
                      autoExpandParent={true}
                      checkedKeys={organizationCheckedKeys}
                      onCheck={this.handleOrganizationCheck}
                    >
                      {this.renderTreeNodes(organizationPermissionTree)}
                    </Tree>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </ModalNormal>
      </Layout>
    )
  }
}

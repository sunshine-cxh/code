/*
 * @Descripttion : 用户管理
 * @Author       : wuhaidong
 * @Date         : 2020-01-03 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-01 17:28:51
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
import Select from 'components/Select'
import { createColumns1, columns2 } from './columns'

import './index.less'

let loaded = false
@connect(({ user, loading, global }) => ({
  user,
  loading: loading.models.user,
  global,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    updatePasswordVisible: false,
    updatePasswordRecord: [],
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'user/init',
      })
    }
  }

  handleReload = () => {
    let {
      dispatch,
      user: { pageData },
    } = this.props
    dispatch({
      type: 'user/@change',
      payload: {
        parameters: {},
      },
    })
    dispatch({
      type: 'user/init',
      payload: {
        pageData: pageData.startPage(),
      },
    })
  }

  handleUpdateUserPassword = (record) => {
    this.setState({
      record,
      updatePasswordVisible: true,
      updatePasswordRecord: columns2,
    })
  }

  handleDelete = (records) => {
    let id = records[0].id
    this.props.dispatch({
      type: 'user/delete',
      payload: { id },
    })
  }

  render() {
    let { record, visible, updatePasswordVisible, updatePasswordRecord } = this.state
    let {
      dispatch,
      user: {
        parameters,
        pageData,
        role,
        accountType,
        organizationTree,
        enterpriseList,
        enterpriseId,
      },
      loading,
      global: { functionAuthority },
    } = this.props

    let expand = {
      role,
      accountType,
      organizationTree,
      record,
      functionAuthority,
      enterpriseList,
      enterpriseId,
    }
    let columns = createColumns1(this, expand)

    //选择列表
    // let selectProps = {
    //   options: enterpriseList,
    //   value: enterpriseId,
    //   onChange: async (value, option) => {
    //     dispatch({
    //       type: 'user/getPageInfo',
    //       payload: {
    //         pageData,
    //         values: {
    //           enterpriseId: value,
    //         },
    //       },
    //     })
    //     dispatch({
    //       type: 'user/@change',
    //       payload: {
    //         enterpriseId: value,
    //       },
    //     })

    //     dispatch({
    //       type: 'user/getAllOrganization',
    //       payload: {
    //         enterpriseId: value,
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
          type: 'user/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
          },
        })
      },
      onSelect: (keys, rows) => {}, //表格有复选框选项
    }

    let modalFormProps = {
      title: visible ? (!record ? '新增' : '修改') : '重置用户密码',
      record,
      visible: visible ? visible : updatePasswordVisible,
      columns: visible ? columns : updatePasswordRecord,
      modalOpts: {
        width: 740,
      },
      onCancel: () => {
        if (visible) {
          this.setState({
            record: null,
            visible: false,
          })
        } else {
          this.setState({
            record: null,
            updatePasswordVisible: false,
          })
        }
      },
      // 新增、修改都会进到这个方法中，可以使用主键或是否有record来区分状态
      onSubmit: (values) => {
        if (visible && values.birthday) {
          values.birthday = values.birthday.format('YYYY-MM-DD')
        }

        dispatch({
          type: visible ? 'user/submit' : 'user/updatePassword',
          payload: {
            values,
            success: () => {
              if (visible) {
                this.setState({
                  record: null,
                  visible: false,
                })
              } else {
                this.setState({
                  record: null,
                  updatePasswordVisible: false,
                })
              }
            },
          },
        })
      },
    }

    return (
      <Layout className="full-layout page">
        <Layout.Content>
          <Panel header={null}>
            <Toolbar>
              {/* <Select {...selectProps} /> */}
              <Search
                placeholder="用户账号 / 用户名称 / 联系电话"
                // className="toolbar-item"
                value={parameters.keyword}
                onChange={(e) => {
                  dispatch({
                    type: 'user/@change',
                    payload: {
                      parameters: {
                        keyword: e.target.value,
                      },
                    },
                  })
                }}
                onSearch={(value) => {
                  dispatch({
                    type: 'user/getPageInfo',
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
                onClick={this.handleReload}
              >
                刷新
              </Button>
              <Button
                display={functionAuthority.indexOf('btnAdd') > -1} //功能权限控制
                type="primary2"
                className="toolbar-item"
                icon="plus"
                onClick={this.onAdd}
              >
                新增
              </Button>
            </Toolbar>
            <DataTable {...dataTableProps} />
            <ModalForm {...modalFormProps} />
          </Panel>
        </Layout.Content>
      </Layout>
    )
  }
}

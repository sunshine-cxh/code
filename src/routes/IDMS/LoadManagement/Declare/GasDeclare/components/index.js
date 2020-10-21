/*
 * @Descripttion : 重点用户申报
 * @Author       : wuhaidong
 * @Date         : 2020-01-03 10:11:37
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-08 17:33:29
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
import DatePicker from 'components/DatePicker'
import { createColumns1 } from './columns'
import $$ from 'cmn-utils'
import './index.less'
import { ModalNormal } from 'components/Modal'
import { Switch, routerRedux } from 'dva/router'
import { Link } from 'dva/router'
import { routePrefix } from '../../../../config'
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
    enterpriseName: $$.getStore('user').enterpriseName || '',
  }

  componentDidMount() {
    if (!loaded) {
      loaded = true
      this.props.dispatch({
        type: 'user/init',
      })
    }

    
  }

  handleDetails = (record) => {
    console.log(record)
    const { dispatch } = this.props
    // this.setState({record})
    dispatch({
      type: 'user/getDetails',
      payload: {
        id: record.id,
        success: () => {
          //成功回调后跳转到详情页
          dispatch(
            routerRedux.push({
              pathname: `${routePrefix}/gasdeclare/subDeclareDetail`,
              search: `id=${record.id}`,
            })
          )
        },
      },
    })
  }

  handleEdit = (record)=>{
    console.log(record)
    record.status = record.status.toString()
    record.declareType=record.declareType.toString()
    this.setState({record,visible:true})
    
  }

  render() {
    let {
      record,
      visible,
      updatePasswordVisible,
      updatePasswordRecord,
      enterpriseName,
    } = this.state
    console.log(record)
    let {
      routerData: { childRouter },
      dispatch,
      user: {
        parameters: { keyword },
        pageData,
        toolbarSelectorValue,
        isCurrentRoute,
        moduleList,
        moduleStatus,
      },
      loading,
      global: { functionAuthority },
    } = this.props

    let expand = {
      record,
      functionAuthority,
      toolbarSelectorValue,
      enterpriseName,
      moduleList,
      moduleStatus,
    }
   
    let columns = createColumns1(this, expand)

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
      title: visible ? (record ? '' : '') : '修改',
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
        if (visible && values.gasStartTime) {
          values.gasStartTime = values.gasStartTime.format('YYYY-MM-DD')
        }

        dispatch({
          type: visible ? 'user/submit' : '',
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
          {isCurrentRoute ? (
            <Panel header={null}>
              <Toolbar>
                {/* <Select defaultValue={enterpriseName} disabled="true" /> */}
                <span className="DeclarationDate"> 申报日期:</span>
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  className="toolbar-item"
                  className='datePicker'
                  type="range"
                  onChange={(e, dateString) => {
                   
                    dispatch({
                      type: 'user/@change',
                      payload: {
                        parameters: {
                          startTime: dateString[0],
                          endTime: dateString[1],
                        },
                      },
                    })
                  }}
                ></DatePicker>
                <Button
                  type="primary2"
                  className="toolbar-item"
                  icon="reload"
                  onClick={() => {
                    dispatch({
                      type: 'user/@change',
                      payload: {
                        parameters: {},
                      },
                    })
                    dispatch({
                      type: 'user/getPageInfo',
                      payload: {
                        pageData: pageData.startPage(),
                      },
                    })
                  }}
                >
                  刷新
                </Button>
                <Button
                  // display={functionAuthority.indexOf('btnQuery') > -1} //功能权限控制
                  type="primary2"
                  className="toolbar-item"
                  icon="detail"
                  onClick={() => {
                    //存储时间后传给后端查询时间段内的数据，再返回
                    dispatch({
                      type: 'user/getPageInfo',
                      payload: {
                        pageData: pageData.startPage(),
                      },
                    })
                  }}
                >
                  查询
                </Button>

                <Link to={`${routePrefix}/gasdeclare/subdeclareadd`}>
                  <Button
                    // display={functionAuthority.indexOf('btnAdd') > -1} //功能权限控制
                    type="primary2"
                    className="toolbar-item"
                    icon="plus"
                    // onClick={this.onAdd}
                  >
                    新增申报
                  </Button>
                </Link>
              </Toolbar>
              <DataTable {...dataTableProps} />
              {/* <ModalNormal> */}
              <ModalForm {...modalFormProps} />
            </Panel>
          ) : null}
          <Switch>{childRouter}</Switch>
        </Layout.Content>
      </Layout>
    )
  }
}

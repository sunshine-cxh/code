/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-28 16:56:35
 */

import React from 'react'
import { connect } from 'dva'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BaseComponent from 'components/BaseComponent'
import { routerRedux } from 'dva/router'
import DataTable from 'components/DataTable'
import BasicInfo from './BasicInfos'
import { createPatrolColumns, createColumns } from './columns'
import $$ from 'cmn-utils'
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
import Input from 'components/Input'
import { routesPrefix } from '../../../../../config'
@connect(({ patrolTaskOperate, loading }) => ({
  patrolTaskOperate,
  loading: loading.models.patrolTaskOperate,
}))
export default class patrolTaskOperate extends BaseComponent {
  state = {
    fileLoading: false
  }
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'patrolTaskOperate/init',
      payload: {
        id: searchObj.id,
      },
    })

    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'patrolTaskOperate',
        valueField: 'allUserList',
        success: () => { },
      },
    })
  }
  changeValue = (treeData, key, value) => {
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].key === key) {
        treeData[i].inspectionResult = value
        return
      }
      if (treeData[i].children && treeData[i].children.length > 0) {
        this.changeValue(treeData[i].children, key, value)
      }
    }

  }
  onChange = (e, record) => {

    let { patrolTaskOperate: { patrolLinePageInfo }, dispatch } = this.props
    this.changeValue(patrolLinePageInfo.list, record.key, e.target.value)
    dispatch({
      type: 'patrolTaskOperate/@change',
      payload: {
        patrolLinePageInfo
      }
    })
  }
  handleBack = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  handleSave = () => {
    let { dispatch } = this.props
    dispatch({
      type: 'patrolTaskOperate/edit',
      payload: {
        success: () => {
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/patrolTask`
          }))
          dispatch({
            type: 'patrolTask/getPageInfo',
            payload: {
              pageData: PageHelper.create()
            }
          })
        }
      }
    })
  }
  handleSubmit = () => {
    let { dispatch } = this.props
    dispatch({
      type: 'patrolTaskOperate/submit',
      payload: {
        success: () => {
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/patrolTask`
          }))
          dispatch({
            type: 'patrolTask/getPageInfo',
            payload: {
              pageData: PageHelper.create()
            }
          })
        }
      }
    })
  }
  render() {
    const orderColumns = createPatrolColumns(this)
    const {
      patrolTaskOperate: { patrolLinePageInfo, details },
      loading,
    } = this.props
    let orderTableProps = {
      loading,
      columns: orderColumns,
      rowKey: 'key',
      dataItems: patrolLinePageInfo,
      footer: () => {
        return <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ width: '300px', textAlign: 'center', height: '40px', lineHeight: '40px' }}>存在的故障及问题:</div>
          <Input style={{ width: 'calc(100% - 300px)' }} value={details.remark} onChange={(val)=> {
            let { dispatch } = this.props
            dispatch({
              type: 'patrolTaskOperate/@change',
              payload: {
                details: { ...details, remark: val}
              }
            })
          }}/>
          </div>
      }
    }
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfo></BasicInfo>
        </Panel>
        <Panel header={null}>
          <section className="block-wrap">
            <div className="header">
              <span className="title">巡检路线</span>
            </div>
            <DataTable {...orderTableProps}></DataTable>
          </section>
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSave}>
            保存
          </Button>
          <Button type="primary3" onClick={this.handleSubmit}>
            提交
          </Button>
          <Button type="primary3" onClick={this.handleBack}>
            返回
          </Button>
        </section>
      </SubPageLayout>
    )
  }
}
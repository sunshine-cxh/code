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
import downloadFile from 'utils/fileHandler'
import ProblemInfo from './problemInfo'
import $$ from 'cmn-utils'
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
import Input from 'components/Input'
import { routesPrefix } from '../../../../../config'
@connect(({ patrolTaskSubmit, loading }) => ({
  patrolTaskSubmit,
  loading: loading.models.patrolTaskSubmit,
}))
export default class patrolTaskSubmit extends BaseComponent {
  state = {
    fileLoading: false
  }
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'patrolTaskSubmit/init',
      payload: {
        id: searchObj.id,
      },
    })

    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'patrolTaskSubmit',
        valueField: 'allUserList',
        success: () => { },
      },
    })
  }
  handleDownload = (record) => {
    downloadFile(record)
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

    let { patrolTaskSubmit: { patrolLinePageInfo }, dispatch } = this.props
    this.changeValue(patrolLinePageInfo.list, record.key, e.target.value)
    dispatch({
      type: 'patrolTaskSubmit/@change',
      payload: {
        patrolLinePageInfo
      }
    })
  }
  handleBack = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  handleAgree = (resultType) => {
    let { validateFields, getFieldValue } = this.form.props.form
    let {
      dispatch,
      location: { state },
      patrolTaskSubmit: { details },
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        let auditOpinion = getFieldValue('auditOpinion')
        dispatch({
          type: 'patrolTaskSubmit/postaudit',
          payload: {
            id: details.id,
            resultType,
            auditOpinion,
            success: () => {
              this.handleBack()
            },
          },
        })
      }
    })
  }
  render() {
    const orderColumns = createPatrolColumns(this)
    const {
      patrolTaskSubmit: { patrolLinePageInfo },
      loading,
    } = this.props
    let orderTableProps = {
      loading,
      columns: orderColumns,
      rowKey: 'key',
      dataItems: patrolLinePageInfo,
      footer: () => {
        return <div style={{ display: 'flex', justifyContent: 'flex-start' }}><div style={{ width: '300px', textAlign: 'center', height: '40px', lineHeight: '40px' }}>存在的故障及问题:</div><Input style={{ width: 'calc(100% - 300px)' }} /></div>
      }
    }
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfo></BasicInfo>
        </Panel>
        <Panel header={null}>
          <ProblemInfo></ProblemInfo>
          <DataTable {...orderTableProps}></DataTable>
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleBack}>
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
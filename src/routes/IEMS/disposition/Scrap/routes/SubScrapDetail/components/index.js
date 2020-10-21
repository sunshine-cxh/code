/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-28 16:56:35
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import DataTable from 'components/DataTable'
import BasicInfo from './BasicInfos'
import Suggest from './Suggest'
import { createMoveColumns, createCheckColumns, createFileColumns } from './columns'
import downloadFile from 'utils/fileHandler'
import '../style/index.less'
import $$ from 'cmn-utils'
let { Item } = Form
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
@connect(({ scrapDetail, loading }) => ({
  scrapDetail,
  loading: loading.models.scrapDetail,
}))
export default class scrapDetail extends BaseComponent {
  state = {
    fileLoading: false
  }
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'scrapDetail/init',
      payload: {
        id: searchObj.id,
      },
    })

    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'scrapDetail',
        valueField: 'allUserList',
        success: () => {},
      },
    })
  }
  handleDownload = (record) => {
    downloadFile(record)
  }
  handleBack = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  handleAgree = (resultType) => {
    let { validateFields, getFieldValue } = this.form.props.form
    let {
      dispatch,
      location: { state },
      scrapDetail: { details },
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        let auditOpinion = getFieldValue('auditOpinion')
        dispatch({
          type: 'scrapDetail/postaudit',
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
    const orderColumns = createMoveColumns(this)
    const checkColumns = createCheckColumns(this)
    const preroute = $$.getStore('pre-route-path')
    let { fileLoading } = this.state
    let columnsFile = createFileColumns(this)
    let checkHisList = PageHelper.create()
    const {
      scrapDetail: { moveTableList, checkHis, filePageData },
      loading,
    } = this.props
    checkHisList.list = checkHis
    let orderTableProps = {
      loading,
      showNum: true,
      columns: orderColumns,
      rowKey: 'id',
      dataItems: moveTableList,
    }
    const fileDataTableProps = {
      loading: fileLoading,
      showNum: true,
      columns: columnsFile,
      rowKey: 'id',
      dataItems: filePageData,
      showNum: false,
    }
    let checkTableProps = {
      loading,
      showNum: true,
      columns: checkColumns,
      rowKey: 'id',
      dataItems: checkHisList,
    }
    let content = '',
      footer = ''
    if (preroute === '/account/willCheck') {
      content = (
        <>
          <Panel header={null}>
            <section className="block-wrap">
              <div className="header">
                <span className="title">审批意见</span>
              </div>
              <Suggest wrappedComponentRef={(form) => (this.form = form)}></Suggest>
            </section>
          </Panel>
        </>
      )
      footer = (
        <>
          <Button
            type="primary3"
            onClick={() => {
              this.handleAgree(1)
            }}
          >
            同意
          </Button>
          <Button
            type="primary3"
            onClick={() => {
              this.handleAgree(2)
            }}
          >
            不同意
          </Button>
          <Button
            type="primary3"
            onClick={() => {
              this.handleAgree(3)
            }}
          >
            驳回
          </Button>
        </>
      )
    } else {
      content = (
        <>
          <Panel header={null}>
            <section className="block-wrap">
              <div className="header">
                <span className="title">审批信息</span>
              </div>
              <DataTable {...checkTableProps}></DataTable>
            </section>
          </Panel>
        </>
      )
    }
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfo></BasicInfo>
        </Panel>
        <Panel header={null}>
          <section className="block-wrap">
            <div className="header">
              <span className="title">设备信息</span>
            </div>
            <DataTable {...orderTableProps}></DataTable>
          </section> 
        </Panel>
        <Panel header={null}>
        <section className="block-wrap">
            <div className="header">
              <span className="title">相关附件</span>
            </div>
            <DataTable {...fileDataTableProps}></DataTable>
          </section>
        </Panel>
        {content}
        <section className="footer-wrap">
          {footer}
          <Button type="primary3" onClick={this.handleBack}>
            返回
          </Button>
        </section>
      </SubPageLayout>
    )
  }
}

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:51:42
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-16 14:12:35
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
import { createOrderColumns, createFileColumns, createEquipmentColumns, createCheckColumns } from './columns'
import downloadFile from 'utils/fileHandler'
import '../style/index.less'
import $$ from 'cmn-utils'
import Suggest from './Suggest'
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
@connect(({ procurementApplyDetail, loading, procurementapply }) => ({
  procurementApplyDetail,
  loading: loading.models.procurementApplyDetail,
  procurementapply,
}))
export default class procurementApplyDetail extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'procurementApplyDetail/init',
      payload: {
        id: searchObj.id,
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        success: () => {},
        namespace: 'procurementApplyDetail',
        valueField: 'unitList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        success: () => {},
        namespace: 'procurementApplyDetail',
        valueField: 'supplyList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        success: () => {},
        namespace: 'procurementApplyDetail',
        valueField: 'brandList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        success: () => {},
        namespace: 'procurementApplyDetail',
        valueField: 'typeList',
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
      procurementApplyDetail: { details },
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        let auditOpinion = getFieldValue('auditOpinion')
        dispatch({
          type: 'procurementApplyDetail/postaudit',
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
    const orderColumns = createOrderColumns(this)
    const fileColumns = createFileColumns(this)
    const equipmentColumns = createEquipmentColumns(this)
    const checkColumns = createCheckColumns(this)
    const preroute = $$.getStore('pre-route-path')
    let checkHisList = PageHelper.create()
    const {
      procurementApplyDetail: { orderTableList, fileTableList, details, checkHis },
      loading,
    } = this.props
    fileTableList.list = details.fileDataList
    orderTableList.list = details.purchaseDataList
    checkHisList.list = checkHis
    let columns = []
    if (details.type === '1') {
      columns = orderColumns
    } else if (details.type === '0') {
      columns = equipmentColumns
    } else {
      columns = orderColumns
    }
    let orderTableProps = {
      loading,
      showNum: true,
      columns: columns,
      rowKey: 'id',
      dataItems: orderTableList,
    }
    let fileTableProps = {
      loading,
      showNum: true,
      columns: fileColumns,
      rowKey: 'id',
      dataItems: fileTableList,
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
                <span className="title">设备清单</span>
              </div>
              <DataTable {...orderTableProps}></DataTable>
            </section>
            
        </Panel>
        <Panel header={null}>
          <section className="block-wrap">
            <div className="header">
              <span className="title">相关附件</span>
            </div>
            <DataTable {...fileTableProps}></DataTable>
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

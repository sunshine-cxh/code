/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:51:42
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 09:13:14
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
import { createOrderColumns, createFileColumns } from './columns'
import downloadFile from 'utils/fileHandler'
import '../style/index.less'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
import { routesPrefix } from '../../../../../config'

@connect(({ procurementTestDetail, loading, procurementTest }) => ({
  procurementTestDetail,
  loading: loading.models.procurementTestDetail,
  procurementTest,
}))
export default class procurementTestDetail extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'procurementTestDetail/init',
      payload: {
        id: searchObj.id,
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        success: () => {},
        namespace: 'procurementTestDetail',
        valueField: 'supplyList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        success: () => {},
        namespace: 'procurementTestDetail',
        valueField: 'unitList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        success: () => {},
        namespace: 'procurementTestDetail',
        valueField: 'typeList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getLocation',
      payload: {
        success: () => {},
        namespace: 'procurementTestDetail',
        valueField: 'locationList',
      },
    })
  }
  handleDownload = (record) => {
    downloadFile(record)
  }
  render() {
    const orderColumns = createOrderColumns(this)
    const fileColumns = createFileColumns(this)
    const {
      procurementTestDetail: { orderTableList, fileTableList, details },
      loading,
    } = this.props
    fileTableList.list = details.fileDataList ? details.fileDataList : []
    orderTableList.list = details.purchaseDataList ? details.purchaseDataList : []
    let orderTableProps = {
      loading,
      showNum: true,
      columns: orderColumns,
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
    return (
      <SubPageLayout>
        <Panel header={null}>
            <BasicInfo></BasicInfo>
        </Panel>
        <Panel header={null}>
            <section className="block-wrap">
              <div className="header">
                <span className="title">产品信息</span>
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
        <section className="footer-wrap">
          <Link to={`${routesPrefix}/procurementTest`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

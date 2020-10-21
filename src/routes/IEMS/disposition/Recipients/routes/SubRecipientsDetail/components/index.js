/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:51:42
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-10 11:11:40
 */

import React from 'react'
import { connect } from 'dva'

import Panel from 'components/Panel'
import Button from 'components/Button'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import DataTable from 'components/DataTable'
import BasicInfo from './BasicInfos'
import { createOrderColumns } from './columns'
import downloadFile from 'utils/fileHandler'
import '../style/index.less'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
import { ModalForm, Modal } from 'components/Modal'
import { createFileColumns } from './columns'
import $$ from 'cmn-utils'
@connect(({ recipientsDetail, loading, scrapAdd }) => ({
  recipientsDetail,
  loading: loading.models.recipientsDetail,
  scrapAdd,
}))
export default class recipientsDetail extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'recipientsDetail/init',
      payload: {
        id: searchObj.id,
      },
    })

    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'recipientsDetail',
        valueField: 'organizationTree'
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'recipientsDetail',
        valueField: 'allUserList',
      },
    })
  }
  state = {
    fileLoading: false
  }
  handleDownload = (record) => {
    downloadFile(record)
  }
  handleBack = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  render() {
    const orderColumns = createOrderColumns(this)
    const {
      recipientsDetail: { orderTableList, details, filePageData },
      loading,
    } = this.props
    let { fileLoading } = this.state
    let columnsFile = createFileColumns(this)
    
    let orderTableProps = {
      loading,
      showNum: true,
      columns: orderColumns,
      rowKey: 'id',
      dataItems: orderTableList,
    }
    const fileDataTableProps = {
      loading: fileLoading,
      showNum: true,
      columns: columnsFile,
      rowKey: 'id',
      dataItems: filePageData,
      showNum: false,
    }
    return (
      <SubPageLayout>
        <Panel header={null}>
            <BasicInfo></BasicInfo>
        </Panel>
        <Panel header={null}>
            <section className="block-wrap">
              <div className="header">
                <span className="title">领用设备</span>
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
        
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleBack}>
            返回
          </Button>
        </section>
      </SubPageLayout>
    )
  }
}

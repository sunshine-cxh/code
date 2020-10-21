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
import ReturnEquipment from './ReturnEquipment'
import $$ from 'cmn-utils'
@connect(({ recipientsReturn, loading, scrapAdd }) => ({
  recipientsReturn,
  loading: loading.models.recipientsReturn,
  scrapAdd,
}))
export default class recipientsReturn extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'recipientsReturn/init',
      payload: {
        id: searchObj.id,
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'recipientsReturn',
        valueField: 'organizationTree'
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'recipientsReturn',
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
      recipientsReturn: { orderTableList, details, filePageData },
      loading,
    } = this.props
    let { fileLoading } = this.state
    let columnsFile = createFileColumns(this)
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
        <ReturnEquipment></ReturnEquipment>
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

/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:51:42
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-04 15:13:26
 */

import React from 'react'
import { connect } from 'dva'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BaseComponent from 'components/BaseComponent'
import { routerRedux } from 'dva/router'
import BasicInfo from './BasicInfos'
import Operate from './Operate'
import downloadFile from 'utils/fileHandler'
import '../style/index.less'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
import PageHelper from 'utils/pageHelper'

@connect(({ inventoryDetail, loading }) => ({
  inventoryDetail,
  loading: loading.models.inventoryDetail,
}))
export default class inventoryDetail extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'inventoryDetail/init',
      payload: {
        id: searchObj.id,
        pageData: PageHelper.create(),
        success: (details) => {
          dispatch({
            type: 'inventoryDetail/@change',
            payload: {
              operatePageData: JSON.parse(JSON.stringify(details)),
            }
          })
        },
      },
    })

    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'inventoryDetail',
        valueField: 'brandList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        namespace: 'inventoryDetail',
        valueField: 'unitList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        namespace: 'inventoryDetail',
        valueField: 'supplyList',
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
  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfo></BasicInfo>
        </Panel>
        <Panel header={null}>
          <Operate></Operate>
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

/*
 * @Descripttion : 入库管理详情数据页面
 * @Author       : caojiarong
 * @Date         : 2020-05-08 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:31:25
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import UploadFile from './UploadFile'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'
import qs from 'query-string'
import { routesPrefix } from '../../../../../config.js'
import '../style/index.less'

const createForm = Form.create;
@connect(({ outWarehouseManageDetail, loading }) => ({
  outWarehouseManageDetail,
  loading: loading.models.outWarehouseManageDetail
}))
class outWarehouseManageDetail extends BaseComponent {
  getDetails = () => {
    const { dispatch, location} = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'outWarehouseDetail/getWarehouseDetail',
      payload: {
        id: searchObj.id
        // id: $$.getStore('equipment-outWarehouse-id')
      }
    })
  }
  componentDidMount() {
    this.getDetails()
  }
  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos  wrappedComponentRef={(form) => this.form = form} />
        </Panel>
        <Panel header={null}>
          <OperatorArea />
        </Panel>
        <Panel header={null}>
          <UploadFile />
        </Panel>
        <section className="footer-wrap">
          <Link to={`${routesPrefix}/outWarehouse`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(outWarehouseManageDetail);
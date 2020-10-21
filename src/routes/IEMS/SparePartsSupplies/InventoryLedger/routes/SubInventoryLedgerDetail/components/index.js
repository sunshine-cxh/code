/*
 * @Descripttion : 库存台账详情数据页面
 * @Author       : caojiarong
 * @Date         : 2020-05-08 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:27:01
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import ChangeRecord from './ChangeRecord'
import RelateDevice from './relateDevice'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'

import qs from 'query-string';
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'

const createForm = Form.create;
@connect(({ inventoryLedgerDetail, loading }) => ({
  inventoryLedgerDetail,
  loading: loading.models.inventoryLedgerDetail
}))
class inventoryLedgerDetail extends BaseComponent {
  
  getDetails = () => {
    const { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'inventoryLedgerDetail/getInventoryDetail',
      payload: {
        id:searchObj.id
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
            <BasicInfos />
        </Panel>
        <Panel header={null}>
            <OperatorArea />
        </Panel>
        <Panel header={null}>
            <ChangeRecord />
        </Panel>
        <Panel header={null}>
            <RelateDevice />
        </Panel>
        <section className="footer-wrap">
          <Link to={`${routesPrefix}/inventoryLedger`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(inventoryLedgerDetail);
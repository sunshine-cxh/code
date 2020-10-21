/*
 * @Descripttion : 仓库盘点详情数据页面
 * @Author       : caojiarong
 * @Date         : 2020-05-25 11:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 13:58:50
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'
import SubPageLayout from 'components/SubPageLayout'
import qs from 'query-string'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'

const createForm = Form.create;
@connect(({ warehouseInventoryDetail, loading }) => ({
  warehouseInventoryDetail,
  loading: loading.models.warehouseInventoryDetail
}))
class warehouseInventoryDetail extends BaseComponent {
  
  getDetails = () => {
    const { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'warehouseInventoryDetail/getWarehouseDetail',
      payload: {
        id: searchObj.id
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
        <section className="footer-wrap">
          <Link to={`${routesPrefix}/warehouseInventory`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(warehouseInventoryDetail);
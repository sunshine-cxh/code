/*
 * @Descripttion : 入库管理详情数据页面
 * @Author       : caojiarong
 * @Date         : 2020-05-08 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:29:39
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import qs from 'query-string';
import PageHelper from 'utils/pageHelper'
import { routesPrefix } from '../../../../../config.js'

import '../style/index.less'

const createForm = Form.create;
@connect(({ inWarehouseDetail, loading }) => ({
  inWarehouseDetail,
  loading: loading.models.inWarehouseDetail
}))
class inWarehouseDetail extends BaseComponent {

  getDetails = () => {
    const { dispatch,location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'inWarehouseDetail/getWarehouseDetail',
      payload: {
        id: searchObj.id,
        // id: $$.getStore('equipment-inWarehouse-id')
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
          <Link to={`${routesPrefix}/inWarehouse`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(inWarehouseDetail);
/*
 * @Descripttion : 报修工单详情页面
 * @Author       : caojiarong
 * @Date         : 2020-06-17 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:11:02
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import DeviceInfos from './DeviceInfos'
import OperatorArea from './OperatorArea'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'
import $$ from 'cmn-utils';
import qs from 'query-string'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'

const createForm = Form.create;
@connect(({ repairOrderDetail, loading }) => ({
  repairOrderDetail,
  loading: loading.models.repairOrderDetail
}))
class repairOrderDetail extends BaseComponent {

  getDetails = () => {
    const { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    
    dispatch({
      type: 'repairOrderDetail/getDetail',
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
          <DeviceInfos />
        </Panel>
        <Panel header={null}>
          <BasicInfos />
        </Panel>
        <Panel header={null}>
          <OperatorArea />
        </Panel>
        <section className="footer-wrap">
          <Link to={`${routesPrefix}/repairOrder`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(repairOrderDetail);
/*
 * @Descripttion : 用户申报详情页
 * @Author       : caojiarong
 * @Date         : 2020-08-31 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-02 14:32:51
 */

import React from 'react'
import { connect } from 'dva'

import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'
import qs from 'query-string'
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routePrefix } from '../../../../../../config'
import WeatherInfoList from './WeatherInfoList'

@connect(({ subApprovalDetail, loading }) => ({
  subApprovalDetail,
  loading: loading.models.subApprovalDetail,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    console.log(searchObj)
    dispatch({
      type: 'subApprovalDetail/init',
      payload: {
        id: searchObj.id
      },
    })
  }

  

  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos />
        </Panel>
        <Panel header={null}>
          <WeatherInfoList />
        </Panel>
        <section className="footer-wrap">
          <Link to={`${routePrefix}/modelHouse`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

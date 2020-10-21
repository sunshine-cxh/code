/*
 * @Descripttion : 路线详情页
 * @Author       : caojiarong
 * @Date         : 2020-08-18 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-18 19:05:18
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import LineInfoList from './LineInfoList'
import { notice } from 'components/Notification'
import $$ from 'cmn-utils'
import qs from 'query-string'
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routePrefix } from '../../../../../config'

@connect(({ subLineDetail, loading }) => ({
  subLineDetail,
  loading: loading.models.subLineDetail,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'subLineDetail/init',
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
          <LineInfoList />
        </Panel>
        <section className="footer-wrap">
          <Link to={`${routePrefix}/lineManage`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

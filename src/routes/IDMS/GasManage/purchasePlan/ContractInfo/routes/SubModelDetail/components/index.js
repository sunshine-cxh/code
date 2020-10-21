/*
 * @Descripttion : 模型仓详情页
 * @Author       : caojiarong
 * @Date         : 2020-08--25 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-25 11:03:52
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
import FileInfoList from './FileInfoList'
import { notice } from 'components/Notification'
import $$ from 'cmn-utils'
import qs from 'query-string'
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routePrefix } from '../../../../../config'

@connect(({ subModelDetail, loading }) => ({
  subModelDetail,
  loading: loading.models.subModelDetail,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'subModelDetail/init',
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
          <FileInfoList />
        </Panel>
        <section className="footer-wrap">
          <Link to={`${routePrefix}/contractInfo`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

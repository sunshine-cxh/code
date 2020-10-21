/*
 * @Descripttion : 重点用户申报详情页面
 * @Author       : gujitao
 * @Date         : 2020-08--25 14:12:55
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-04 09:30:03
 */

import React from 'react'
import { connect } from 'dva'

import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import { notice } from 'components/Notification'

import qs from 'query-string'
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routePrefix } from '../../../../../../config'

@connect(({ subGasdeclareDetail, loading }) => ({
  subGasdeclareDetail,
  
  loading: loading.models.subGasdeclareDetail,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let detailsearch =qs.parse(location.search)  //根据地址栏去获取那个详情的id


    dispatch({
      type: 'subGasdeclareDetail/init',
      payload: {
          id:detailsearch.id,    
      },
    })
  }

  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos />
        </Panel>

        {/* 页面底部的返回 */}
        <section className="footer-wrap">
          {/* 返回到主页面的路由 */}
          <Link to={`${routePrefix}/gasdeclare`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

/*
 * @Descripttion : 巡检计划详情页面
 * @Author       : caojiarong
 * @Date         : 2020-06-08 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:14:29
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import PatrolLine from './patrolLine'
import ConnectTask from './connectTask'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import $$ from 'cmn-utils'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'
const createForm = Form.create;
@connect(({ patrolPlanDetail, loading }) => ({
  patrolPlanDetail,
  loading: loading.models.patrolPlanDetail
}))
class patrolPlanDetail extends BaseComponent {
  componentDidMount() {
    const { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'patrolPlanDetail/getDetails',
      payload: {
        id: searchObj.id,
        success: (details)=> {

        }
      }
    })
    this.props.dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'patrolPlanDetail',
        valueField: 'allUserList',
      },
    })
    this.props.dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'patrolPlanDetail',
        valueField: 'organizationTree'
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
          <OperatorArea />
        </Panel>
        <Panel header={null}>
          <PatrolLine />
        </Panel>
        <Panel header={null}>
          <ConnectTask />
        </Panel>
        <section className="footer-wrap">
          <Link to={`${routesPrefix}/patrolPlan`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(patrolPlanDetail);
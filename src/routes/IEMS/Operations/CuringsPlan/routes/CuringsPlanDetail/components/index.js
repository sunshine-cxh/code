/*
 * @Descripttion : 养护计划详情页面
 * @Author       : hezihua
 * @Date         : 2020-06-08 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 15:36:59
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import ConnectTask from './connectTask'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import $$ from 'cmn-utils'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'
const createForm = Form.create;
@connect(({ curingsPlanDetail, loading }) => ({
  curingsPlanDetail,
  loading: loading.models.curingsPlanDetail
}))
class curingsPlanDetail extends BaseComponent {
  componentDidMount() {
    const { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'curingsPlanDetail/getDetails',
      payload: {
        id: searchObj.id,
        success: (details)=> {

        }
      }
    })
    this.props.dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'curingsPlanDetail',
        valueField: 'allUserList',
      },
    })
    this.props.dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'curingsPlanDetail',
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
          <ConnectTask />
        </Panel>
        <section className="footer-wrap">
          <Link to={`${routesPrefix}/curingsPlan`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(curingsPlanDetail);
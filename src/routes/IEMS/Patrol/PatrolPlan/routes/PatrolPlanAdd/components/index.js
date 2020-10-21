/*
 * @Descripttion : 新增巡检计划页面
 * @Author       : caojiarong
 * @Date         : 2020-06-09 10:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:10:56
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import Responsers from './responsers'
import SortTable from './SortTable'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import { notice } from 'components/Notification';
import qs from 'query-string'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'
import PageHelper from 'utils/pageHelper'
import $$ from 'cmn-utils'
const createForm = Form.create;
@connect(({ patrolPlanAdd, loading }) => ({
  patrolPlanAdd,
  loading: loading.models.patrolPlanAdd
}))
class patrolPlanAdd extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    recordId: ''
  }

  componentDidMount() {
    const { location, dispatch } = this.props
    let searchObj = qs.parse(location.search)
    let recordId = searchObj.id;
    if (recordId) {
      this.getRecordDetail(recordId)
    }
    this.setState({ recordId })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'patrolPlanAdd',
        valueField: 'allUserList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'patrolPlanAdd',
        valueField: 'organizationTree'
      },
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'patrolPlanAdd',
        valueField: 'typeList',
        success: () => {}
      }
    })
  }

  // 根据id获取巡检的详情
  getRecordDetail = (recordId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'patrolPlanAdd/getDetails',
      payload: {
        id: recordId,
        success: (details) => {
        }
      }
    })
  }

  handleSubmit = () => {
    const { dispatch, patrolPlanAdd: { appPageData, selectDataList } } = this.props
    let { recordId } = this.state
    let { validateFields, getFieldsValue } = this.form.props.form
    dispatch({
      type: 'patrolPlanAdd/@change',
      payload: {
        recordId,
        basicInfos: getFieldsValue(),
      }
    })
    if (appPageData.list.length < 1) {
      notice.error('请选择责任人')
      return
    }
    if (selectDataList.list.length < 1) {
      notice.error('请选择巡检路线')
      return
    }
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'patrolPlanAdd/save',
          payload: {
            // id: details.id
            success: () => {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/patrolPlan`
              }))
              dispatch({
                type: 'patrolPlan/getPageInfo',
                payload: {
                  values: {},
                  pageData: PageHelper.create()
                }
              })
            }
          }
        })
      }
    })
  }

  render() {
    return (
      <SubPageLayout className="page patrolPlanAdd-add">
        <Panel header={null}>
          <BasicInfos wrappedComponentRef={(form) => this.form = form} />
        </Panel>
        <Panel header={null}>
          <Responsers />
        </Panel>
        <Panel header={null}>
          <SortTable />
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSubmit}>保存</Button>
          <Link to={`${routesPrefix}/patrolPlan`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(patrolPlanAdd);
/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 09:11:55
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import SubPageLayout from 'components/SubPageLayout'
import TableInfos from './TableInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import { notice } from 'components/Notification'
import qs from 'query-string'

import '../style/index.less'
import { routesPrefix } from '../../../../../config'

@connect(({ procurementPlanAdd, loading, procurementPlan }) => ({
  procurementPlanAdd,
  loading: loading.models.procurementPlanAdd,
  procurementPlan,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'procurementPlanAdd/init',
      payload: {
        id: searchObj.id,
      },
    })
  }
  handleSubmit = (submitType) => {
    const {
      dispatch,
      procurementPlanAdd: { details, approvalRow, appPageData, location },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    let cycle = getFieldsValue().cycle
    let basicInfos = {
      ...getFieldsValue(),
      cycle: cycle ? cycle[1] : null,
      cycleUnit: cycle ? cycle[0] : null,
    }
    dispatch({
      type: 'procurementPlanAdd/@change',
      payload: {
        basicInfos,
      },
    })
    validateFields((err, values) => {
      if (!err) {
        if (approvalRow.length === 0) {
          notice.error('审核人必填')
          return
        }
        if (appPageData.list.length === 0) {
          notice.error('至少有一条计划信息')
          return
        }
        dispatch({
          type: `procurementPlanAdd/${submitType}`,
          payload: {
            id: details.id,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/procurementPlan`,
                })
              )
              dispatch({
                type: 'procurementPlan/getPageInfo',
                payload: {
                  pageData: PageHelper.create().jumpPage(),
                },
              })
            },
          },
        })
      }
    })
  }

  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
            <BasicInfos wrappedComponentRef={(form) => (this.form = form)} />
        </Panel>
        <TableInfos />
        <section className="footer-wrap">
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit('save')
            }}
          >
            保存
          </Button>
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit('submit')
            }}
          >
            提交
          </Button>
          <Link to={`${routesPrefix}/procurementPlan`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

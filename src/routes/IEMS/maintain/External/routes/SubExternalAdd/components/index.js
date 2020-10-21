/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 09:10:26
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

@connect(({ externalAdd, loading, procurementPlan }) => ({
  externalAdd,
  loading: loading.models.externalAdd,
  procurementPlan,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'externalAdd/init',
      payload: {
        id: searchObj.id,
      },
    })
  }
  handleSubmit = (submitType) => {
    const {
      dispatch,
      externalAdd: { details, approvalRow, appPageData },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    let basicInfos = {
      ...getFieldsValue()
    }
    dispatch({
      type: 'externalAdd/@change',
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
          notice.error('至少有关联报修单')
          return
        }
        dispatch({
          type: `externalAdd/${submitType}`,
          payload: {
            id: details.id,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/external`,
                })
              )
              dispatch({
                type: 'external/getPageInfo',
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
          <Link to={`${routesPrefix}/external`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

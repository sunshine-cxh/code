/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 09:12:36
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
import '../style/index.less'
import { notice } from 'components/Notification'
import { routesPrefix } from '../../../../../config'

const createForm = Form.create
@connect(({ procurementTestAdd, loading, procurementTest }) => ({
  procurementTestAdd,
  loading: loading.models.procurementTestAdd,
  procurementTest,
}))
class procurementTestAdd extends BaseComponent {
  handleSubmit = () => {
    const {
      dispatch,
      procurementTestAdd: { applyRow, appPageData },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    dispatch({
      type: 'procurementTestAdd/@change',
      payload: {
        basicInfos: getFieldsValue(),
      },
    })
    validateFields((err, values) => {
      if (!err) {
        if (applyRow.length === 0) {
          notice.error('采购申请必填')
          return
        }
        if (appPageData.list.length === 0) {
          notice.error('产品信息至少有一条')
          return
        }
        dispatch({
          type: 'procurementTestAdd/submit',
          payload: {
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/procurementTest`,
                })
              )
              dispatch({
                type: 'procurementTest/getPageInfo',
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
    let { dispatch } = this.props
    return (
      <SubPageLayout
        onClick={() => {
          dispatch({
            type: 'procurementTestAdd/@change',
            payload: {
              popoverVisible: false,
            },
          })
        }}
      >
        <Panel header={null}>
            <BasicInfos wrappedComponentRef={(form) => (this.form = form)} />
        </Panel>
        <TableInfos />
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSubmit}>
            提交
          </Button>
          <Link to={`${routesPrefix}/procurementTest`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(procurementTestAdd)

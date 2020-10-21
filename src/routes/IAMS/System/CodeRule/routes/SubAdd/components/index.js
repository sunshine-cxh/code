/*
 * @Descripttion : 编码规则 - 新增
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 16:44:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-07 15:56:40
 */

import React from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import TableInfos from './TableInfos'
import BaseComponent from 'components/BaseComponent'
import { routePrefix } from '../../../../../config'

import { getUrlParameters } from 'utils/urlHandler'

import '../style/index.less'

const createForm = Form.create
@connect(({ codeRuleAdd, loading, codeRule }) => ({
  codeRuleAdd,
  loading: loading.models.codeRuleAdd,
  codeRule,
}))
class codeRuleAdd extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props

    let urlParameters = getUrlParameters()
    dispatch({
      type: 'codeRuleAdd/init',
      payload: {
        id: urlParameters.id,
      },
    })
  }

  handleSubmit = () => {
    let {
      dispatch,
      codeRuleAdd: { details },
      codeRule: { pageData },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    details = {
      ...details,
      ...getFieldsValue(),
    }
    dispatch({
      type: 'codeRuleAdd/@change',
      payload: {
        details,
      },
    })
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'codeRuleAdd/submit',
          payload: {
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routePrefix}/codeRule`,
                })
              )
              dispatch({
                type: 'codeRule/getPageInfo',
                payload: {
                  pageData,
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
        <Panel header={null}>
          <TableInfos />
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSubmit}>
            保存
          </Button>
          <Link to={`${routePrefix}/codeRule`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(codeRuleAdd)

/*
 * @Descripttion : 编码规则管理
 * @Author       : wuhaidong
 * @Date         : 2020-06-01 15:35:15
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-15 11:37:59
 */

import React from 'react'
import { connect } from 'dva'
import { Switch } from 'dva/router'
import BaseComponent from 'components/BaseComponent'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import QueryMain from './QueryMain/index'

@connect(({ codeRule, loading }) => ({
  codeRule,
  loading: loading.models.codeRule,
}))
export default class extends BaseComponent {
  render() {
    let {
      routerData: { childRoutes },
      codeRule: { isCurrentRoute },
      dispatch,
    } = this.props

    return (
      <Layout
        onClick={() => {
          dispatch({
            type: 'codeRule/@change',
            payload: {
              popoverVisible: false,
            },
          })
        }}
      >
        {isCurrentRoute ? (
          <Panel header={null}>
            <QueryMain />
          </Panel>
        ) : null}

        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}

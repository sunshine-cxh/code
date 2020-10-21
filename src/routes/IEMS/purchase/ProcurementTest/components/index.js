/*
 * @Descripttion : 采购计划页面
 * @Author       : luo jun
 * @Date         : 2020-03-20 08:35:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-24 09:44:50
 */

import React from 'react'
import { connect } from 'dva'

import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'
import QueryMain from './QueryMain/index'
import { Switch } from 'dva/router'
const { Content, Header } = Layout
@connect(({ procurementTest, loading }) => ({
  procurementTest,
  loading: loading.models.procurementTest,
}))
export default class extends BaseComponent {
  render() {
    let {
      routerData: { childRoutes },
      procurementTest: { isCurrentRoute },
      dispatch,
    } = this.props
    return (
      <Layout
        className="page"
        onClick={() => {
          dispatch({
            type: 'procurementTest/@change',
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

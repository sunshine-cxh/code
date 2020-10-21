/*
 * @Descripttion : 采购计划页面
 * @Author       : luo jun
 * @Date         : 2020-03-20 08:35:40
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-03 16:36:50
 */

import React from 'react'
import { connect } from 'dva'

import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'
import Layout from 'components/Layout'

import QueryMain from './QueryMain/index'
import { Switch } from 'dva/router'
@connect(({ Resume, loading }) => ({
  Resume,
  loading: loading.models.Resume,
}))
export default class extends BaseComponent {
  render() {
    let {
      routerData: { childRoutes },
      Resume: { isCurrentRoute },
      dispatch,
    } = this.props

    return (
      <Layout
        className="page"
        onClick={() => {
          dispatch({
            type: 'Resume/@change',
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

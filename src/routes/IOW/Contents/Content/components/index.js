/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-03-20 08:35:40
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-03 16:17:07
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'

import QueryMain from './QueryMain/index'
import { Switch } from 'dva/router'
@connect(({ Content, loading }) => ({
  Content,
  loading: loading.models.Content,
}))
export default class extends BaseComponent {
  render() {
    let {
      routerData: { childRoutes },
      Content: { isCurrentRoute },
      dispatch,
    } = this.props
    return (
      <Layout
        onClick={() => {
          dispatch({
            type: 'Content/@change',
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

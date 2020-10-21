/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-03-20 08:35:40
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-03 16:34:11
 */

import React from 'react'
import { connect } from 'dva'

import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'
import Layout from 'components/Layout'

import QueryMain from './QueryMain/index'
import { Switch } from 'dva/router'
@connect(({ Message, loading }) => ({
  Message,
  loading: loading.models.Message,
}))
export default class extends BaseComponent {
  render() {
    let {
      routerData: { childRoutes },
      Message: { isCurrentRoute },
      dispatch,
    } = this.props
    return (
      <Layout
        onClick={() => {
          dispatch({
            type: 'Message/@change',
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

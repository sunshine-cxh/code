/*
 * @Descripttion : 报修工单页面
 * @Author       : caojiarong
 * @Date         : 2020-06-17 11:15:10
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-23 16:09:19
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'

import QueryMain from './QueryMain/index'
import { Switch } from 'dva/router'
@connect(({ repairOrder, loading }) => ({
  repairOrder,
  loading: loading.models.repairOrder,
}))
export default class extends BaseComponent {
  render() {
    let {routerData: {childRoutes}, repairOrder: {isCurrentRoute, popoverVisible}, dispatch} = this.props

    return (
      <Layout className="page" onClick={()=> {
        dispatch({
          type: 'repairOrder/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
        {isCurrentRoute ? 
            <Panel header={null}>
              <QueryMain />
            </Panel> : null
        }
        <Switch>{childRoutes}</Switch>
      </Layout>
    )
  }
}

/*
 * @Descripttion : 领料申请页面
 * @Author       : caojiarong
 * @Date         : 2020-05-19 10:15:10
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-30 17:43:38
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'

import QueryMain from './QueryMain/index'
import { Switch } from 'dva/router'
const { Content, Header } = Layout
@connect(({ pickingApply, loading }) => ({
  pickingApply,
  loading: loading.models.pickingApply,
}))
export default class extends BaseComponent {
  render() {
    let {routerData: {childRoutes}, pickingApply: {isCurrentRoute}, dispatch} = this.props

    return (
      <Layout className="page" onClick={()=> {
        dispatch({
          type: 'pickingApply/@change',
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

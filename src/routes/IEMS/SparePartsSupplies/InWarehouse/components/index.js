/*
 * @Descripttion : 入库管理页面
 * @Author       : caojiarong
 * @Date         : 2020-05-08 14:15:10
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-23 16:11:48
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'

import QueryMain from './QueryMain/index'
import { Switch } from 'dva/router'
const { Content } = Layout
@connect(({ inWarehouse, loading }) => ({
  inWarehouse,
  loading: loading.models.inWarehouse,
}))
export default class extends BaseComponent {
  render() {
    let {routerData: {childRoutes}, inWarehouse: {isCurrentRoute}, dispatch} = this.props

    return (
      <Layout className="page" onClick={()=> {
        dispatch({
          type: 'inWarehouse/@change',
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

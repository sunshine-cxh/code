/*
 * @Descripttion : 仓库盘点页面
 * @Author       : caojiarong
 * @Date         : 2020-05-25 11:15:10
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-23 16:12:15
 */

import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'
import BaseComponent from 'components/BaseComponent'

import QueryMain from './QueryMain/index'
import { Switch } from 'dva/router'
@connect(({ warehouseInventory, loading }) => ({
  warehouseInventory,
  loading: loading.models.warehouseInventory,
}))
export default class extends BaseComponent {
  render() {
    let {routerData: {childRoutes}, warehouseInventory: {isCurrentRoute}, dispatch} = this.props

    return (
      <Layout className="page" onClick={()=> {
        dispatch({
          type: 'warehouseInventory/@change',
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

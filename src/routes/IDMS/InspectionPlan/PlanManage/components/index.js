/*
 * @Descripttion : 巡检点管理
 * @Author       : caojiarong
 * @Date         : 2020-08-17 10:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-18 10:48:13
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import QueryMain from './QueryMain'
import './index.less'
import { Switch } from 'dva/router'
 
@connect(({ PlanManage, loading }) => ({
  PlanManage,
}))
export default class PlanManage extends BaseComponent {
  state = {
    
  }

  componentDidMount() {}


  render() {
    let {routerData: {childRouter}, dispatch, PlanManage:{isCurrentRoute}}=this.props
    return (
      <Layout className="PlanManage-page" onClick={()=> {
        dispatch({
          type: 'PlanManage/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
       {isCurrentRoute ?<Panel header={null}>
          <QueryMain />   
        </Panel>:null}
        
        <Switch>{childRouter}</Switch>
         
        
      </Layout>
    )
  }
}

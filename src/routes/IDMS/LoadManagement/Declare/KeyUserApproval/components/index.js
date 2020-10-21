/*
 * @Descripttion : 重点用户申报
 * @Author       : caojiarong
 * @Date         : 2020-08-27 10:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-31 14:55:28
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import QueryMain from './QueryMain'
import GasDiffChart from './GasDiffChart'
import HistoryList from './HistoryList'
import './index.less'
import { Switch } from 'dva/router'
 
@connect(({ keyUserApproval, loading }) => ({
  keyUserApproval,
}))
export default class KeyUserApproval extends BaseComponent {
  
  render() {
    let {routerData: {childRouter}, dispatch, keyUserApproval:{isCurrentRoute}}=this.props
    return (
      <Layout className="keyUserApproval-page" onClick={()=> {
        dispatch({
          type: 'keyUserApproval/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
       {isCurrentRoute ?
        <>
          <Panel header={null}>
            <QueryMain />
          </Panel>
          
          <Panel header={null}>
            <GasDiffChart />
          </Panel>

          <Panel header={null}>
            <HistoryList />
          </Panel>

        </>:null}
        <Switch>{childRouter}</Switch>
         
      </Layout>
    )
  }
}

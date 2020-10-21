/*
 * @Descripttion : 合同信息
 * @Author       : caojiarong
 * @Date         : 2020-09-01 10:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-01 14:54:58
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import QueryMain from './QueryMain'
import './index.less'
import { Switch } from 'dva/router'
 
@connect(({ contractInfo, loading }) => ({
  contractInfo,
}))
export default class contractInfo extends BaseComponent {
  
  render() {
    let {routerData: {childRouter}, dispatch, contractInfo:{isCurrentRoute}}=this.props
    return (
      <Layout className="contractInfo-page" onClick={()=> {
        dispatch({
          type: 'contractInfo/@change',
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

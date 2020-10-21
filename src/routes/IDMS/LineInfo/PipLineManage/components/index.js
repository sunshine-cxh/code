/*
 * @Descripttion : 管道管理
 * @Author       : caojiarong
 * @Date         : 2020-08-17 10:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-20 16:42:20
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import QueryMain from './QueryMain'
import './index.less'
import { Switch } from 'dva/router'
 
@connect(({ pipLineManage, loading }) => ({
  pipLineManage,
}))
export default class pipLineManage extends BaseComponent {
  
  render() {
    let {routerData: {childRouter}, dispatch, pipLineManage:{isCurrentRoute}}=this.props
    return (
      <Layout className="pipLineManage-page" onClick={()=> {
        dispatch({
          type: 'pipLineManage/@change',
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

/*
 * @Descripttion : 巡检路线管理
 * @Author       : caojiarong
 * @Date         : 2020-08-17 10:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-20 15:36:42
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import QueryMain from './QueryMain'
import './index.less'
import { Switch } from 'dva/router'
 
@connect(({ lineManage, loading }) => ({
  lineManage,
}))
export default class lineManage extends BaseComponent {
  state = {
    
  }

  componentDidMount() {}


  render() {
    let {routerData: {childRouter}, dispatch, lineManage:{isCurrentRoute}}=this.props
    return (
      <Layout className="lineManage-page" onClick={()=> {
        dispatch({
          type: 'lineManage/@change',
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

/*
 * @Descripttion : 管道管理
 * @Author       : caojiarong
 * @Date         : 2020-08--25 10:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-25 08:53:58
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import QueryMain from './QueryMain'
import './index.less'
import { Switch } from 'dva/router'
 
@connect(({ modelHouse, loading }) => ({
  modelHouse,
}))
export default class modelHouse extends BaseComponent {
  
  render() {
    let {routerData: {childRouter}, dispatch, modelHouse:{isCurrentRoute}}=this.props
    return (
      <Layout className="modelHouse-page" onClick={()=> {
        dispatch({
          type: 'modelHouse/@change',
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

/*
 * @Descripttion : 巡检点管理
 * @Author       : caojiarong
 * @Date         : 2020-08-18 10:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-20 11:17:07
 */
import React from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import QueryMain from './QueryMain'
import './index.less'
import { Switch } from 'dva/router'
import qs from 'query-string'
@connect(({ pointManage, loading }) => ({
  pointManage,
}))
export default class pointManage extends BaseComponent {
  constructor(props){
    super(props)
    let { location } = this.props
    let searchObj = qs.parse(location.search)
    let code = searchObj.code || ''

    this.state = {
      code
    }
  }
  

  componentDidMount() {
    
  }


  render() {
    let {routerData: {childRouter}, dispatch, pointManage:{isCurrentRoute}}=this.props
    let {code} = this.state
    return (
      <Layout className="pointManage-page" onClick={()=> {
        dispatch({
          type: 'pointManage/@change',
          payload: {
            popoverVisible: false
          }
        })
      }}>
       {isCurrentRoute ?<Panel header={null}>
          <QueryMain code={code}/>   
        </Panel>:null}
        
        <Switch>{childRouter}</Switch>
         
      </Layout>
    )
  }
}

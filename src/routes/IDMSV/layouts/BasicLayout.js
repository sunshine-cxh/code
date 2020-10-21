/*
 * @Descripttion : 基本部局
 * @Author       : wuhaidong
 * @Date         : 2020-07-13 18:15:15
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-27 11:43:39
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import { Switch, routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import isEqual from 'react-fast-compare'
import './styles/basic.less'
import warningGif from 'assets/images/warning.gif'
import cx from 'classnames'
import { routePrefix } from '../config'
import NavBar from './NavBar'
const { Content, Header } = Layout

const NAVBARLEFT = [
  { title: '智慧管网', path: `${routePrefix}/home`, active: true },
  { title: '工况仿真', path: `${routePrefix}/simulation`, active: false },
]

const NAVBARRIGHT = [
  { title: '安检巡线', path: `${routePrefix}/linepatrol`, active: false },
  { title: '实时监控', path: `${routePrefix}/realtimeRtmp`, active: false },
]

@connect(({ idmsvGlobal }) => ({ idmsvGlobal }))
export default class BasicLayout extends React.PureComponent {
  warningFn = (id,status) =>{
    let target = window.document.getElementById(id)
    this.setState({[id]:status})
  }

  cancelWarningFn = (id) =>{
    let target = window.document.getElementById(id)
    this.setState({[id]:status})
  }
  componentDidMount(){
    let {dispatch}=this.props
    dispatch({
      type:'idmsvGlobal/init',
      payload:{
        warnFn:(id,status)=>{
          this.warningFn(id, status)
        },
        cancelWarnFn:(id, status)=>{
          this.cancelWarningFn(id, status)
        }
      }
    })
  }

  state = {
    homePage:false,
    simulationPage:false,
    linepatrolPage:false,
    realtimePage:false,
    
    NAVBARLEFT: [
      { title: '智慧管网', id:'homePage', path: `${routePrefix}/home`, active: this.props.location.pathname === `${routePrefix}/home` },
      { title: '工况仿真', id:'simulationPage', path: `${routePrefix}/simulation`, active: this.props.location.pathname === `${routePrefix}/simulation` },
    ],
    NAVBARRIGHT: [
      { title: '安检巡线', id:'linepatrolPage', path: `${routePrefix}/linepatrol`, active: this.props.location.pathname === `${routePrefix}/linepatrol` },
      { title: '实时监控', id:'realtimePage', path: `${routePrefix}/realtimeRtmp`, active: this.props.location.pathname === `${routePrefix}/realtime` || this.props.location.pathname === `${routePrefix}/realtimeRtmp` },
    ]
  }

  changeActive = (path)=> {
    this.setState({
      ...this.state,
      NAVBARLEFT: [
        { title: '智慧管网', id:'homePage', path: `${routePrefix}/home`, active: path === `${routePrefix}/home` },
        { title: '工况仿真', id:'simulationPage', path: `${routePrefix}/simulation`, active: path === `${routePrefix}/simulation` },
      ],
      NAVBARRIGHT: [
        { title: '安检巡线', id:'linepatrolPage', path: `${routePrefix}/linepatrol`, active: path === `${routePrefix}/linepatrol` },
        { title: '实时监控', id:'realtimePage', path: `${routePrefix}/realtimeRtmp`, active: path === `${routePrefix}/realtimeRtmp` || path === `${routePrefix}/realtimeRtmp` },
      ]
    })
  }
  render() {
    const { 
      routerData: { childRoutes },
    } = this.props
    let {
      NAVBARLEFT, NAVBARRIGHT
    } = this.state
    return (
      <Layout className="bigv-basic-layout">
        <NavBar />
        <Header>
          <div className="header">
            {NAVBARLEFT.map((item, i) => {
              return (
                <div
                  key={item.path}
                  className={ cx(item.active ? "navbar-item tab-left active" : "navbar-item tab-left", this.state[item.id] && 'shine-part')  }
                  
                  onClick={() => {
                    this.props.dispatch(routerRedux.push(item.path))
                    this.changeActive(item.path)
                  }}
                >
                  {
                    this.state[item.id] && <img id={item.id} className='warning-gif' src={warningGif} />
                  }
                  <span>
                    {item.title}
                  </span>
                </div>
              )
            })}
            <div className="navbar-item title">苏州天然气管网有限公司</div>
            {NAVBARRIGHT.map((item, i) => {
              return (
                <div
                  key={item.path}
                  
                  className={cx(item.active ? "navbar-item tab-right active" : "navbar-item tab-right",this.state[item.id] && 'shine-part')}
                  onClick={() => {
                    this.props.dispatch(routerRedux.push(item.path))
                    this.changeActive(item.path)
                  }}
                >
                  {
                    this.state[item.id] && 
                      <img id={item.id} className='warning-gif-right' src={warningGif}/>
                  }
                  <span>
                    {item.title}
                  </span>
                  
                </div>
              )
            })}
          </div>
        </Header>
        <Layout>
          <Content className="router-page">
            <Switch>{childRoutes}</Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

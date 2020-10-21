/*
 * @Descripttion : 路由菜单
 * @Author       : caojiarong
 * @Date         : 2020-08-10 9:09:19
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-10 11:30:02
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import Popover from 'components/Popover'
import Icon from 'components/Icon'
import $$ from 'cmn-utils'
import logoImg from 'assets/images/logo.png'

@connect(({ global }) => ({ global }))
class NavBar extends Component {
  constructor(props) {
    super(props)
    //获取pathname获取当前访问子系统
    let clients = $$.getStore('clients')
    let currentClientPrefix = window.location.href
    let currentClient = this.getCurrentClient(currentClientPrefix, clients)

    this.state={
      currentClient,
      clients,
      currentClientPrefix
    }
  }

  static defaultProps = {
    fixed: true,
  }

  componentDidMount() {
  }

 //获取当前路由所在系统信息
 getCurrentClient(currentClientPrefix, clients) {
  
  let currentClient = null
  Array.isArray(clients) &&
    clients.length > 0 &&
    clients.forEach((item) => {
      if (item.url == '/idmsv') {
        currentClient = item
      }
    })

  return currentClient
}

  handleRoute(item) {
    let { currentClient } = this.state
    let {dispatch} = this.props
    // if (item.url == '/idmsv') {
    //   this.toggleFullScreen()
    // }
    //如果是当前系统则不能点击，!currentClient 是为了解决403，505页面是的跳转
    if ((currentClient && currentClient.id != item.id) || !currentClient) {
      dispatch({
        type: 'global/handleSystemRoute',
        payload: {
          currentClient: item,
        },
      })
    }
  }

  // handleUserDropDownRoute(item) {
  //   let { dispatch } = this.props
  //   dispatch({
  //     type: 'global/handleSystemRoute',
  //     payload: {
  //       currentClient: item,
  //     },
  //   })
  // }

  render() {
    let { currentClient, clients } = this.state

    return (
      <div className={`navbar-branding dropdown`}>
        <Popover
          placement="bottomLeft"
          content={
            <ul className="dropdown-menu list-group dropdown-persist">
              {clients != null &&
                clients.length > 0 &&
                clients.map((item) => {
                  let active = ''
                  if (currentClient && currentClient.id == item.id) {
                    active = 'active'
                  }
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        this.handleRoute(item)
                      }}
                    >
                      <li className={`list-group-item ${active}`}>
                        <Icon type={item.icon} /> <span>{item.clientName}</span>
                      </li>
                    </div>
                  )
                })}
            </ul>
          }
        >
          {/* <div className={`navbar-brand`}> */}
            <img className="logo spining" src={logoImg} />
            {/* <span className="client-name animated animated-short fadeInUp">
              {currentClient && currentClient.clientName}
            </span> */}
            {/* <img src={ImageLogoName} className="logo-name" /> */}
          {/* </div> */}
        </Popover>
      </div>
    )
  }
}

export default NavBar
